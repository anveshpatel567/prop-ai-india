
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

export interface TitleChainInput {
  listing_id: string;
  legal_summary: string;
}

export interface TitleChainEvent {
  date: string;
  title_holder: string;
  notes?: string;
  event_type?: string;
}

export function useTitleChain() {
  const { user } = useAuth();
  const [chains, setChains] = useState<TitleChainData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchChains();
    }
  }, [user?.id]);

  const fetchChains = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_title_chain_data')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChains(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch title chains');
    } finally {
      setLoading(false);
    }
  };

  const generateTitleChain = async (property_id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('generateTitleChain', {
        body: { property_id }
      });

      if (error) throw error;
      await fetchChains();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate title chain');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateChain = async (input: TitleChainInput) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('generateTitleChainFromDocs', {
        body: input
      });

      if (error) throw error;
      await fetchChains();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate title chain');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    chains,
    loading,
    error,
    generateTitleChain,
    generateChain,
    refetch: fetchChains
  };
}
