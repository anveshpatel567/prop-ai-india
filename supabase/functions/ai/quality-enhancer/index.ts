
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
    const { listing_data } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a real estate listing quality expert. Analyze the property listing and suggest improvements to make it more attractive and professional. Focus on:
            1. Title optimization for better searchability
            2. Description enhancement for emotional appeal
            3. Amenities completeness and presentation
            4. Pricing strategy feedback
            5. Photo placement suggestions
            
            Return ONLY valid JSON array of suggestions:
            [
              {
                "field": "title",
                "current_value": "current title text",
                "suggested_value": "improved title text",
                "reason": "explanation why this is better",
                "confidence": 0.85
              }
            ]`
          },
          { 
            role: 'user', 
            content: `Analyze this listing: ${JSON.stringify(listing_data)}` 
          }
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const suggestions = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify({ 
      success: true, 
      suggestions: suggestions
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in quality enhancer function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
