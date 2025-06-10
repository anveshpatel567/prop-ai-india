
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

    const { listing_content, listing_id } = await req.json();

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

    const prompt = `You are a fraud detection expert for real estate listings. Analyze this listing content for potential fraud indicators:

Listing Content: ${JSON.stringify(listing_content)}

Analyze for these fraud patterns:
1. Unrealistic pricing (too low/high for location)
2. Missing or suspicious contact information
3. Urgent language or pressure tactics
4. Duplicate content from other listings
5. Inconsistent property details
6. Suspicious payment requests

Return analysis in JSON format:
{
  "fraud_score": 0.75,
  "risk_level": "high|medium|low",
  "indicators_found": [
    "Price 70% below market rate",
    "No verified contact details"
  ],
  "confidence": 0.92,
  "recommendations": [
    "Verify property ownership",
    "Request additional documentation"
  ]
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
          { role: 'system', content: 'You are a fraud detection expert. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 600
      }),
    });

    const data = await response.json();
    const fraudAnalysis = JSON.parse(data.choices[0].message.content);

    // Store fraud flag if high risk
    if (fraudAnalysis.fraud_score > 0.7) {
      await supabaseClient
        .from('ai_fraud_flags')
        .insert({
          user_id: user.id,
          listing_id,
          confidence_score: fraudAnalysis.confidence,
          fraud_indicators: fraudAnalysis.indicators_found,
          status: 'flagged'
        });
    }

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
        tool_name: 'fraud_detector',
        credit_cost: 250,
        input_data: { listing_content: JSON.stringify(listing_content).slice(0, 200) },
        output_data: fraudAnalysis,
        status: 'success'
      });

    return new Response(JSON.stringify({ 
      success: true, 
      analysis: fraudAnalysis,
      credits_used: 250
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fraud detection:', error);
    
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
            tool_name: 'fraud_detector',
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
