
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ModelVersionLog {
  id: string;
  feature_area: string;
  model_name: string;
  version: string;
  timestamp: string;
  notes: string | null;
}

export interface FeatureModelGroup {
  feature_area: string;
  logs: ModelVersionLog[];
  currentVersion: string;
}

export const useModelVersionLogs = () => {
  const [logs, setLogs] = useState<ModelVersionLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchModelVersionLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_model_version_logs')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;

      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching model version logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch model version logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logModelVersion = async (
    featureArea: string,
    modelName: string,
    version: string,
    notes?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_model_version_logs')
        .insert({
          feature_area: featureArea,
          model_name: modelName,
          version: version,
          notes: notes || null
        });

      if (error) throw error;

      console.log('Model version logged successfully');
      fetchModelVersionLogs();
    } catch (error) {
      console.error('Error logging model version:', error);
      toast({
        title: "Error",
        description: "Failed to log model version",
        variant: "destructive",
      });
    }
  };

  const getGroupedByFeature = (): FeatureModelGroup[] => {
    const grouped = logs.reduce((acc, log) => {
      if (!acc[log.feature_area]) {
        acc[log.feature_area] = [];
      }
      acc[log.feature_area].push(log);
      return acc;
    }, {} as Record<string, ModelVersionLog[]>);

    return Object.entries(grouped).map(([feature_area, logs]) => ({
      feature_area,
      logs: logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
      currentVersion: logs[0]?.version || 'Unknown'
    }));
  };

  const searchByFeature = (searchTerm: string): ModelVersionLog[] => {
    return logs.filter(log => 
      log.feature_area.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return {
    logs,
    loading,
    fetchModelVersionLogs,
    logModelVersion,
    getGroupedByFeature,
    searchByFeature,
  };
};
