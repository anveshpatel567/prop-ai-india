
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BiasDetectionLog {
  id: string;
  prompt: string;
  result: string;
  bias_detected: boolean;
  notes: string | null;
  detected_at: string;
  detected_by: string | null;
}

export const useBiasLogs = () => {
  const [logs, setLogs] = useState<BiasDetectionLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchBiasLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_bias_detection_logs')
        .select('*')
        .order('detected_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      const logsData = (data || []) as BiasDetectionLog[];
      setLogs(logsData);
    } catch (error) {
      console.error('Error fetching bias logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch bias detection logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addBiasLog = async (logData: Omit<BiasDetectionLog, 'id' | 'detected_at' | 'detected_by'>) => {
    try {
      const { error } = await supabase
        .from('ai_bias_detection_logs')
        .insert(logData);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Bias log added successfully",
      });
      
      fetchBiasLogs();
    } catch (error) {
      console.error('Error adding bias log:', error);
      toast({
        title: "Error",
        description: "Failed to add bias log",
        variant: "destructive",
      });
    }
  };

  return {
    logs,
    loading,
    fetchBiasLogs,
    addBiasLog,
  };
};
