
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { user_id, tool_name, was_allowed, reason, credits_required, user_credits } = await req.json()

    // Log the tool attempt
    const { data, error } = await supabase
      .from('ai_tool_attempt_logs')
      .insert({
        user_id,
        tool_name,
        was_allowed,
        reason,
        credits_required,
        user_credits
      })

    if (error) {
      console.error('Error logging tool attempt:', error)
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // If attempt was blocked, check for potential misuse patterns
    if (!was_allowed) {
      // Check recent attempts for this user/tool combination
      const { data: recentAttempts } = await supabase
        .from('ai_tool_attempt_logs')
        .select('*')
        .eq('user_id', user_id)
        .eq('tool_name', tool_name)
        .eq('was_allowed', false)
        .gte('attempted_at', new Date(Date.now() - 10 * 60 * 1000).toISOString()) // Last 10 minutes

      // Auto-flag if more than 5 blocked attempts in 10 minutes
      if (recentAttempts && recentAttempts.length >= 5) {
        await supabase
          .from('ai_tool_misuse_flags')
          .insert({
            user_id,
            tool_name,
            flag_type: 'overuse',
            flagged_by: null, // System flag
            notes: `Auto-flagged: ${recentAttempts.length} blocked attempts in 10 minutes`
          })

        // Log admin alert
        await supabase
          .from('ai_admin_alerts')
          .insert({
            type: 'misuse_detected',
            message: `User ${user_id} flagged for overuse of ${tool_name}`,
            severity: 'warning',
            related_tool: tool_name
          })
      }
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Tool attempt logging error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
