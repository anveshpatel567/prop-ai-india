
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { query, max_results = 10 } = await req.json()

    // Mock GPT-4o Mini API call for property matching
    const mockResponse = {
      matches: [
        {
          property_id: "prop-1",
          title: "Luxury 3BHK in Bandra West",
          match_percentage: 92,
          match_reasons: [
            "Exact bedroom count match",
            "Location preference satisfied",
            "Budget range compatible"
          ],
          price: 25000000,
          area_sqft: 1200,
          location: "Bandra West, Mumbai"
        },
        {
          property_id: "prop-2", 
          title: "Modern 3BHK Near Metro",
          match_percentage: 87,
          match_reasons: [
            "Good connectivity match",
            "Similar price range",
            "Ready to move"
          ],
          price: 23000000,
          area_sqft: 1100,
          location: "Andheri East, Mumbai"
        }
      ],
      total_matches: 15,
      search_query_parsed: {
        property_type: "apartment",
        bedrooms: 3,
        location: "Mumbai",
        max_budget: 30000000,
        preferences: ["metro connectivity", "ready to move"]
      }
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    return new Response(
      JSON.stringify(mockResponse),
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
