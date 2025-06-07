
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface NegotiationThread {
  id: string;
  listing_id: string;
  seeker_id: string;
  lister_id: string;
  status: 'pending' | 'countered' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

export function useNegotiationThreads() {
  const { user } = useAuth();
  const [threads, setThreads] = useState<NegotiationThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchThreads();
    }
  }, [user?.id]);

  const fetchThreads = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('ai_negotiation_threads')
        .select('*')
        .or(`seeker_id.eq.${user.id},lister_id.eq.${user.id}`)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      setThreads(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch threads');
    } finally {
      setLoading(false);
    }
  };

  const startNegotiation = async (listingId: string, listerId: string, initialOffer: number, message?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('startNegotiation', {
        body: {
          listing_id: listingId,
          lister_id: listerId,
          initial_offer: initialOffer,
          message
        }
      });

      if (error) throw error;

      await fetchThreads(); // Refresh threads
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start negotiation');
      throw err;
    }
  };

  const updateThreadStatus = async (threadId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('ai_negotiation_threads')
        .update({ status })
        .eq('id', threadId);

      if (error) throw error;

      await fetchThreads(); // Refresh threads
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update thread');
      throw err;
    }
  };

  return {
    threads,
    loading,
    error,
    fetchThreads,
    startNegotiation,
    updateThreadStatus
  };
}
