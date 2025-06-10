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

    const { current_description, property_details } = await req.json();

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

    const prompt = `You are a professional real estate copywriter specializing in Indian property markets. Enhance this property description to be more engaging and conversion-focused.

Current Description: "${current_description}"

Property Details:
- Title: ${property_details.title}
- Location: ${property_details.location}
- Type: ${property_details.property_type}
- Price: ₹${property_details.price || 'Contact for price'}
- Area: ${property_details.area_sqft || 'N/A'} sq ft
- Bedrooms: ${property_details.bedrooms || 'N/A'}
- Bathrooms: ${property_details.bathrooms || 'N/A'}

Instructions:
1. Create a compelling, professional description
2. Highlight key selling points and unique features
3. Use persuasive language that appeals to Indian property buyers
4. Include location advantages and connectivity
5. Format for online property listings
6. Keep it engaging but factual
7. Use Indian English and local terminology
8. Maximum 300 words

Return only the enhanced description text, nothing else.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a professional real estate copywriter who creates compelling property descriptions for Indian markets.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    const data = await response.json();
    const enhanced_description = data.choices[0].message.content;

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
        tool_name: 'smart_description',
        credit_cost: 250,
        input_data: { current_description, property_details },
        output_data: { enhanced_description },
        status: 'success'
      });

    return new Response(JSON.stringify({ 
      success: true, 
      enhanced_description,
      suggestions: [
        "Consider adding more specific amenities",
        "Highlight unique features of the location",
        "Mention nearby landmarks or facilities"
      ],
      credits_used: 250
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generateSmartDescription function:', error);
    
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
            tool_name: 'smart_description',
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
