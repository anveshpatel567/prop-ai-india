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

    // Check wallet balance for 250 credits (updated from 300)
    const { data: wallet } = await supabaseClient
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (!wallet || wallet.balance < 250) {
      return new Response(JSON.stringify({ error: 'Insufficient credits. Need 250 credits (₹250)' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = `You are a real estate pricing expert in India. Analyze this property and suggest optimal pricing:

Property Details: ${JSON.stringify(property_details)}

Consider:
1. Property type, size, and location specifics
2. Current Indian real estate market conditions
3. Comparable properties in the locality
4. Property condition and amenities
5. Market demand trends in the city/area
6. Price per square foot analysis

Provide a detailed analysis in JSON format:
{
  "suggested_price_range": {
    "min": number,
    "max": number,
    "optimal": number
  },
  "confidence_score": number (0-1),
  "market_analysis": "detailed reasoning",
  "pricing_factors": ["factor1", "factor2"],
  "recommendations": ["recommendation1", "recommendation2"]
}`;

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
        temperature: 0.3,
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
        suggested_price: analysis.suggested_price_range.optimal,
        market_analysis: analysis,
        confidence_score: analysis.confidence_score,
        status: 'completed'
      })
      .select()
      .single();

    if (error) throw error;

    // Deduct 250 credits (updated from 300)
    await supabaseClient
      .from('wallets')
      .update({ balance: wallet.balance - 250 })
      .eq('user_id', user.id);

    // Log transaction
    await supabaseClient
      .from('ai_tool_transactions')
      .insert({
        user_id: user.id,
        tool_name: 'pricing_suggestion',
        credit_cost: 250,
        input_data: { listing_id, property_details },
        output_data: analysis,
        status: 'success'
      });

    return new Response(JSON.stringify({ 
      suggestion,
      analysis,
      credits_used: 250
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    
    // Log failed transaction
    try {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
      );
      const { data: { user } } = await supabaseClient.auth.getUser();
      
      if (user) {
        await supabaseClient
          .from('ai_tool_transactions')
          .insert({
            user_id: user.id,
            tool_name: 'pricing_suggestion',
            credit_cost: 0,
            status: 'failed',
            error_message: error.message
          });
      }
    } catch {}

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
