
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { thread_id, message, offer_amount, use_ai_generation } = await req.json()

    // Get authenticated user
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabase.auth.getUser(token)

    if (!user) {
      throw new Error('Unauthorized')
    }

    let finalMessage = message
    let messageType = offer_amount ? 'counter' : 'offer'

    // If AI generation requested and OpenAI key available
    if (use_ai_generation && openAIApiKey) {
      // Get thread context
      const { data: messages } = await supabase
        .from('ai_negotiation_messages')
        .select('*')
        .eq('thread_id', thread_id)
        .order('sent_at', { ascending: true })

      const conversationHistory = messages?.map(m => 
        `${m.message_type}: ${m.message}${m.offer_amount ? ` (₹${m.offer_amount})` : ''}`
      ).join('\n') || ''

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { 
              role: 'system', 
              content: 'You are a professional real estate negotiation assistant. Generate a polite, professional counteroffer message. Keep it concise and friendly.' 
            },
            { 
              role: 'user', 
              content: `Based on this conversation:\n${conversationHistory}\n\nGenerate a professional response for a ${offer_amount ? 'counter-offer of ₹' + offer_amount : 'message'}.` 
            }
          ],
          max_tokens: 150
        }),
      });

      if (response.ok) {
        const data = await response.json();
        finalMessage = data.choices[0].message.content;
        messageType = 'ai_generated'
      }
    }

    // Create message
    const { data: messageData, error: messageError } = await supabase
      .from('ai_negotiation_messages')
      .insert({
        thread_id,
        sender_id: user.id,
        message: finalMessage,
        message_type: messageType,
        offer_amount
      })
      .select()
      .single()

    if (messageError) throw messageError

    // Update thread status if this is a counter-offer
    if (offer_amount) {
      await supabase
        .from('ai_negotiation_threads')
        .update({ status: 'countered' })
        .eq('id', thread_id)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: messageData
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error sending negotiation message:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
