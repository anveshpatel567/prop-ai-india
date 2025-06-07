
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface TitleChainData {
  id: string;
  user_id: string;
  property_id: string;
  chain_json: any;
  confidence_score: number;
  created_at: string;
}

export interface TitleChainEvent {
  id: string;
  event_label: string;
  event_date: string;
  description?: string;
}

interface UseTitleChain {
  chains: TitleChainEvent[];
  loading: boolean;
  error: string;
  generateTitleChain: (property_id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useTitleChain(): UseTitleChain {
  const { user } = useAuth();
  const [chains, setChains] = useState<TitleChainEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchChains = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_title_chain_data')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Extract events from chain_json and flatten them
      const allEvents: TitleChainEvent[] = [];
      data?.forEach(chain => {
        if (chain.chain_json?.events) {
          allEvents.push(...chain.chain_json.events);
        }
      });
      
      setChains(allEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch title chains');
    } finally {
      setLoading(false);
    }
  };

  const generateTitleChain = async (property_id: string) => {
    try {
      setLoading(true);
      setError('');
      
      const { data, error } = await supabase.functions.invoke('generateTitleChain', {
        body: { property_id }
      });

      if (error) throw error;
      
      // Update local state with new events
      if (data?.events) {
        setChains(prev => [...data.events, ...prev]);
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate title chain';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchChains();
    }
  }, [user?.id]);

  return {
    chains,
    loading,
    error,
    generateTitleChain,
    refetch: fetchChains
  };
}
