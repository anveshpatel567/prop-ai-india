
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
    const { communityId, message } = await req.json();

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
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

    // Check if user is a member
    const { data: membership } = await supabaseClient
      .from('community_memberships')
      .select('id')
      .eq('user_id', user.id)
      .eq('community_id', communityId)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (!membership) {
      throw new Error('You are not a member of this community or membership has expired');
    }

    // AI moderation check if OpenAI is available
    let aiFlagged = false;
    if (openAIApiKey) {
      try {
        const moderationResponse = await fetch('https://api.openai.com/v1/moderations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: message,
          }),
        });

        const moderationData = await moderationResponse.json();
        aiFlagged = moderationData.results[0]?.flagged || false;
      } catch (error) {
        console.error('AI moderation failed:', error);
        // Continue without flagging if AI moderation fails
      }
    }

    // Insert message
    const { data: newMessage, error } = await supabaseClient
      .from('community_messages')
      .insert({
        community_id: communityId,
        user_id: user.id,
        message: message,
        ai_flagged: aiFlagged
      })
      .select()
      .single();

    if (error) {
      throw new Error('Failed to post message');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: newMessage,
      flagged: aiFlagged
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in postCommunityMessage function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
