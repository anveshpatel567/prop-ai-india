
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CreditLimit {
  id: string;
  tool_name: string;
  max_daily_credits: number;
  enforced: boolean;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export function useCreditLimits() {
  const [limits, setLimits] = useState<CreditLimit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLimits = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_tool_credit_limits')
        .select('*')
        .order('tool_name');

      if (error) throw error;
      setLimits(data || []);
    } catch (error) {
      console.error('Error fetching credit limits:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLimits();
  }, []);

  const updateLimit = async (toolName: string, maxDailyCredits: number, enforced: boolean) => {
    try {
      const { error } = await supabase.functions.invoke('updateCreditLimits', {
        body: { toolName, maxDailyCredits, enforced }
      });

      if (error) throw error;
      await fetchLimits();
    } catch (error) {
      console.error('Error updating credit limit:', error);
      throw error;
    }
  };

  return {
    limits,
    loading,
    updateLimit,
    fetchLimits
  };
}
