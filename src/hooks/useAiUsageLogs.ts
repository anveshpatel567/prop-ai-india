
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type AiUsageLog = {
  id: string;
  user_id: string;
  tool_name: string;
  credits_used: number;
  created_at: string;
};

export function useAiUsageLogs() {
  const [logs, setLogs] = useState<AiUsageLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('ai_tool_transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setLogs([]);
        } else {
          const mapped = (data || []).map(item => ({
            id: item.id,
            user_id: item.user_id || '',
            tool_name: item.tool_name || '',
            credits_used: item.credits_used || 0,
            created_at: item.created_at || new Date().toISOString()
          }));
          setLogs(mapped);
        }
        setLoading(false);
      });
  }, []);

  return { logs, loading, error };
}
