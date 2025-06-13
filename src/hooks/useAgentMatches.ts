
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type AgentMatch = {
  id: string;
  agent_name: string;
  match_score: number;
  agent_email: string;
  agent_phone: string;
  specialization: string;
  created_at: string;
};

export function useAgentMatches(userId: string) {
  const [matches, setMatches] = useState<AgentMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchMatches = async () => {
      try {
        const { data, error } = await supabase
          .from('agent_match_requests')
          .select('id, matched_agent_id, ai_comment, created_at')
          .eq('seeker_id', userId)
          .order('created_at', { ascending: false });

        if (error) {
          setError(error.message);
          setMatches([]);
        } else {
          // Transform the data to match our flat type
          const transformedMatches = (data || []).map(item => ({
            id: item.id,
            agent_name: `Agent ${item.matched_agent_id}`,
            match_score: 85, // Mock score
            agent_email: 'agent@example.com',
            agent_phone: '+91-9876543210',
            specialization: 'Real Estate',
            created_at: item.created_at
          }));
          setMatches(transformedMatches);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch matches');
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [userId]);

  return { matches, loading, error };
}
