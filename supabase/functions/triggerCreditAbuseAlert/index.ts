
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { toolName, creditsUsed, dailyLimit, userId } = await req.json();

    // Log anomaly
    await supabaseClient.from('ai_anomaly_detection_logs').insert({
      anomaly_type: 'credit_abuse',
      severity: 'warning',
      metadata: JSON.stringify({
        tool_name: toolName,
        credits_used: creditsUsed,
        daily_limit: dailyLimit,
        user_id: userId
      })
    });

    // Log admin alert
    await supabaseClient.from('ai_admin_alerts').insert({
      type: 'credit_limit_exceeded',
      message: `Tool "${toolName}" has exceeded daily credit limit. Used: ${creditsUsed}, Limit: ${dailyLimit}`,
      severity: 'warning',
      related_tool: toolName
    });

    console.log(`Credit abuse alert triggered for ${toolName}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error triggering credit abuse alert:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
