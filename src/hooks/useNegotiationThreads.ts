
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AiNegotiation } from '@/types/negotiation';

export const useNegotiationThreads = () => {
  const [negotiations, setNegotiations] = useState<AiNegotiation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNegotiations = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('ai_negotiations')
        .select('*')
        .or(`buyer_id.eq.${user.id},lister_id.eq.${user.id}`)
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('handleNegotiation', {
        body: { 
          action: 'start',
          listingId, 
          listerId, 
          offerText 
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
