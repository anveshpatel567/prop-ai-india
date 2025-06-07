
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

    const { toolName, isEnabled } = await req.json();

    const { data, error } = await supabaseClient
      .from('ai_tool_flags')
      .upsert({
        tool_name: toolName,
        is_enabled: isEnabled,
        last_updated_by: (await supabaseClient.auth.getUser()).data.user?.id,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'tool_name'
      })
      .select()
      .single();

    if (error) throw error;

    // Log admin decision
    await supabaseClient.from('ai_admin_decision_logs').insert({
      module: toolName,
      action: 'toggle_tool',
      decision: isEnabled ? 'enabled' : 'disabled',
      decided_by: (await supabaseClient.auth.getUser()).data.user?.id
    });

    console.log(`AI tool ${toolName} ${isEnabled ? 'enabled' : 'disabled'}`);

    return new Response(JSON.stringify({ data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error toggling AI tool:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
