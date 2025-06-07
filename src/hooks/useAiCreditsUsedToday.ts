
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useAiCreditsUsedToday(toolName?: string) {
  const [creditsUsed, setCreditsUsed] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreditsUsed = async () => {
      setLoading(true);
      try {
        const today = new Date().toISOString().split('T')[0];
        
        let query = supabase
          .from('ai_tool_transactions')
          .select('tool_name, credits_used')
          .gte('created_at', `${today}T00:00:00.000Z`)
          .lt('created_at', `${today}T23:59:59.999Z`);

        if (toolName) {
          query = query.eq('tool_name', toolName);
        }

        const { data, error } = await query;

        if (error) throw error;

        const creditsByTool: Record<string, number> = {};
        data?.forEach(transaction => {
          const tool = transaction.tool_name || 'unknown';
          creditsByTool[tool] = (creditsByTool[tool] || 0) + (transaction.credits_used || 0);
        });

        setCreditsUsed(creditsByTool);
      } catch (error) {
        console.error('Error fetching credits used today:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditsUsed();
  }, [toolName]);

  return {
    creditsUsed,
    loading,
    getCreditsUsed: (tool: string) => creditsUsed[tool] || 0
  };
}
