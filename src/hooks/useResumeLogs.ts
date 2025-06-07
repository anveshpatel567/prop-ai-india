
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface ResumeLog {
  id: string;
  user_id: string;
  resume_type: string;
  downloaded_at: string;
}

export function useResumeLogs() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<ResumeLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchLogs();
    }
  }, [user?.id]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('resume_download_logs')
        .select('*')
        .eq('user_id', user?.id)
        .order('downloaded_at', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resume logs');
    } finally {
      setLoading(false);
    }
  };

  const logDownload = async (resume_type: string) => {
    try {
      const { error } = await supabase
        .from('resume_download_logs')
        .insert({
          user_id: user?.id,
          resume_type
        });

      if (error) throw error;
      await fetchLogs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log download');
    }
  };

  return {
    logs,
    loading,
    error,
    logDownload,
    refetch: fetchLogs
  };
}
