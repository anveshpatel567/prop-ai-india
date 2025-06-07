
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TitleChainEvent {
  id: string;
  event_label: string;
  event_date: string;
  description?: string;
}

interface TitleChainResponse {
  events: TitleChainEvent[];
  property_id: string;
  confidence_score: number;
}

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
    if (!property_id) throw new Error('Property ID is required');

    // Check user wallet balance
    const { data: wallet } = await supabaseClient
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (!wallet || wallet.balance < 20) {
      throw new Error('Insufficient credits');
    }

    // Generate mock title chain events
    const mockEvents: TitleChainEvent[] = [
      {
        id: crypto.randomUUID(),
        event_label: "Original Purchase",
        event_date: "2010-03-15T00:00:00.000Z",
        description: "Property originally purchased by John Smith from ABC Development"
      },
      {
        id: crypto.randomUUID(),
        event_label: "Transfer via Sale Deed",
        event_date: "2015-08-22T00:00:00.000Z",
        description: "Property transferred to Mary Johnson through registered sale deed"
      },
      {
        id: crypto.randomUUID(),
        event_label: "Current Ownership",
        event_date: "2020-12-10T00:00:00.000Z",
        description: "Current ownership established under XYZ Realty Corp"
      }
    ];

    const titleChainData = {
      events: mockEvents,
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
        chain_json: titleChainData,
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

    const response: TitleChainResponse = {
      events: mockEvents,
      property_id,
      confidence_score: 0.92
    };

    return new Response(JSON.stringify(response), {
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
