
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { page, variant } = await req.json();

    // Validate variant
    const validVariants = ['primary', 'secondary', 'glass'];
    if (!validVariants.includes(variant)) {
      return new Response(
        JSON.stringify({ error: 'Invalid variant' }), 
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
      
      // Log button usage
      const { error } = await supabase
        .from('ui_button_logs')
        .insert({
          page,
          variant,
          user_id: user?.id || null
        });

      if (error) {
        console.error('Error logging button usage:', error);
      }
    }

    return new Response(
      JSON.stringify({ message: 'Button usage logged' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in log-button-variant function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
