
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiHealthSnapshot {
  id: string;
  model_name: string;
  avg_latency_ms: number | null;
  active_users: number | null;
  error_rate: number | null;
  captured_at: string;
}

export interface HealthSummary {
  model_name: string;
  latest_latency: number;
  latest_users: number;
  latest_error_rate: number;
  status: 'healthy' | 'warning' | 'critical';
}

export const useAiHealth = () => {
  const [snapshots, setSnapshots] = useState<AiHealthSnapshot[]>([]);
  const [summary, setSummary] = useState<HealthSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchHealthData = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('ai_health_snapshots')
        .select('*')
        .order('captured_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const healthData = data || [];
      setSnapshots(healthData);

      // Calculate summary for each model
      const modelGroups = healthData.reduce((acc, snapshot) => {
        if (!acc[snapshot.model_name]) {
          acc[snapshot.model_name] = [];
        }
        acc[snapshot.model_name].push(snapshot);
        return acc;
      }, {} as Record<string, AiHealthSnapshot[]>);

      const healthSummary: HealthSummary[] = Object.entries(modelGroups).map(([modelName, snapshots]) => {
        const latest = snapshots[0];
        const latency = latest.avg_latency_ms || 0;
        const users = latest.active_users || 0;
        const errorRate = Number(latest.error_rate || 0);

        let status: 'healthy' | 'warning' | 'critical' = 'healthy';
        if (latency > 2000 || errorRate > 0.1) {
          status = 'critical';
        } else if (latency > 1000 || errorRate > 0.05) {
          status = 'warning';
        }

        return {
          model_name: modelName,
          latest_latency: latency,
          latest_users: users,
          latest_error_rate: errorRate,
          status
        };
      });

      setSummary(healthSummary);
    } catch (error) {
      console.error('Error fetching health data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch AI health data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    snapshots,
    summary,
    loading,
    fetchHealthData,
  };
};
