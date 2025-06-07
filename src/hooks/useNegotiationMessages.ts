
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NegotiationMessage {
  id: string;
  thread_id: string;
  sender_id: string;
  message: string;
  message_type: 'offer' | 'counter' | 'ai_generated' | 'system';
  offer_amount?: number;
  sent_at: string;
}

export function useNegotiationMessages(threadId?: string) {
  const [messages, setMessages] = useState<NegotiationMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (threadId) {
      fetchMessages();
    }
  }, [threadId]);

  const fetchMessages = async () => {
    if (!threadId) return;

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('ai_negotiation_messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('sent_at', { ascending: true });

      if (error) throw error;

      setMessages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message: string, offerAmount?: number, useAiGeneration = false) => {
    if (!threadId) return;

    try {
      const { data, error } = await supabase.functions.invoke('sendNegotiationMessage', {
        body: {
          thread_id: threadId,
          message,
          offer_amount: offerAmount,
          use_ai_generation: useAiGeneration
        }
      });

      if (error) throw error;

      await fetchMessages(); // Refresh messages
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      throw err;
    }
  };

  return {
    messages,
    loading,
    error,
    fetchMessages,
    sendMessage
  };
}
