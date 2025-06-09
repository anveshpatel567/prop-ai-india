
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
    const { path, entityId, triggerType = 'manual' } = await req.json();

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

    // Get context data based on path
    let contextData = '';
    if (path.startsWith('/property/') && entityId) {
      const { data: listing } = await supabaseClient
        .from('listings')
        .select('title, description, property_type, city, price, bedrooms, bathrooms')
        .eq('id', entityId)
        .single();

      if (listing) {
        contextData = `Property: ${listing.title}, Type: ${listing.property_type}, Location: ${listing.city}, Price: ₹${listing.price}, Bedrooms: ${listing.bedrooms}, Bathrooms: ${listing.bathrooms}`;
      }
    } else if (path === '/search') {
      contextData = 'Property search page with AI-powered filters and location-based results';
    } else if (path === '/listing/all') {
      contextData = 'Browse all property listings with advanced filters';
    } else if (path === '/ai') {
      contextData = 'AI tools for real estate including pricing, fraud detection, video generation';
    } else {
      contextData = `Page: ${path}`;
    }

    const prompt = `Generate SEO metadata for a real estate website page with the following context:

Page: ${path}
Context: ${contextData}
Trigger: ${triggerType}

Requirements:
- Title: 50-60 characters, include "FreePropList" brand, location if relevant
- Description: 150-160 characters, compelling and informative
- Keywords: 5-8 relevant keywords, comma-separated
- Focus on Indian real estate market
- Include AI, property, real estate relevant terms
- Make it appealing for search engines

Return JSON format:
{
  "title": "...",
  "description": "...",
  "keywords": "..."
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert SEO specialist for real estate websites. Generate optimized metadata that will rank well in search engines.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Parse the JSON response
    const metadata = JSON.parse(aiResponse);

    // Save to database with auto_updated flag
    if (metadata.title && metadata.description) {
      const { error } = await supabaseClient
        .from('ai_seo_overrides')
        .upsert({
          path,
          title: metadata.title,
          description: metadata.description,
          keywords: metadata.keywords,
          auto_updated: triggerType === 'auto',
          source: 'gpt'
        });

      if (error) {
        console.error('Error saving SEO metadata:', error);
      }
    }

    return new Response(JSON.stringify(metadata), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generateSeoMetadata function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
