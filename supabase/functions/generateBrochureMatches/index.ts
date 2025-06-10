
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

    const { brochure_data } = await req.json();

    // Check wallet balance for 350 credits
    const { data: wallet } = await supabaseClient
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (!wallet || wallet.balance < 350) {
      return new Response(JSON.stringify({ error: 'Insufficient credits. Need 350 credits (₹350)' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = `You are a real estate brochure analyzer. Analyze this brochure content and identify matching properties based on key features:

Brochure Content: ${JSON.stringify(brochure_data)}

Extract key features like:
1. Property type (residential/commercial)
2. Location preferences
3. Budget range
4. Size requirements
5. Amenities mentioned

Provide analysis in JSON format:
{
  "extracted_features": {
    "property_type": "residential",
    "location": "Mumbai",
    "budget_range": "1-2 crores",
    "size": "2-3 BHK",
    "amenities": ["parking", "gym"]
  },
  "matching_criteria": ["criteria1", "criteria2"],
  "confidence_score": 0.85
}`;

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
          { role: 'system', content: 'You are a real estate brochure analyzer. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 800,
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);

    // Store match results
    const { data: matchResult, error: matchError } = await supabaseClient
      .from('ai_brochure_match_links')
      .insert({
        user_id: user.id,
        uploaded_brochure_url: 'brochure_url_placeholder',
        matched_listings: analysis,
        similarity_scores: { confidence: analysis.confidence_score },
        status: 'completed'
      })
      .select()
      .single();

    if (matchError) throw matchError;

    // Deduct 350 credits
    await supabaseClient
      .from('wallets')
      .update({ balance: wallet.balance - 350 })
      .eq('user_id', user.id);

    // Log transaction
    await supabaseClient
      .from('ai_tool_transactions')
      .insert({
        user_id: user.id,
        tool_name: 'brochure_matcher',
        credit_cost: 350,
        input_data: { brochure_data },
        output_data: analysis,
        status: 'success'
      });

    return new Response(JSON.stringify({ 
      match_result: matchResult,
      analysis,
      credits_used: 350
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generateBrochureMatches:', error);
    
    // Log failed transaction if user exists
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
            tool_name: 'brochure_matcher',
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
