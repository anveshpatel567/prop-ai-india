
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

    const { brochure_data } = await req.json();

    // Check user wallet balance
    const { data: wallet } = await supabaseClient
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (!wallet || wallet.balance < 25) {
      throw new Error('Insufficient credits');
    }

    // Simulate AI brochure analysis
    const mockMatches = [
      { listing_id: 'listing_1', similarity: 0.85, reason: 'Similar price range and location' },
      { listing_id: 'listing_2', similarity: 0.72, reason: 'Matching property type and amenities' }
    ];

    // Store match results
    const { data: matchResult, error: matchError } = await supabaseClient
      .from('ai_brochure_match_links')
      .insert({
        user_id: user.id,
        uploaded_brochure_url: 'brochure_url_placeholder',
        matched_listings: mockMatches,
        similarity_scores: { average: 0.785 },
        status: 'completed'
      })
      .select()
      .single();

    if (matchError) throw matchError;

    // Deduct credits
    await supabaseClient
      .from('wallets')
      .update({ balance: wallet.balance - 25 })
      .eq('user_id', user.id);

    // Log transaction
    await supabaseClient
      .from('wallet_transactions')
      .insert({
        user_id: user.id,
        amount: -25,
        transaction_type: 'debit',
        description: 'AI Brochure Matching'
      });

    return new Response(JSON.stringify({ 
      match_result: matchResult,
      matches_found: mockMatches.length 
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
