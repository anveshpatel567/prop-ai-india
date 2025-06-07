
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

    const { listing_id, property_details } = await req.json();

    // Check wallet balance
    const { data: wallet } = await supabaseClient
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (!wallet || wallet.balance < 25) {
      return new Response(JSON.stringify({ error: 'Insufficient credits' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = `Analyze this property and suggest optimal pricing:
    Property Details: ${JSON.stringify(property_details)}
    
    Consider:
    1. Property type, size, and location
    2. Current market conditions
    3. Comparable properties in area
    4. Property condition and amenities
    5. Market demand trends
    
    Provide:
    - Suggested price range
    - Confidence level (0-1)
    - Market analysis reasoning
    - Pricing strategy recommendations
    
    Return as valid JSON with fields: suggested_price, confidence_score, market_analysis, recommendations`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a real estate pricing expert. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);

    // Save pricing suggestion
    const { data: suggestion, error } = await supabaseClient
      .from('ai_pricing_suggestions')
      .insert({
        user_id: user.id,
        listing_id,
        suggested_price: analysis.suggested_price,
        market_analysis: analysis,
        confidence_score: analysis.confidence_score,
        status: 'completed'
      })
      .select()
      .single();

    if (error) throw error;

    // Deduct credits
    await supabaseClient
      .from('wallets')
      .update({ balance: wallet.balance - 25 })
      .eq('user_id', user.id);

    return new Response(JSON.stringify({ suggestion }), {
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
