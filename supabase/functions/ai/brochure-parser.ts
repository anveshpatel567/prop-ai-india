
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
    const { brochure_url, description } = await req.json()

    // Mock GPT-4o Mini API call for brochure parsing
    const mockParsedData = {
      extracted_fields: {
        title: "Luxury 3BHK Apartment in Bandra West",
        property_type: "residential",
        listing_type: "sale",
        price: 25000000,
        area_sqft: 1200,
        bedrooms: 3,
        bathrooms: 2,
        city: "Mumbai",
        locality: "Bandra West",
        amenities: [
          "Swimming Pool",
          "Gym",
          "Parking",
          "Security",
          "Power Backup",
          "Lift"
        ],
        features: [
          "Ready to move",
          "Near metro station",
          "Premium location",
          "Sea facing"
        ]
      },
      confidence_score: 0.94,
      parsing_notes: "High confidence extraction from clear brochure text and images",
      suggested_improvements: [
        "Add floor plan details",
        "Include exact possession date",
        "Mention RERA number if applicable"
      ]
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 3000))

    return new Response(
      JSON.stringify(mockParsedData),
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
