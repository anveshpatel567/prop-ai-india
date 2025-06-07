
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AiSearchRecord {
  id: string;
  user_id: string;
  search_query: string;
  ai_interpretation: any;
  results_count: number | null;
  filters_applied: any;
  credits_used: number;
  created_at: string;
}

export const useAiSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<AiSearchRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchHistory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_search_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setSearchHistory(data || []);
    } catch (error) {
      console.error('Error fetching search history:', error);
    } finally {
      setLoading(false);
    }
  };

  const recordAiSearch = async (search: Omit<AiSearchRecord, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('ai_search_history')
        .insert([search])
        .select()
        .single();

      if (error) throw error;
      
      await fetchSearchHistory();
      return data;
    } catch (error) {
      console.error('Error recording AI search:', error);
      throw error;
    }
  };

  return {
    searchHistory,
    loading,
    fetchSearchHistory,
    recordAiSearch
  };
};
