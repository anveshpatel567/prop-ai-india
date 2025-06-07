
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { DeveloperAiSummary, AiToolUsageSummary } from '@/types/supabase/ai_usage_types';

export const useDeveloperAiSummary = () => {
  const [summary, setSummary] = useState<DeveloperAiSummary>({
    total_credits: 0,
    total_calls: 0,
    tool_breakdown: [],
    daily_trend: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all AI tool transactions
      const { data: transactions, error: transactionsError } = await supabase
        .from('ai_tool_transactions')
        .select('*')
        .eq('status', 'success')
        .order('created_at', { ascending: false });

      if (transactionsError) {
        throw transactionsError;
      }

      if (!transactions || transactions.length === 0) {
        setSummary({
          total_credits: 0,
          total_calls: 0,
          tool_breakdown: [],
          daily_trend: []
        });
        return;
      }

      // Calculate totals
      const totalCredits = transactions.reduce((sum, t) => sum + t.credit_cost, 0);
      const totalCalls = transactions.length;

      // Group by tool
      const toolMap: Record<string, AiToolUsageSummary> = {};
      transactions.forEach(t => {
        if (!toolMap[t.tool_name]) {
          toolMap[t.tool_name] = {
            tool: t.tool_name,
            credits_used: 0,
            call_count: 0
          };
        }
        toolMap[t.tool_name].credits_used += t.credit_cost;
        toolMap[t.tool_name].call_count += 1;
      });

      const toolBreakdown = Object.values(toolMap);

      // Calculate daily trend (last 7 days)
      const dailyMap: Record<string, number> = {};
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);

      transactions
        .filter(t => new Date(t.created_at) >= last7Days)
        .forEach(t => {
          const date = new Date(t.created_at).toISOString().split('T')[0];
          dailyMap[date] = (dailyMap[date] || 0) + 1;
        });

      const dailyTrend = Object.entries(dailyMap)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      setSummary({
        total_credits: totalCredits,
        total_calls: totalCalls,
        tool_breakdown: toolBreakdown,
        daily_trend: dailyTrend
      });

    } catch (err) {
      console.error('Error fetching AI summary:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch AI summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return {
    summary,
    loading,
    error,
    refetch: fetchSummary
  };
};
