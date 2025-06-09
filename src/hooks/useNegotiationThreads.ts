
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AiNegotiation } from '@/types/negotiation';

export const useNegotiationThreads = () => {
  const [negotiations, setNegotiations] = useState<AiNegotiation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNegotiations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_negotiations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNegotiations(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch negotiations');
    } finally {
      setLoading(false);
    }
  };

  const startNegotiation = async (listingId: string, listerId: string, offerText: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('handleNegotiation', {
        body: {
          listing_id: listingId,
          lister_id: listerId,
          offer_text: offerText,
          action_type: 'start_negotiation'
        }
      });

      if (error) throw error;
      
      await fetchNegotiations();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to start negotiation');
    }
  };

  useEffect(() => {
    fetchNegotiations();
  }, []);

  return {
    negotiations,
    loading,
    error,
    startNegotiation,
    refetch: fetchNegotiations
  };
};
