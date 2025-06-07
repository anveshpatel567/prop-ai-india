
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

    const { user_id, tool_name, flag_type, notes, flagged_by } = await req.json()

    // Insert misuse flag
    const { data, error } = await supabase
      .from('ai_tool_misuse_flags')
      .insert({
        user_id,
        tool_name,
        flag_type,
        notes,
        flagged_by
      })

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Send admin alert
    await supabase
      .from('ai_admin_alerts')
      .insert({
        type: 'user_flagged',
        message: `User ${user_id} flagged for ${flag_type} on ${tool_name}`,
        severity: flag_type === 'bot' ? 'critical' : 'warning',
        related_tool: tool_name
      })

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
