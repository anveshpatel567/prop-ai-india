
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface BrochureMatch {
  id: string;
  user_id: string;
  uploaded_brochure_url: string;
  matched_listings: any;
  similarity_scores: any;
  status: string;
  created_at: string;
}

export function useBrochureMatches() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<BrochureMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchMatches();
    }
  }, [user?.id]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_brochure_match_links')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMatches(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  };

  const generateMatches = async (brochureFile: File) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('generateBrochureMatches', {
        body: { brochure_data: await brochureFile.text() }
      });

      if (error) throw error;
      await fetchMatches();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate matches');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    matches,
    loading,
    error,
    generateMatches,
    refetch: fetchMatches
  };
}
