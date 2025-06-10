
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

    const { lead_data, context } = await req.json();

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

    if (!lead_data) {
      throw new Error('Lead data is required');
    }

    const leadInfo = `
Name: ${lead_data.name || 'N/A'}
Phone: ${lead_data.phone || 'N/A'}
Email: ${lead_data.email || 'N/A'}
Budget: ${lead_data.budget || 'N/A'}
Property Interest: ${lead_data.property_type || 'N/A'}
Location: ${lead_data.preferred_location || 'N/A'}
Notes: ${lead_data.notes || 'N/A'}
    `;

    const prompt = `You are a professional real estate agent assistant. Generate a friendly, personalized WhatsApp message for this lead:

${leadInfo}

Additional context: ${context || 'Standard follow-up message'}

Guidelines:
- Keep it concise (under 150 words)
- Be warm and professional
- Include relevant property details if available
- Add a clear call-to-action
- Use WhatsApp-friendly formatting
- Avoid overly salesy language
- Be helpful and genuine

Create a personalized message that addresses their specific needs and encourages engagement.`;

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
          { role: 'system', content: 'You are a professional real estate agent assistant.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 200
      }),
    });

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]) {
      throw new Error('Invalid response from OpenAI');
    }

    const generatedResponse = data.choices[0].message.content;

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
        tool_name: 'whatsapp_responder',
        credit_cost: 250,
        input_data: { lead_data, context },
        output_data: { response: generatedResponse },
        status: 'success'
      });

    return new Response(JSON.stringify({ 
      success: true, 
      response: generatedResponse,
      credits_used: 250
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in WhatsApp responder function:', error);
    
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
            tool_name: 'whatsapp_responder',
            credit_cost: 0,
            status: 'failed',
            error_message: error.message
          });
      }
    } catch {}

    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || 'Unknown error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
