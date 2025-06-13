
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type ToolAccess = {
  tool_name: string;
  is_enabled: boolean;
  has_credits: boolean;
};

export function useToolAccess(userId: string, toolName: string) {
  const [access, setAccess] = useState<ToolAccess | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !toolName) {
      setLoading(false);
      return;
    }

    Promise.all([
      supabase
        .from('ai_tool_flags')
        .select('is_enabled')
        .eq('tool_name', toolName)
        .single(),
      supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', userId)
        .single()
    ]).then(([flagRes, walletRes]) => {
      if (flagRes.error || walletRes.error) {
        setError('Failed to check tool access');
        setAccess(null);
      } else {
        setAccess({
          tool_name: toolName,
          is_enabled: flagRes.data?.is_enabled || false,
          has_credits: (walletRes.data?.balance || 0) > 0
        });
      }
      setLoading(false);
    });
  }, [userId, toolName]);

  return { access, loading, error };
}
