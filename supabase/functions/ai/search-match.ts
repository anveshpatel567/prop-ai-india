
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
    const { search_query } = await req.json();

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
            content: `Parse the real estate search query and extract structured filters. Return ONLY valid JSON:
            {
              "location": "city or area name",
              "property_type": "residential|commercial|plot",
              "listing_type": "sale|rent",
              "min_price": number,
              "max_price": number,
              "bedrooms": number,
              "bathrooms": number,
              "amenities": ["amenity1", "amenity2"]
            }
            Only include fields that are clearly mentioned in the query.`
          },
          { role: 'user', content: search_query }
        ],
        temperature: 0.1,
      }),
    });

    const data = await response.json();
    const searchFilters = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify({ 
      success: true, 
      filters: searchFilters,
      credits_used: 8
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in search-match function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
