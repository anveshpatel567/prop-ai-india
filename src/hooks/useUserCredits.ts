
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type UserCredits = {
  balance: number;
  total_used: number;
};

export function useUserCredits(userId: string) {
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    Promise.all([
      supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', userId)
        .single(),
      supabase
        .from('ai_tool_transactions')
        .select('credits_used')
        .eq('user_id', userId)
    ]).then(([walletRes, transactionsRes]) => {
      if (walletRes.error && transactionsRes.error) {
        setError('Failed to fetch credit information');
        setCredits(null);
      } else {
        const balance = walletRes.data?.balance || 0;
        const totalUsed = (transactionsRes.data || [])
          .reduce((sum, t) => sum + (t.credits_used || 0), 0);
        
        setCredits({ balance, total_used: totalUsed });
      }
      setLoading(false);
    });
  }, [userId]);

  return { credits, loading, error };
}
