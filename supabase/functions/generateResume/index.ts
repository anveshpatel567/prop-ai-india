
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { experience_years, regions_covered, rera_id, specializations, achievements } = await req.json()

    // Get authenticated user
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabase.auth.getUser(token)

    if (!user) {
      throw new Error('Unauthorized')
    }

    // Check if user has enough credits (100 credits for resume)
    const { data: wallet } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single()

    if (!wallet || wallet.balance < 100) {
      throw new Error('Insufficient credits')
    }

    // Create resume record first
    const { data: resume, error: resumeError } = await supabase
      .from('ai_resumes')
      .insert({
        user_id: user.id,
        status: 'generating',
        credits_used: 100
      })
      .select()
      .single()

    if (resumeError) throw resumeError

    try {
      // Generate resume content with AI
      let resumeContent = ''
      
      if (openAIApiKey) {
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
                content: 'You are a professional resume writer specializing in real estate agents. Create a comprehensive, professional resume in markdown format.' 
              },
              { 
                role: 'user', 
                content: `Create a professional resume for a real estate agent with:
                - Experience: ${experience_years} years
                - Regions covered: ${regions_covered}
                - RERA ID: ${rera_id}
                - Specializations: ${specializations}
                - Achievements: ${achievements}
                
                Include sections for: Professional Summary, Experience, Specializations, Achievements, Contact Information placeholder.
                Format in clean markdown.` 
              }
            ],
            max_tokens: 1500
          }),
        });

        if (response.ok) {
          const data = await response.json();
          resumeContent = data.choices[0].message.content;
        } else {
          throw new Error('Failed to generate resume content')
        }
      } else {
        // Fallback template if no OpenAI key
        resumeContent = `# Professional Resume

## Professional Summary
Experienced real estate professional with ${experience_years} years in the industry, specializing in ${specializations} across ${regions_covered}.

## Experience
- **Years of Experience:** ${experience_years}
- **RERA Registration:** ${rera_id}
- **Coverage Areas:** ${regions_covered}

## Specializations
${specializations}

## Key Achievements
${achievements}

## Contact Information
[Contact details to be updated]
`
      }

      // Deduct credits
      await supabase
        .from('wallets')
        .update({ balance: wallet.balance - 100 })
        .eq('user_id', user.id)

      // Update resume with content
      const { error: updateError } = await supabase
        .from('ai_resumes')
        .update({
          resume_data: {
            content: resumeContent,
            experience_years,
            regions_covered,
            rera_id,
            specializations,
            achievements
          },
          status: 'ready'
        })
        .eq('id', resume.id)

      if (updateError) throw updateError

      // Log the tool attempt
      await supabase.functions.invoke('logToolAttempt', {
        body: {
          user_id: user.id,
          tool_name: 'ai_resume_builder',
          was_allowed: true,
          reason: 'Resume generated successfully',
          credits_required: 100,
          user_credits: wallet.balance - 100
        }
      })

      return new Response(
        JSON.stringify({ 
          success: true, 
          resume_id: resume.id,
          content: resumeContent
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )

    } catch (error) {
      // Update resume status to error
      await supabase
        .from('ai_resumes')
        .update({
          status: 'error',
          error_message: error.message
        })
        .eq('id', resume.id)
      
      throw error
    }

  } catch (error) {
    console.error('Error generating resume:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
