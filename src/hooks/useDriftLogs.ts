
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DriftLog {
  id: string;
  model_version: string;
  drift_score: number;
  detection_method: string | null;
  detected_at: string;
}

export function useDriftLogs() {
  const [logs, setLogs] = useState<DriftLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDriftLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_drift_detection_logs')
        .select('*')
        .order('detected_at', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching drift logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch drift logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logDriftDetection = async (model_version: string, drift_score: number, detection_method?: string) => {
    try {
      const { error } = await supabase.functions.invoke('logDriftDetection', {
        body: { model_version, drift_score, detection_method }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Drift detection logged successfully",
      });
      
      fetchDriftLogs();
    } catch (error) {
      console.error('Error logging drift detection:', error);
      toast({
        title: "Error",
        description: "Failed to log drift detection",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDriftLogs();
  }, []);

  return {
    logs,
    loading,
    fetchDriftLogs,
    logDriftDetection
  };
}
