
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
    const { preferred_city, budget, property_type, urgency_level, notes } = await req.json();

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

    // Fetch available agents with resumes
    const { data: agents, error: agentsError } = await supabaseClient
      .from('ai_resumes')
      .select(`
        *,
        user:user_id (
          id,
          full_name,
          role
        )
      `)
      .not('resume_markdown', 'is', null);

    if (agentsError) throw agentsError;

    if (!agents || agents.length === 0) {
      return new Response(JSON.stringify({ 
        matched_agent_id: null, 
        ai_comment: 'No agents with resumes found in the system.' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create agent summaries for AI
    const agentSummaries = agents.map(agent => 
      `Agent ID: ${agent.user_id}, Name: ${agent.name}, Experience: ${agent.experience_years} years, City: ${agent.city}, Specialization: ${agent.specialization}`
    ).join('\n');

    const prompt = `Based on the following seeker requirements and available agents, recommend the best match:

Seeker Requirements:
- Preferred City: ${preferred_city}
- Budget: ₹${budget}
- Property Type: ${property_type}
- Urgency Level: ${urgency_level}
- Notes: ${notes}

Available Agents:
${agentSummaries}

Please respond with ONLY the Agent ID of the best match and a brief explanation (2-3 sentences) of why this agent is the best fit.
Format: "AGENT_ID: [id] - [explanation]"`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert real estate agent matching system.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Extract agent ID from response
    const agentIdMatch = aiResponse.match(/AGENT_ID:\s*([a-f0-9-]+)/i);
    const matched_agent_id = agentIdMatch ? agentIdMatch[1] : agents[0]?.user_id || null;
    
    // Save match request to database
    const { data: matchData, error } = await supabaseClient
      .from('agent_match_requests')
      .insert({
        seeker_id: user.id,
        preferred_city,
        budget,
        property_type,
        urgency_level,
        notes,
        matched_agent_id,
        ai_comment: aiResponse
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({
      matched_agent_id,
      ai_comment: aiResponse,
      match_request: matchData
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in matchAgentWithSeeker function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
