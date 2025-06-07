
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface MyToolSummary {
  tools_tried: number;
  most_used_tool: string | null;
  credits_consumed: number;
  total_attempts: number;
  successful_attempts: number;
  blocked_attempts: number;
  total_credits_used: number;
  tools_used: number;
  last_used_days_ago: number;
}

export function useMyToolSummary() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<MyToolSummary>({
    tools_tried: 0,
    most_used_tool: null,
    credits_consumed: 0,
    total_attempts: 0,
    successful_attempts: 0,
    blocked_attempts: 0,
    total_credits_used: 0,
    tools_used: 0,
    last_used_days_ago: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchMySummary();
    }
  }, [user?.id]);

  const fetchMySummary = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('ai_tool_attempt_logs')
        .select('tool_name, was_allowed, credits_required, attempted_at')
        .eq('user_id', user.id);

      if (error) throw error;

      if (!data || data.length === 0) {
        setLoading(false);
        return;
      }

      // Calculate summary statistics
      const toolCounts = data.reduce((acc, log) => {
        acc[log.tool_name] = (acc[log.tool_name] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const mostUsedTool = Object.entries(toolCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || null;

      const creditsConsumed = data
        .filter(log => log.was_allowed && log.credits_required)
        .reduce((sum, log) => sum + (log.credits_required || 0), 0);

      const successfulAttempts = data.filter(log => log.was_allowed).length;
      const blockedAttempts = data.filter(log => !log.was_allowed).length;

      // Calculate days since last use
      const lastAttempt = data.reduce((latest, log) => {
        const attemptDate = new Date(log.attempted_at);
        return attemptDate > latest ? attemptDate : latest;
      }, new Date(0));
      
      const daysSinceLastUse = Math.floor(
        (Date.now() - lastAttempt.getTime()) / (1000 * 60 * 60 * 24)
      );

      setSummary({
        tools_tried: Object.keys(toolCounts).length,
        most_used_tool: mostUsedTool,
        credits_consumed: creditsConsumed,
        total_attempts: data.length,
        successful_attempts: successfulAttempts,
        blocked_attempts: blockedAttempts,
        total_credits_used: creditsConsumed, // Alias for backward compatibility
        tools_used: Object.keys(toolCounts).length, // Alias for backward compatibility
        last_used_days_ago: daysSinceLastUse
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch your summary');
    } finally {
      setLoading(false);
    }
  };

  return {
    summary,
    loading,
    error,
    refetch: fetchMySummary
  };
}
