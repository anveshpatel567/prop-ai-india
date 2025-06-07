
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

    const { property_id } = await req.json();

    // Check user wallet balance
    const { data: wallet } = await supabaseClient
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (!wallet || wallet.balance < 20) {
      throw new Error('Insufficient credits');
    }

    // Simulate AI title chain analysis
    const mockChain = {
      steps: [
        { description: "Original property registration", date: "2010-03-15", owner: "John Smith" },
        { description: "Property transferred via sale deed", date: "2015-08-22", owner: "Mary Johnson" },
        { description: "Current ownership established", date: "2020-12-10", owner: "ABC Realty Corp" }
      ],
      verification_status: "verified",
      encumbrances: [],
      liens: []
    };

    // Store title chain data
    const { data: chainResult, error: chainError } = await supabaseClient
      .from('ai_title_chain_data')
      .insert({
        user_id: user.id,
        property_id,
        chain_json: mockChain,
        confidence_score: 0.92
      })
      .select()
      .single();

    if (chainError) throw chainError;

    // Deduct credits
    await supabaseClient
      .from('wallets')
      .update({ balance: wallet.balance - 20 })
      .eq('user_id', user.id);

    // Log transaction
    await supabaseClient
      .from('wallet_transactions')
      .insert({
        user_id: user.id,
        amount: -20,
        transaction_type: 'debit',
        description: 'AI Title Chain Generation'
      });

    return new Response(JSON.stringify({ 
      title_chain: chainResult,
      steps_found: mockChain.steps.length 
    }), {
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
