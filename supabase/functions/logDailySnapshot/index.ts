
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
    );

    const { total_prompts, total_flags, avg_latency_ms, top_feature } = await req.json();

    console.log('Logging daily snapshot:', { total_prompts, total_flags, avg_latency_ms, top_feature });

    const { data, error } = await supabaseClient
      .from('ai_daily_snapshot_logs')
      .insert({
        total_prompts,
        total_flags,
        avg_latency_ms,
        top_feature
      })
      .select()
      .single();

    if (error) {
      console.error('Error logging daily snapshot:', error);
      throw error;
    }

    console.log('Successfully logged daily snapshot:', data.id);

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in logDailySnapshot function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
