
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface LocalityReport {
  id: string;
  user_id: string;
  locality: string;
  city: string;
  report_markdown: string;
  created_at: string;
}

export function useLocalityReports() {
  const { user } = useAuth();
  const [reports, setReports] = useState<LocalityReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchReports();
    }
  }, [user?.id]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_locality_reports')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (locality: string, city: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('generateLocalityReport', {
        body: { locality, city }
      });

      if (error) throw error;
      await fetchReports();
      return data.report;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate report');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    reports,
    loading,
    error,
    generateReport,
    refetch: fetchReports
  };
}
