
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LoanQueryResult {
  id: string;
  income_monthly: number;
  tenure_years: number;
  interest_rate: number;
  loan_amount: number;
  emi: number;
  suggestion: string;
  created_at: string;
}

export function useLoanOptimizer() {
  const [data, setData] = useState<LoanQueryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (
    income_monthly: number,
    tenure_years: number,
    interest_rate: number
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: result, error: functionError } = await supabase.functions.invoke('generateLoanSuggestion', {
        body: { income_monthly, tenure_years, interest_rate }
      });

      if (functionError) throw functionError;
      
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to optimize loan');
      console.error('Loan optimization error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, run };
}
