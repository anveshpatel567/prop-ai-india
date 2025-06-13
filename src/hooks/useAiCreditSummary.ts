
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type AiCreditSummary = {
  total_credits_used: number;
  total_transactions: number;
  most_used_tool: string;
};

export function useAiCreditSummary() {
  const [summary, setSummary] = useState<AiCreditSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('ai_tool_transactions')
      .select('tool_name, credits_used')
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setSummary(null);
        } else {
          const transactions = data || [];
          const totalCredits = transactions.reduce((sum, t) => sum + (t.credits_used || 0), 0);
          const toolCounts: Record<string, number> = {};
          
          transactions.forEach(t => {
            const tool = t.tool_name || 'unknown';
            toolCounts[tool] = (toolCounts[tool] || 0) + 1;
          });
          
          const mostUsedTool = Object.entries(toolCounts)
            .sort(([,a], [,b]) => b - a)[0]?.[0] || 'none';

          setSummary({
            total_credits_used: totalCredits,
            total_transactions: transactions.length,
            most_used_tool: mostUsedTool
          });
        }
        setLoading(false);
      });
  }, []);

  return { summary, loading, error };
}
