
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
    const { brochure_text, user_id } = await req.json();

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
            content: `You are a real estate brochure parser. Extract structured property data from the provided text. Return ONLY valid JSON with these fields:
            {
              "title": "property title",
              "property_type": "residential|commercial|plot",
              "listing_type": "sale|rent",
              "price": number,
              "area_sqft": number,
              "bedrooms": number,
              "bathrooms": number,
              "city": "city name",
              "locality": "locality/area name",
              "amenities": ["amenity1", "amenity2"],
              "description": "detailed description"
            }`
          },
          { role: 'user', content: brochure_text }
        ],
        temperature: 0.1,
      }),
    });

    const data = await response.json();
    const parsedData = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify({ 
      success: true, 
      parsed_data: parsedData,
      credits_used: 12
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in brochure-parser function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
