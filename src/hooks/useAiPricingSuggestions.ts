
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface AiPricingSuggestion {
  id: string;
  user_id: string;
  listing_id: string;
  suggested_price: number;
  market_analysis: any;
  confidence_score: number;
  status: string;
  created_at: string;
}

export function useAiPricingSuggestions() {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<AiPricingSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchSuggestions();
    }
  }, [user?.id]);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_pricing_suggestions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSuggestions(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch suggestions');
    } finally {
      setLoading(false);
    }
  };

  const generatePricingSuggestion = async (listing_id: string, property_details: any) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('generatePricingSuggestion', {
        body: { listing_id, property_details }
      });

      if (error) throw error;
      await fetchSuggestions();
      return data.suggestion;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate pricing');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    suggestions,
    loading,
    error,
    generatePricingSuggestion,
    refetch: fetchSuggestions
  };
}
