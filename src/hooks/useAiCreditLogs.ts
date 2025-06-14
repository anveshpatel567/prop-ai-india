
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AiCreditLog {
  id: string;
  user_id: string;
  tool_name: string;
  credits_used: number;
  created_at: string;
  transaction_type: string;
}

export function useAiCreditLogs(userId: string) {
  const [logs, setLogs] = useState<AiCreditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchLogs() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('ai_tool_transactions')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const mappedLogs: AiCreditLog[] = (data || []).map(item => ({
          id: item.id,
          user_id: item.user_id,
          tool_name: item.tool_name || 'Unknown',
          credits_used: item.credits_used || 0,
          created_at: item.created_at,
          transaction_type: item.transaction_type || 'usage'
        }));

        setLogs(mappedLogs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, [userId]);

  return { logs, loading, error };
}
