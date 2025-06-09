
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
    const { leadId, context, numVariants = 3, scheduledTime } = await req.json();

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

    // Get user ID from auth
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const prompt = `Generate ${numVariants} different follow-up message variants for a real estate lead:

Context: ${context}
Lead ID: ${leadId}

Create ${numVariants} different approaches:
1. Professional and direct
2. Friendly and conversational  
3. Value-focused with benefits

Each variant should be:
- 50-100 words
- Personalized and engaging
- Include a clear call-to-action
- Professional yet approachable

Return as JSON array:
[
  {"variant": "professional", "message": "..."},
  {"variant": "friendly", "message": "..."},
  {"variant": "value", "message": "..."}
]`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert real estate communication specialist who creates personalized follow-up messages.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    const variants = JSON.parse(data.choices[0].message.content);

    // Save all variants to database
    const followupPromises = variants.map((variant: any) => 
      supabaseClient
        .from('ai_followups')
        .insert({
          lead_id: leadId,
          agent_id: user.id,
          followup_message: variant.message,
          followup_variant: variant.variant,
          followup_type: 'ai_generated',
          is_scheduled: !!scheduledTime,
          scheduled_date: scheduledTime,
          credits_used: Math.ceil(30 / numVariants)
        })
    );

    await Promise.all(followupPromises);

    // Log transaction
    await supabaseClient
      .from('ai_tool_transactions')
      .insert({
        user_id: user.id,
        tool_name: 'followup_variants',
        credit_cost: 30,
        input_data: { leadId, context, numVariants },
        output_data: { variants },
        status: 'success'
      });

    return new Response(JSON.stringify({ variants }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generateFollowupVariants function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
