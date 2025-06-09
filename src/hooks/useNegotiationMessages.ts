
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { NegotiationMessage } from '@/types/negotiation';

export const useNegotiationMessages = (negotiationId: string) => {
  const [messages, setMessages] = useState<NegotiationMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    if (!negotiationId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_negotiation_messages')
        .select('*')
        .eq('negotiation_id', negotiationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message: string, messageType: 'offer' | 'counter' | 'acceptance' | 'rejection' = 'offer') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('ai_negotiation_messages')
        .insert({
          negotiation_id: negotiationId,
          sender_id: user.id,
          message,
          message_type: messageType,
          sent_at: new Date().toISOString()
        });

      if (error) throw error;
      await fetchMessages();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [negotiationId]);

  return {
    messages,
    loading,
    sendMessage,
    refetch: fetchMessages
  };
};
