
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

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

    const { listing_id } = await req.json();

    // Check wallet balance
    const { data: wallet } = await supabaseClient
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (!wallet || wallet.balance < 15) {
      return new Response(JSON.stringify({ error: 'Insufficient credits' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create video job
    const { data: videoJob, error } = await supabaseClient
      .from('ai_video_jobs')
      .insert({
        user_id: user.id,
        listing_id,
        generation_prompt: 'Generate promotional video for real estate listing',
        status: 'processing'
      })
      .select()
      .single();

    if (error) throw error;

    // Deduct credits
    await supabaseClient
      .from('wallets')
      .update({ balance: wallet.balance - 15 })
      .eq('user_id', user.id);

    // Log transaction
    await supabaseClient
      .from('wallet_transactions')
      .insert({
        user_id: user.id,
        amount: -15,
        transaction_type: 'debit',
        description: 'AI Video Generation'
      });

    // Simulate video generation (in real implementation, integrate with video AI service)
    setTimeout(async () => {
      await supabaseClient
        .from('ai_video_jobs')
        .update({
          status: 'completed',
          video_url: `https://example.com/video/${videoJob.id}`,
          thumbnail_url: `https://example.com/thumb/${videoJob.id}`
        })
        .eq('id', videoJob.id);
    }, 5000);

    return new Response(JSON.stringify({ video_job: videoJob }), {
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
