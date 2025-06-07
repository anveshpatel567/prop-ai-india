
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

    // Check if user is admin
    const { data: userRole } = await supabaseClient
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!userRole || userRole.role !== 'admin') {
      throw new Error('Admin access required');
    }

    const { target_user_id, action_type, amount, reason } = await req.json();

    // Get current wallet balance
    const { data: wallet } = await supabaseClient
      .from('wallets')
      .select('balance')
      .eq('user_id', target_user_id)
      .single();

    if (!wallet) throw new Error('User wallet not found');

    const newBalance = action_type === 'add' ? wallet.balance + amount : wallet.balance - amount;

    // Update wallet
    await supabaseClient
      .from('wallets')
      .update({ balance: Math.max(0, newBalance) })
      .eq('user_id', target_user_id);

    // Log admin action
    await supabaseClient
      .from('admin_credit_actions')
      .insert({
        admin_id: user.id,
        target_user_id,
        action_type,
        amount,
        reason
      });

    // Log transaction
    await supabaseClient
      .from('wallet_transactions')
      .insert({
        user_id: target_user_id,
        amount: action_type === 'add' ? amount : -amount,
        transaction_type: action_type === 'add' ? 'credit' : 'debit',
        description: `Admin ${action_type}: ${reason}`
      });

    return new Response(JSON.stringify({ 
      success: true, 
      new_balance: Math.max(0, newBalance) 
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
