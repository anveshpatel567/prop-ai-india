
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
    const { name, experience_years, city, specialization, past_projects, strengths } = await req.json();

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

    const prompt = `Create a professional real estate agent resume in Markdown format for:
    
Name: ${name}
Experience: ${experience_years} years
City: ${city}
Specialization: ${specialization}
Past Projects: ${past_projects}
Key Strengths: ${strengths}

Format as a clean, professional Markdown resume with sections for:
- Professional Summary
- Experience & Achievements
- Specializations
- Key Projects
- Contact Information

Keep it concise but impactful, highlighting real estate expertise and achievements.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a professional resume writer specializing in real estate agent resumes.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    const data = await response.json();
    const resume_markdown = data.choices[0].message.content;

    // Save to database
    const { data: resumeData, error } = await supabaseClient
      .from('ai_resumes')
      .insert({
        user_id: user.id,
        name,
        experience_years,
        city,
        specialization,
        past_projects,
        strengths,
        resume_markdown
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(resumeData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generateAgentResume function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
