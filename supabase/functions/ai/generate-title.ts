
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { property_data } = await req.json()

    // Mock GPT-4o Mini API call for title generation
    const mockTitles = [
      "Luxurious 3BHK Ready-to-Move Apartment in Prime Bandra West",
      "Stunning Sea-Facing 3BHK with Premium Amenities - Bandra West",
      "Modern 3BHK Apartment Near Metro Station - Bandra West Mumbai",
      "Elegant 3BHK with Gym & Pool - Premium Bandra Location",
      "Spacious 3BHK Apartment in Upscale Bandra West - Ready Possession"
    ]

    const response = {
      generated_titles: mockTitles,
      recommended_title: mockTitles[0],
      seo_score: 85,
      title_analysis: {
        keywords_included: ["3BHK", "Bandra West", "Ready-to-Move", "Luxurious"],
        character_count: mockTitles[0].length,
        readability_score: 92,
        appeal_rating: "High"
      },
      suggestions: [
        "Include price range for better visibility",
        "Add unique selling points",
        "Consider location-specific keywords"
      ]
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return new Response(
      JSON.stringify(response),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
