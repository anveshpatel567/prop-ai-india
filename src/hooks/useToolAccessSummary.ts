
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ToolAccessSummary {
  tool_name: string;
  total_attempts: number;
  allowed_attempts: number;
  blocked_attempts: number;
  unique_users: number;
  success_rate: number;
}

export function useToolAccessSummary() {
  const [summary, setSummary] = useState<ToolAccessSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('ai_tool_attempt_logs')
        .select('tool_name, was_allowed, user_id');

      if (error) throw error;

      // Group and calculate summary statistics
      const grouped = data?.reduce((acc, log) => {
        const toolName = log.tool_name;
        
        if (!acc[toolName]) {
          acc[toolName] = {
            tool_name: toolName,
            total_attempts: 0,
            allowed_attempts: 0,
            blocked_attempts: 0,
            unique_users: new Set(),
            success_rate: 0
          };
        }

        acc[toolName].total_attempts++;
        acc[toolName].unique_users.add(log.user_id);
        
        if (log.was_allowed) {
          acc[toolName].allowed_attempts++;
        } else {
          acc[toolName].blocked_attempts++;
        }

        return acc;
      }, {} as Record<string, any>) || {};

      // Convert to array and calculate success rates
      const summaryArray = Object.values(grouped).map((item: any) => ({
        ...item,
        unique_users: item.unique_users.size,
        success_rate: item.total_attempts > 0 
          ? Math.round((item.allowed_attempts / item.total_attempts) * 100)
          : 0
      }));

      setSummary(summaryArray);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch summary');
    } finally {
      setLoading(false);
    }
  };

  return {
    summary,
    loading,
    error,
    refetch: fetchSummary
  };
}
