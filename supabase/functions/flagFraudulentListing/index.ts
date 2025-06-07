
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { listing_id, listing_data } = await req.json();

    const prompt = `Analyze this real estate listing for potential fraud indicators:
    Listing Data: ${JSON.stringify(listing_data)}
    
    Check for:
    1. Unrealistic pricing (too low/high for area)
    2. Poor quality or stock photos
    3. Vague or suspicious descriptions
    4. Missing essential details
    5. Contact information irregularities
    6. Duplicate content from other listings
    
    Return JSON with:
    - is_suspicious: boolean
    - confidence_score: number (0-1)
    - fraud_indicators: array of specific issues found
    - risk_level: "low", "medium", "high"`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a fraud detection expert for real estate listings. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 800,
      }),
    });

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);

    // Only create flag if suspicious
    if (analysis.is_suspicious) {
      const { data: flag, error } = await supabaseClient
        .from('ai_fraud_flags')
        .insert({
          user_id: user.id,
          listing_id,
          flagged_by: user.id,
          fraud_indicators: analysis,
          confidence_score: analysis.confidence_score,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      return new Response(JSON.stringify({ flagged: true, flag, analysis }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ flagged: false, analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
