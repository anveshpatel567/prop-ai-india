
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AiToolError } from '@/types/supabase/ai_usage_types';

export const useAiToolErrorLogs = () => {
  const [errors, setErrors] = useState<AiToolError[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchErrorLogs = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch failed transactions as error logs
      const { data: failedTransactions, error: fetchError } = await supabase
        .from('ai_tool_transactions')
        .select('id, tool_name, error_message, created_at, user_id')
        .eq('status', 'failed')
        .not('error_message', 'is', null)
        .order('created_at', { ascending: false })
        .limit(5);

      if (fetchError) {
        throw fetchError;
      }

      const errorLogs: AiToolError[] = (failedTransactions || []).map(t => ({
        id: t.id,
        tool_name: t.tool_name,
        error_message: t.error_message || 'Unknown error',
        created_at: t.created_at,
        user_id: t.user_id || 'Unknown'
      }));

      setErrors(errorLogs);

    } catch (err) {
      console.error('Error fetching AI error logs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch error logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchErrorLogs();
  }, []);

  return {
    errors,
    loading,
    error,
    refetch: fetchErrorLogs
  };
};
