
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { listing_id, lister_id, initial_offer, message } = await req.json()

    // Get authenticated user
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabase.auth.getUser(token)

    if (!user) {
      throw new Error('Unauthorized')
    }

    // Check if user has enough credits (50 credits for negotiation)
    const { data: wallet } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single()

    if (!wallet || wallet.balance < 50) {
      throw new Error('Insufficient credits')
    }

    // Deduct credits
    await supabase
      .from('wallets')
      .update({ balance: wallet.balance - 50 })
      .eq('user_id', user.id)

    // Create negotiation thread
    const { data: thread, error: threadError } = await supabase
      .from('ai_negotiation_threads')
      .insert({
        listing_id,
        seeker_id: user.id,
        lister_id,
        status: 'pending'
      })
      .select()
      .single()

    if (threadError) throw threadError

    // Create initial message
    const { data: messageData, error: messageError } = await supabase
      .from('ai_negotiation_messages')
      .insert({
        thread_id: thread.id,
        sender_id: user.id,
        message: message || `I'd like to make an offer of ₹${initial_offer}`,
        message_type: 'offer',
        offer_amount: initial_offer
      })
      .select()
      .single()

    if (messageError) throw messageError

    // Log the tool attempt
    await supabase.functions.invoke('logToolAttempt', {
      body: {
        user_id: user.id,
        tool_name: 'ai_negotiation',
        was_allowed: true,
        reason: 'Negotiation started successfully',
        credits_required: 50,
        user_credits: wallet.balance - 50
      }
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        thread_id: thread.id,
        message: messageData
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error starting negotiation:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
