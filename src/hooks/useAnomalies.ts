
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AnomalyLog {
  id: string;
  anomaly_type: string;
  metadata: string | null;
  severity: 'low' | 'medium' | 'high' | null;
  detected_at: string;
}

export function useAnomalies() {
  const [anomalies, setAnomalies] = useState<AnomalyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAnomalies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_anomaly_detection_logs')
        .select('*')
        .order('detected_at', { ascending: false });

      if (error) throw error;
      setAnomalies(data || []);
    } catch (error) {
      console.error('Error fetching anomaly logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch anomaly logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logAnomaly = async (anomaly_type: string, metadata?: string, severity?: 'low' | 'medium' | 'high') => {
    try {
      const { error } = await supabase.functions.invoke('logAnomaly', {
        body: { anomaly_type, metadata, severity }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Anomaly logged successfully",
      });
      
      fetchAnomalies();
    } catch (error) {
      console.error('Error logging anomaly:', error);
      toast({
        title: "Error",
        description: "Failed to log anomaly",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAnomalies();
  }, []);

  return {
    anomalies,
    loading,
    fetchAnomalies,
    logAnomaly
  };
}
