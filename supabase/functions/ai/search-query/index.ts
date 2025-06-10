
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

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
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Use GPT to interpret the search query
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
            content: `You are a real estate search assistant. Parse the user's natural language query and extract structured search filters. Return ONLY valid JSON:
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
            Only include fields clearly mentioned in the query.`
          },
          { role: 'user', content: search_query }
        ],
        temperature: 0.1,
      }),
    });

    const aiData = await response.json();
    const interpretation = JSON.parse(aiData.choices[0].message.content);

    // Build Supabase query based on AI interpretation
    let query = supabase
      .from('listings')
      .select('*')
      .eq('status', 'active');

    // Apply filters based on AI interpretation
    if (interpretation.location) {
      query = query.or(`city.ilike.%${interpretation.location}%,locality.ilike.%${interpretation.location}%`);
    }
    if (interpretation.property_type) {
      query = query.eq('property_type', interpretation.property_type);
    }
    if (interpretation.listing_type) {
      query = query.eq('listing_type', interpretation.listing_type);
    }
    if (interpretation.min_price) {
      query = query.gte('price', interpretation.min_price);
    }
    if (interpretation.max_price) {
      query = query.lte('price', interpretation.max_price);
    }
    if (interpretation.bedrooms) {
      query = query.eq('bedrooms', interpretation.bedrooms);
    }

    const { data: listings, error } = await query.limit(20);

    if (error) throw error;

    // Calculate match scores for each listing
    const resultsWithScores = listings?.map(listing => ({
      ...listing,
      match_score: calculateMatchScore(listing, interpretation),
      match_reasons: generateMatchReasons(listing, interpretation)
    })).sort((a, b) => b.match_score - a.match_score) || [];

    return new Response(JSON.stringify({ 
      success: true, 
      interpretation,
      results: resultsWithScores,
      total_found: resultsWithScores.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in AI search function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function calculateMatchScore(listing: any, interpretation: any): number {
  let score = 0;
  let maxScore = 0;

  // Location match
  if (interpretation.location) {
    maxScore += 30;
    const location = interpretation.location.toLowerCase();
    if (listing.city?.toLowerCase().includes(location) || 
        listing.locality?.toLowerCase().includes(location)) {
      score += 30;
    }
  }

  // Property type match
  if (interpretation.property_type) {
    maxScore += 25;
    if (listing.property_type === interpretation.property_type) {
      score += 25;
    }
  }

  // Price range match
  if (interpretation.min_price || interpretation.max_price) {
    maxScore += 20;
    const inRange = (!interpretation.min_price || listing.price >= interpretation.min_price) &&
                   (!interpretation.max_price || listing.price <= interpretation.max_price);
    if (inRange) score += 20;
  }

  // Bedroom match
  if (interpretation.bedrooms) {
    maxScore += 15;
    if (listing.bedrooms === interpretation.bedrooms) {
      score += 15;
    }
  }

  // Base score for active listings
  maxScore += 10;
  score += 10;

  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
}

function generateMatchReasons(listing: any, interpretation: any): string[] {
  const reasons = [];
  
  if (interpretation.location && 
      (listing.city?.toLowerCase().includes(interpretation.location.toLowerCase()) ||
       listing.locality?.toLowerCase().includes(interpretation.location.toLowerCase()))) {
    reasons.push('Location match');
  }
  
  if (interpretation.property_type && listing.property_type === interpretation.property_type) {
    reasons.push('Property type match');
  }
  
  if (interpretation.bedrooms && listing.bedrooms === interpretation.bedrooms) {
    reasons.push('Bedroom count match');
  }
  
  if (interpretation.min_price && interpretation.max_price &&
      listing.price >= interpretation.min_price && listing.price <= interpretation.max_price) {
    reasons.push('Price range match');
  }
  
  return reasons;
}
