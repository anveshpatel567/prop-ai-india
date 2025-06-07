
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiFeatureAdoptionLog {
  id: string;
  user_id: string;
  feature_name: string;
  adoption_status: 'enabled' | 'ignored' | 'delayed';
  reason: string | null;
  adopted_at: string;
}

export const useAiFeatureAdoptionLogs = () => {
  const [adoptionLogs, setAdoptionLogs] = useState<AiFeatureAdoptionLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAdoptionLogs = async (userId?: string, featureName?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_feature_adoption_logs')
        .select('*')
        .order('adopted_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      if (featureName) {
        query = query.eq('feature_name', featureName);
      }

      const { data, error } = await query;

      if (error) throw error;

      setAdoptionLogs(data || []);
    } catch (error) {
      console.error('Error fetching adoption logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch feature adoption logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logFeatureAdoption = async (
    userId: string,
    featureName: string,
    adoptionStatus: 'enabled' | 'ignored' | 'delayed',
    reason?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_feature_adoption_logs')
        .insert({
          user_id: userId,
          feature_name: featureName,
          adoption_status: adoptionStatus,
          reason: reason || null
        });

      if (error) throw error;

      console.log('Feature adoption logged successfully');
      
      // Refresh adoption logs
      fetchAdoptionLogs();
    } catch (error) {
      console.error('Error logging feature adoption:', error);
      toast({
        title: "Error",
        description: "Failed to log feature adoption",
        variant: "destructive",
      });
    }
  };

  const getAdoptionByFeature = (featureName: string): AiFeatureAdoptionLog[] => {
    return adoptionLogs.filter(log => log.feature_name === featureName);
  };

  const getAdoptionRate = (featureName: string): number => {
    const featureLogs = getAdoptionByFeature(featureName);
    if (featureLogs.length === 0) return 0;
    
    const enabledLogs = featureLogs.filter(log => log.adoption_status === 'enabled');
    return (enabledLogs.length / featureLogs.length) * 100;
  };

  return {
    adoptionLogs,
    loading,
    fetchAdoptionLogs,
    logFeatureAdoption,
    getAdoptionByFeature,
    getAdoptionRate,
  };
};
