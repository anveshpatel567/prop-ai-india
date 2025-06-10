
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

    const { search_query } = await req.json();

    // Check wallet balance for 250 credits
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

    const prompt = `Parse the real estate search query and extract structured filters. Return ONLY valid JSON:
    {
      "location": "city or area name",
      "property_type": "residential|commercial|plot",
      "listing_type": "sale|rent",
      "min_price": number,
      "max_price": number,
      "bedrooms": number,
      "bathrooms": number,
      "amenities": ["amenity1", "amenity2"],
      "urgency": "high|medium|low",
      "search_confidence": 0.95
    }
    Only include fields that are clearly mentioned in the query.

Search Query: "${search_query}"`;

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a real estate search assistant. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 400
      }),
    });

    const data = await response.json();
    const searchFilters = JSON.parse(data.choices[0].message.content);

    // Deduct 250 credits
    await supabaseClient
      .from('wallets')
      .update({ balance: wallet.balance - 250 })
      .eq('user_id', user.id);

    // Log transaction
    await supabaseClient
      .from('ai_tool_transactions')
      .insert({
        user_id: user.id,
        tool_name: 'search_match',
        credit_cost: 250,
        input_data: { search_query },
        output_data: searchFilters,
        status: 'success'
      });

    return new Response(JSON.stringify({ 
      success: true, 
      filters: searchFilters,
      credits_used: 250
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in search-match function:', error);
    
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
            tool_name: 'search_match',
            credit_cost: 0,
            status: 'failed',
            error_message: error.message
          });
      }
    } catch {}

    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
