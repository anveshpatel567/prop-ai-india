
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type AgentMatchResult = {
  id: string;
  seeker_id: string;
  matched_agent_id: string;
  ai_comment: string;
  preferred_city: string;
  budget: number;
  property_type: string;
  created_at: string;
};

export function useAgentMatchResults(userId: string) {
  const [matches, setMatches] = useState<AgentMatchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    supabase
      .from('agent_match_requests')
      .select('*')
      .eq('seeker_id', userId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setMatches([]);
        } else {
          const mapped = (data || []).map(item => ({
            id: item.id,
            seeker_id: item.seeker_id || '',
            matched_agent_id: item.matched_agent_id || '',
            ai_comment: item.ai_comment || '',
            preferred_city: item.preferred_city || '',
            budget: item.budget || 0,
            property_type: item.property_type || '',
            created_at: item.created_at || new Date().toISOString()
          }));
          setMatches(mapped);
        }
        setLoading(false);
      });
  }, [userId]);

  return { matches, loading, error };
}
