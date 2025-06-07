
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ToolAttemptLog {
  id: string;
  user_id: string;
  tool_name: string;
  attempted_at: string;
  was_allowed: boolean;
  reason: string | null;
  credits_required: number | null;
  user_credits: number | null;
}

interface UseToolAttemptLogsParams {
  toolName?: string;
  wasAllowed?: boolean;
  userId?: string;
  limit?: number;
}

export function useToolAttemptLogs(params: UseToolAttemptLogsParams = {}) {
  const [logs, setLogs] = useState<ToolAttemptLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLogs();
  }, [params.toolName, params.wasAllowed, params.userId, params.limit]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('ai_tool_attempt_logs')
        .select('*')
        .order('attempted_at', { ascending: false });

      if (params.toolName) {
        query = query.eq('tool_name', params.toolName);
      }

      if (params.wasAllowed !== undefined) {
        query = query.eq('was_allowed', params.wasAllowed);
      }

      if (params.userId) {
        query = query.eq('user_id', params.userId);
      }

      if (params.limit) {
        query = query.limit(params.limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      setLogs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  };

  return {
    logs,
    loading,
    error,
    refetch: fetchLogs
  };
}
