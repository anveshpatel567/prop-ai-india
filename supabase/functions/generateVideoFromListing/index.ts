
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { listing_id, listing_data } = await req.json();

    // Check wallet balance for 500 credits
    const { data: wallet } = await supabaseClient
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (!wallet || wallet.balance < 500) {
      return new Response(JSON.stringify({ error: 'Insufficient credits. Need 500 credits (₹500)' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = `You are a real estate video script writer. Create an engaging video script for this property listing:

Property Details: ${JSON.stringify(listing_data)}

Create a compelling video script that includes:
1. Opening hook (10-15 seconds)
2. Property highlights (30-45 seconds)  
3. Location benefits (15-20 seconds)
4. Call to action (10-15 seconds)

Format as JSON:
{
  "script": {
    "opening": "Engaging opening line",
    "highlights": "Property features presentation",
    "location": "Location benefits",
    "cta": "Call to action"
  },
  "duration_estimate": "90 seconds",
  "scene_count": 4,
  "visual_suggestions": ["suggestion1", "suggestion2"]
}`;

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a professional real estate video script writer. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800
      }),
    });

    const data = await response.json();
    const script = JSON.parse(data.choices[0].message.content);

    // Create video job
    const { data: videoJob, error } = await supabaseClient
      .from('ai_video_jobs')
      .insert({
        user_id: user.id,
        listing_id,
        generation_prompt: script.script,
        status: 'completed',
        video_url: `https://example.com/video/${listing_id}`,
        thumbnail_url: `https://example.com/thumb/${listing_id}`
      })
      .select()
      .single();

    if (error) throw error;

    // Deduct 500 credits
    await supabaseClient
      .from('wallets')
      .update({ balance: wallet.balance - 500 })
      .eq('user_id', user.id);

    // Log transaction
    await supabaseClient
      .from('ai_tool_transactions')
      .insert({
        user_id: user.id,
        tool_name: 'video_generator',
        credit_cost: 500,
        input_data: { listing_id, listing_data },
        output_data: script,
        status: 'success'
      });

    return new Response(JSON.stringify({ 
      video_job: videoJob,
      script,
      credits_used: 500
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generateVideoFromListing:', error);
    
    // Log failed transaction
    try {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
      );
      const { data: { user } } = await supabaseClient.auth.getUser();
      
      if (user) {
        await supabaseClient
          .from('ai_tool_transactions')
          .insert({
            user_id: user.id,
            tool_name: 'video_generator',
            credit_cost: 0,
            status: 'failed',
            error_message: error.message
          });
      }
    } catch {}

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
