
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
    const { communityId } = await req.json();

    const authHeader = req.headers.get('Authorization')!;
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Check if user has enough credits
    const { data: wallet } = await supabaseClient
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (!wallet || wallet.balance < 500) {
      throw new Error('Insufficient credits. 500 credits required to join community.');
    }

    // Check if already a member
    const { data: existingMembership } = await supabaseClient
      .from('community_memberships')
      .select('id')
      .eq('user_id', user.id)
      .eq('community_id', communityId)
      .single();

    if (existingMembership) {
      throw new Error('Already a member of this community');
    }

    // Deduct credits
    const { error: walletError } = await supabaseClient
      .from('wallets')
      .update({ 
        balance: wallet.balance - 500,
        last_updated: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (walletError) {
      throw new Error('Failed to deduct credits');
    }

    // Create membership
    const { data: membership, error: membershipError } = await supabaseClient
      .from('community_memberships')
      .insert({
        user_id: user.id,
        community_id: communityId
      })
      .select()
      .single();

    if (membershipError) {
      throw new Error('Failed to create membership');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      membership,
      message: 'Successfully joined community!'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in joinCommunity function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
