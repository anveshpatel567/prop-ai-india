
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

    const { rule_id, offending_value, auto_action_taken } = await req.json();

    console.log('Logging rule violation:', { rule_id, offending_value: offending_value.substring(0, 100), auto_action_taken });

    const { data, error } = await supabaseClient
      .from('ai_rule_violations')
      .insert({
        rule_id,
        offending_value,
        auto_action_taken: auto_action_taken || false
      })
      .select()
      .single();

    if (error) {
      console.error('Error logging rule violation:', error);
      throw error;
    }

    console.log('Successfully logged rule violation:', data.id);

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in logRuleViolation function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
