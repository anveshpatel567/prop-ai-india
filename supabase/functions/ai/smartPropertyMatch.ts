
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
    const { seekerId, listings, seekerProfile } = await req.json();

    if (!seekerId || !listings || !seekerProfile) {
      throw new Error('Missing required parameters');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const matches = [];

    for (const listing of listings) {
      const prompt = `
        You are a real estate AI assistant. Analyze how well this property matches the seeker's requirements:

        SEEKER PROFILE:
        - Budget: ${seekerProfile.budget || 'Not specified'}
        - Property Type: ${seekerProfile.propertyType || 'Any'}
        - Location Preference: ${seekerProfile.location || 'Any'}
        - Bedrooms: ${seekerProfile.bedrooms || 'Any'}
        - Special Requirements: ${seekerProfile.notes || 'None'}

        PROPERTY DETAILS:
        - Title: ${listing.title}
        - Price: ₹${listing.price}
        - Type: ${listing.property_type}
        - Location: ${listing.locality}, ${listing.city}
        - Bedrooms: ${listing.bedrooms || 'Not specified'}
        - Bathrooms: ${listing.bathrooms || 'Not specified'}
        - Area: ${listing.area_sqft || 'Not specified'} sq ft
        - Description: ${listing.description || 'No description'}

        Provide a match score (0-100) and a brief explanation (2-3 sentences) of why this property matches or doesn't match the seeker's requirements.

        Respond in this exact format:
        SCORE: [number]
        EXPLANATION: [your explanation]
      `;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a helpful real estate matching assistant.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      // Parse the AI response
      const scoreMatch = aiResponse.match(/SCORE:\s*(\d+)/);
      const explanationMatch = aiResponse.match(/EXPLANATION:\s*(.+)/);

      const matchScore = scoreMatch ? parseInt(scoreMatch[1]) : 0;
      const explanation = explanationMatch ? explanationMatch[1].trim() : 'No explanation provided';

      // Store the match in database
      const { error } = await supabase
        .from('ai_property_matches')
        .insert({
          seeker_id: seekerId,
          listing_id: listing.id,
          match_score: matchScore,
          explanation: explanation
        });

      if (!error) {
        matches.push({
          listing_id: listing.id,
          match_score: matchScore,
          explanation: explanation,
          listing: listing
        });
      }
    }

    // Sort matches by score descending
    matches.sort((a, b) => b.match_score - a.match_score);

    return new Response(JSON.stringify({ 
      success: true, 
      matches: matches.slice(0, 10) // Return top 10 matches
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in smartPropertyMatch function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
