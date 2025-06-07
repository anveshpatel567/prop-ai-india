
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
    const { locality, city } = await req.json();

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

    const prompt = `Create a comprehensive locality report for ${locality}, ${city} in Markdown format. Include the following sections:

# ${locality}, ${city} - Locality Report

## Overview
Brief description of the area and its character.

## Infrastructure & Connectivity
- Transportation options
- Road connectivity
- Public transport availability

## Amenities & Facilities
- Educational institutions
- Healthcare facilities
- Shopping centers
- Recreation facilities

## Real Estate Market
- Property types available
- Price trends
- Investment potential

## Lifestyle & Demographics
- Population characteristics
- Lifestyle factors
- Community features

## Future Development
- Upcoming projects
- Infrastructure developments
- Growth potential

Keep it professional, informative, and well-structured using Markdown formatting.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a real estate market analyst who creates detailed locality reports.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    const report_markdown = data.choices[0].message.content;

    // Save to database
    const { data: reportData, error } = await supabaseClient
      .from('ai_locality_reports')
      .insert({
        user_id: user.id,
        locality,
        city,
        report_markdown
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(reportData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generateLocalityReport function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
