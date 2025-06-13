
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type DeveloperAiStat = {
  user_id: string;
  email: string;
  total_credits_used: number;
  total_transactions: number;
};

export function useDeveloperAiStats() {
  const [stats, setStats] = useState<DeveloperAiStat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      supabase.from('ai_tool_transactions').select('user_id, credits_used'),
      supabase.from('users').select('id, email')
    ]).then(([transactionsRes, usersRes]) => {
      if (transactionsRes.error || usersRes.error) {
        setError('Failed to fetch developer stats');
        setStats([]);
      } else {
        const transactions = transactionsRes.data || [];
        const users = usersRes.data || [];
        
        const userStats: Record<string, { credits: number; count: number }> = {};
        
        transactions.forEach(t => {
          const userId = t.user_id || '';
          if (!userStats[userId]) {
            userStats[userId] = { credits: 0, count: 0 };
          }
          userStats[userId].credits += t.credits_used || 0;
          userStats[userId].count += 1;
        });
        
        const result = Object.entries(userStats).map(([userId, data]) => {
          const user = users.find(u => u.id === userId);
          return {
            user_id: userId,
            email: user?.email || 'Unknown',
            total_credits_used: data.credits,
            total_transactions: data.count
          };
        }).sort((a, b) => b.total_credits_used - a.total_credits_used);
        
        setStats(result);
      }
      setLoading(false);
    });
  }, []);

  return { stats, loading, error };
}
