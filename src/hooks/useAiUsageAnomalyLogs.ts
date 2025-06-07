
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiUsageAnomalyLog {
  id: string;
  user_id: string;
  module: string;
  usage_count: number;
  anomaly_type: string;
  observed_at: string;
  created_at: string;
}

export const useAiUsageAnomalyLogs = () => {
  const [anomalyLogs, setAnomalyLogs] = useState<AiUsageAnomalyLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAnomalyLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_usage_anomaly_logs')
        .select('*')
        .order('observed_at', { ascending: false });

      if (error) throw error;

      setAnomalyLogs(data || []);
    } catch (error) {
      console.error('Error fetching usage anomaly logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch usage anomaly logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logUsageAnomaly = async (
    userId: string,
    module: string,
    usageCount: number,
    anomalyType: string,
    observedAt: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_usage_anomaly_logs')
        .insert({
          user_id: userId,
          module: module,
          usage_count: usageCount,
          anomaly_type: anomalyType,
          observed_at: observedAt
        });

      if (error) throw error;

      console.log('Usage anomaly logged successfully');
      
      // Refresh logs
      fetchAnomalyLogs();
    } catch (error) {
      console.error('Error logging usage anomaly:', error);
      toast({
        title: "Error",
        description: "Failed to log usage anomaly",
        variant: "destructive",
      });
    }
  };

  const getAnomaliesByType = (anomalyType: string): AiUsageAnomalyLog[] => {
    return anomalyLogs.filter(log => log.anomaly_type === anomalyType);
  };

  const getAnomaliesByModule = (module: string): AiUsageAnomalyLog[] => {
    return anomalyLogs.filter(log => log.module === module);
  };

  return {
    anomalyLogs,
    loading,
    fetchAnomalyLogs,
    logUsageAnomaly,
    getAnomaliesByType,
    getAnomaliesByModule,
  };
};
