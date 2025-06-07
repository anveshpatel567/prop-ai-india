
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
  property_id: string;
  confidence_score: number;
  chain_json: Record<string, any>;
  created_at: string;
  event_label: string;
  event_date: string;
  description?: string;
}

export interface TitleChainInput {
  property_id: string;
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
      
      // Transform the data to match TitleChainEvent interface
      const transformedChains: TitleChainEvent[] = (data || []).map(chain => ({
        id: chain.id,
        property_id: chain.property_id,
        confidence_score: chain.confidence_score,
        chain_json: chain.chain_json || {},
        created_at: chain.created_at,
        event_label: chain.chain_json?.title || 'Property Transfer',
        event_date: chain.created_at,
        description: chain.chain_json?.description || 'Title chain event'
      }));
      
      setChains(transformedChains);
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
      
      // Refresh the chains after generation
      await fetchChains();
      
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
