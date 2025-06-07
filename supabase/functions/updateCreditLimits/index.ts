
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

    const { toolName, maxDailyCredits, enforced } = await req.json();

    const { data, error } = await supabaseClient
      .from('ai_tool_credit_limits')
      .upsert({
        tool_name: toolName,
        max_daily_credits: maxDailyCredits,
        enforced: enforced,
        updated_by: (await supabaseClient.auth.getUser()).data.user?.id,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'tool_name'
      })
      .select()
      .single();

    if (error) throw error;

    console.log(`Credit limit updated for ${toolName}: ${maxDailyCredits} credits`);

    return new Response(JSON.stringify({ data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating credit limits:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
