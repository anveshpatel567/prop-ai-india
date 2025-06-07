
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { listing_id } = await req.json();

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const authHeader = req.headers.get('Authorization')!;
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    // Get listing details
    const { data: listing, error: listingError } = await supabaseClient
      .from('listings')
      .select('*')
      .eq('id', listing_id)
      .single();

    if (listingError || !listing) throw new Error('Listing not found');

    const prompt = `Generate valid JSON-LD schema markup for a real estate listing with the following details:

Title: ${listing.title}
Price: ${listing.price}
Property Type: ${listing.property_type}
City: ${listing.city}
Address: ${listing.locality || ''}
Bedrooms: ${listing.bedrooms || 'N/A'}
Bathrooms: ${listing.bathrooms || 'N/A'}
Area: ${listing.area_sqft || 'N/A'} sqft

Create a complete JSON-LD schema for a RealEstateListing that includes:
- @context and @type
- name, description, url
- offers with price and availability
- address details
- floorSize if available
- numberOfRooms if available

Return only valid JSON-LD markup as a string.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert at generating valid JSON-LD schema markup for real estate listings.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    const jsonld = data.choices[0].message.content;

    // Save to database
    const { data: schemaData, error } = await supabaseClient
      .from('seo_schemas')
      .insert({
        listing_id,
        generated_by: user.id,
        jsonld
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(schemaData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generateSeoSchema function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
