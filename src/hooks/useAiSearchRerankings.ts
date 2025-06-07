
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiSearchReranking {
  id: string;
  user_id: string;
  original_query: string;
  reranked_results: string;
  reason_summary: string | null;
  created_at: string;
}

export const useAiSearchRerankings = () => {
  const [rerankings, setRerankings] = useState<AiSearchReranking[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUserRerankings = async (userId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_search_rerankings')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setRerankings(data || []);
    } catch (error) {
      console.error('Error fetching search rerankings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch search rerankings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logReranking = async (
    userId: string,
    originalQuery: string,
    rerankedResults: string[],
    reasonSummary?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_search_rerankings')
        .insert({
          user_id: userId,
          original_query: originalQuery,
          reranked_results: JSON.stringify(rerankedResults),
          reason_summary: reasonSummary || null
        });

      if (error) throw error;

      console.log('Search reranking logged successfully');

      // Refresh rerankings
      fetchUserRerankings(userId);
    } catch (error) {
      console.error('Error logging search reranking:', error);
      toast({
        title: "Error",
        description: "Failed to log search reranking",
        variant: "destructive",
      });
    }
  };

  const parseRerankedResults = (rerankedResults: string): string[] => {
    try {
      return JSON.parse(rerankedResults);
    } catch (error) {
      console.error('Error parsing reranked results:', error);
      return [];
    }
  };

  return {
    rerankings,
    loading,
    fetchUserRerankings,
    logReranking,
    parseRerankedResults,
  };
};
