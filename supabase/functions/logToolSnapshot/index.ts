
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const today = new Date().toISOString().split('T')[0]

    // Get all unique tools from recent attempts
    const { data: tools } = await supabase
      .from('ai_tool_attempt_logs')
      .select('tool_name')
      .gte('attempted_at', `${today}T00:00:00.000Z`)
      .lt('attempted_at', `${today}T23:59:59.999Z`)

    const uniqueTools = [...new Set(tools?.map(t => t.tool_name) || [])]

    for (const toolName of uniqueTools) {
      // Calculate metrics for this tool
      const { data: attempts } = await supabase
        .from('ai_tool_attempt_logs')
        .select('*')
        .eq('tool_name', toolName)
        .gte('attempted_at', `${today}T00:00:00.000Z`)
        .lt('attempted_at', `${today}T23:59:59.999Z`)

      const totalAttempts = attempts?.length || 0
      const blockedAttempts = attempts?.filter(a => !a.was_allowed).length || 0
      const uniqueUsers = new Set(attempts?.map(a => a.user_id)).size
      const totalCreditsUsed = attempts?.reduce((sum, a) => sum + (a.credits_required || 0), 0) || 0

      // Upsert snapshot data
      await supabase
        .from('ai_tool_insight_snapshots')
        .upsert({
          snapshot_date: today,
          tool_name: toolName,
          total_attempts: totalAttempts,
          blocked_attempts: blockedAttempts,
          unique_users: uniqueUsers,
          total_credits_used: totalCreditsUsed
        }, {
          onConflict: 'snapshot_date,tool_name'
        })
    }

    return new Response(
      JSON.stringify({ success: true, processed_tools: uniqueTools.length }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Snapshot logging error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
