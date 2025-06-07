
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface LatencyIncident {
  id: string;
  feature_name: string;
  user_id: string;
  duration_ms: number;
  triggered_at: string;
  created_at: string;
}

export const useLatencyIncidents = () => {
  const [incidents, setIncidents] = useState<LatencyIncident[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_latency_incident_logs')
        .select('*')
        .order('triggered_at', { ascending: false });

      if (error) throw error;

      setIncidents(data || []);
    } catch (error) {
      console.error('Error fetching latency incidents:', error);
      toast({
        title: "Error",
        description: "Failed to fetch latency incidents",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logLatencyIncident = async (
    featureName: string,
    userId: string,
    durationMs: number,
    triggeredAt: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_latency_incident_logs')
        .insert({
          feature_name: featureName,
          user_id: userId,
          duration_ms: durationMs,
          triggered_at: triggeredAt
        });

      if (error) throw error;

      console.log('Latency incident logged successfully');
      
      // Refresh incidents
      fetchIncidents();
    } catch (error) {
      console.error('Error logging latency incident:', error);
      toast({
        title: "Error",
        description: "Failed to log latency incident",
        variant: "destructive",
      });
    }
  };

  const getSlowIncidents = (): LatencyIncident[] => {
    return incidents.filter(incident => incident.duration_ms > 5000);
  };

  const getIncidentsByFeature = (feature: string): LatencyIncident[] => {
    return incidents.filter(incident => incident.feature_name === feature);
  };

  const getTopSlowFeatures = (): { feature: string; avgDuration: number; count: number }[] => {
    const featureMap = new Map<string, { totalDuration: number; count: number }>();
    
    incidents.forEach(incident => {
      const existing = featureMap.get(incident.feature_name);
      if (existing) {
        existing.totalDuration += incident.duration_ms;
        existing.count += 1;
      } else {
        featureMap.set(incident.feature_name, {
          totalDuration: incident.duration_ms,
          count: 1
        });
      }
    });

    return Array.from(featureMap.entries())
      .map(([feature, data]) => ({
        feature,
        avgDuration: Math.round(data.totalDuration / data.count),
        count: data.count
      }))
      .sort((a, b) => b.avgDuration - a.avgDuration)
      .slice(0, 5);
  };

  return {
    incidents,
    loading,
    fetchIncidents,
    logLatencyIncident,
    getSlowIncidents,
    getIncidentsByFeature,
    getTopSlowFeatures,
  };
};
