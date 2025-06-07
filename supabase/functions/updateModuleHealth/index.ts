
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

    const { module, uptime_percentage, average_latency_ms } = await req.json();

    console.log('Updating module health:', { module, uptime_percentage, average_latency_ms });

    const { data, error } = await supabaseClient
      .from('ai_module_health_metrics')
      .upsert({
        module,
        uptime_percentage,
        average_latency_ms,
        last_updated: new Date().toISOString()
      }, { onConflict: 'module' })
      .select()
      .single();

    if (error) {
      console.error('Error updating module health:', error);
      throw error;
    }

    console.log('Successfully updated module health:', data.id);

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in updateModuleHealth function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
