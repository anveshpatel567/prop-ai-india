
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

    const { listing_id, lister_id, offer_text, action_type } = await req.json()

    // Get authenticated user
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabase.auth.getUser(token)

    if (!user) {
      throw new Error('Unauthorized')
    }

    // Check if user has enough credits (100 credits for negotiation)
    const { data: wallet } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single()

    if (!wallet || wallet.balance < 100) {
      throw new Error('Insufficient credits. Negotiation requires 100 credits.')
    }

    // Deduct credits
    await supabase
      .from('wallets')
      .update({ balance: wallet.balance - 100 })
      .eq('user_id', user.id)

    // Create or update negotiation
    const { data: negotiation, error: negotiationError } = await supabase
      .from('ai_negotiations')
      .upsert({
        listing_id,
        buyer_id: user.id,
        lister_id,
        offer_text,
        status: 'open',
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (negotiationError) throw negotiationError

    // Log the tool usage
    await supabase
      .from('ai_tool_transactions')
      .insert({
        user_id: user.id,
        tool_name: 'ai_negotiation',
        credit_cost: 100,
        input_data: { listing_id, action_type },
        output_data: { negotiation_id: negotiation.id },
        status: 'success'
      })

    return new Response(
      JSON.stringify({ 
        success: true, 
        negotiation_id: negotiation.id,
        remaining_credits: wallet.balance - 100
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error handling negotiation:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
