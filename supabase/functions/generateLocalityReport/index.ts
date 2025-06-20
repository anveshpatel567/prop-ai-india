
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

    const { locality, city } = await req.json();

    // Check wallet balance
    const { data: wallet } = await supabaseClient
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (!wallet || wallet.balance < 30) {
      return new Response(JSON.stringify({ error: 'Insufficient credits' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = `Generate a comprehensive locality report for ${locality}, ${city}. Include:
    1. Demographics and population insights
    2. Real estate market trends
    3. Infrastructure and amenities
    4. Safety and crime statistics
    5. Educational institutions
    6. Transportation connectivity
    7. Future development projects
    8. Investment potential
    
    Format as detailed markdown report.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a real estate market analyst generating detailed locality reports.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    const report = data.choices[0].message.content;

    // Save report
    const { data: savedReport, error } = await supabaseClient
      .from('ai_locality_reports')
      .insert({
        user_id: user.id,
        locality,
        city,
        report_markdown: report
      })
      .select()
      .single();

    if (error) throw error;

    // Deduct credits
    await supabaseClient
      .from('wallets')
      .update({ balance: wallet.balance - 30 })
      .eq('user_id', user.id);

    return new Response(JSON.stringify({ report: savedReport }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
