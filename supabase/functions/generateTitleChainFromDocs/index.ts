
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
    const { listing_id, legal_summary } = await req.json();

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

    const prompt = `Analyze the following legal summary and extract property title chain events. Create a structured timeline of ownership transfers and important legal events.

Legal Summary:
${legal_summary}

Extract and structure the events in this JSON format:
[
  {
    "event_label": "Original Purchase",
    "event_date": "YYYY-MM-DD",
    "description": "Brief description of the event"
  }
]

Focus on:
- Property purchases/sales
- Ownership transfers
- Mortgage/loan events
- Legal proceedings
- Title issues or clarifications

Return only valid JSON array of events, ordered chronologically.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a legal document analyst specializing in property title chains.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    const data = await response.json();
    const eventsJson = data.choices[0].message.content;
    
    let events;
    try {
      events = JSON.parse(eventsJson);
    } catch (parseError) {
      throw new Error('Failed to parse AI response as JSON');
    }

    // Save events to database
    const eventInserts = events.map((event: any) => ({
      listing_id,
      recorded_by: user.id,
      event_label: event.event_label,
      event_date: event.event_date,
      description: event.description
    }));

    const { data: chainData, error } = await supabaseClient
      .from('title_chain_events')
      .insert(eventInserts)
      .select();

    if (error) throw error;

    return new Response(JSON.stringify(chainData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generateTitleChainFromDocs function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
