
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface MyToolAttempt {
  id: string;
  tool_name: string;
  attempted_at: string;
  was_allowed: boolean;
  reason: string | null;
  credits_required: number | null;
  user_credits: number | null;
}

export function useMyToolAttempts(limit = 50) {
  const { user } = useAuth();
  const [attempts, setAttempts] = useState<MyToolAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchMyAttempts();
    }
  }, [user?.id, limit]);

  const fetchMyAttempts = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('ai_tool_attempt_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('attempted_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      setAttempts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch your attempts');
    } finally {
      setLoading(false);
    }
  };

  return {
    attempts,
    loading,
    error,
    refetch: fetchMyAttempts
  };
}
