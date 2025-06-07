
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TitleChainEvent {
  id: string;
  listing_id: string;
  recorded_by: string;
  event_label: string;
  event_date: string;
  description: string;
  created_at: string;
}

export interface TitleChainInput {
  listing_id: string;
  legal_summary: string;
}

export function useTitleChain() {
  const [data, setData] = useState<TitleChainEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateChain = async (input: TitleChainInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: result, error: functionError } = await supabase.functions.invoke('generateTitleChainFromDocs', {
        body: input
      });

      if (functionError) throw functionError;
      
      setData(result);
      toast({
        title: "Title Chain Generated",
        description: "Property title chain has been analyzed and created!",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate title chain';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchChain = async (listing_id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: result, error } = await supabase
        .from('title_chain_events')
        .select('*')
        .eq('listing_id', listing_id)
        .order('event_date', { ascending: true });

      if (error) throw error;
      setData(result || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch title chain';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { 
    data, 
    loading, 
    error, 
    generateChain, 
    fetchChain 
  };
}
