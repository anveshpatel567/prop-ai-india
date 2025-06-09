
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { current_description, property_details, user_id } = await req.json();

    const prompt = `You are a professional real estate copywriter. Enhance this property description:

Current Description: "${current_description}"

Property Details:
- Title: ${property_details.title}
- Location: ${property_details.location}
- Type: ${property_details.property_type}
- Price: ₹${property_details.price || 'Not specified'}

Instructions:
1. Make the description more engaging and professional
2. Highlight key selling points
3. Use persuasive language that appeals to buyers
4. Keep it concise but comprehensive
5. Include location advantages if relevant
6. Format for online listings

Return only the enhanced description text.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a professional real estate copywriter who creates compelling property descriptions.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    const data = await response.json();
    const enhanced_description = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      success: true, 
      enhanced_description,
      suggestions: [
        "Consider adding more specific amenities",
        "Highlight unique features of the location",
        "Mention nearby landmarks or facilities"
      ],
      credits_used: 100
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generateSmartDescription function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
