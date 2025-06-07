
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MisuseFlag {
  id: string;
  user_id: string;
  tool_name: string;
  flag_type: 'overuse' | 'bot' | 'suspicious' | 'spam';
  flagged_by: string | null;
  flagged_at: string;
  notes: string | null;
  resolved: boolean;
  resolved_at: string | null;
  resolved_by: string | null;
}

export function useMisuseFlags() {
  const [flags, setFlags] = useState<MisuseFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFlags();
  }, []);

  const fetchFlags = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('ai_tool_misuse_flags')
        .select('*')
        .order('flagged_at', { ascending: false });

      if (error) throw error;

      setFlags(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch flags');
    } finally {
      setLoading(false);
    }
  };

  const resolveFlag = async (flagId: string, resolvedBy: string) => {
    try {
      const { error } = await supabase
        .from('ai_tool_misuse_flags')
        .update({
          resolved: true,
          resolved_at: new Date().toISOString(),
          resolved_by: resolvedBy
        })
        .eq('id', flagId);

      if (error) throw error;

      await fetchFlags(); // Refresh the data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resolve flag');
    }
  };

  const flagUser = async (flagData: Omit<MisuseFlag, 'id' | 'flagged_at' | 'resolved' | 'resolved_at' | 'resolved_by'>) => {
    try {
      const { error } = await supabase.functions.invoke('flagToolMisuse', {
        body: flagData
      });

      if (error) throw error;

      await fetchFlags(); // Refresh the data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to flag user');
    }
  };

  return {
    flags,
    loading,
    error,
    refetch: fetchFlags,
    resolveFlag,
    flagUser
  };
}
