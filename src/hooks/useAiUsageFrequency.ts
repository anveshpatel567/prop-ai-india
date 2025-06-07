
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiUsageFrequencyLog {
  id: string;
  user_id: string | null;
  feature: string;
  usage_count: number;
  logged_date: string;
}

export interface FeatureUsageStats {
  feature: string;
  total_usage: number;
  last_used: string;
}

export const useAiUsageFrequency = () => {
  const [logs, setLogs] = useState<AiUsageFrequencyLog[]>([]);
  const [topFeatures, setTopFeatures] = useState<FeatureUsageStats[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUsageFrequency = async () => {
    try {
      setLoading(true);
      
      // Fetch raw logs
      const { data: logsData, error: logsError } = await supabase
        .from('ai_usage_frequency_logs')
        .select('*')
        .order('logged_date', { ascending: false })
        .limit(100);

      if (logsError) throw logsError;

      setLogs(logsData || []);

      // Fetch aggregated feature stats
      const { data: statsData, error: statsError } = await supabase
        .from('ai_usage_frequency_logs')
        .select('feature, usage_count, logged_date')
        .order('usage_count', { ascending: false });

      if (statsError) throw statsError;

      // Group by feature and calculate totals
      const featureMap = new Map<string, { total: number; lastUsed: string }>();
      
      (statsData || []).forEach((log) => {
        const existing = featureMap.get(log.feature);
        if (existing) {
          existing.total += log.usage_count;
          if (log.logged_date > existing.lastUsed) {
            existing.lastUsed = log.logged_date;
          }
        } else {
          featureMap.set(log.feature, {
            total: log.usage_count,
            lastUsed: log.logged_date
          });
        }
      });

      const topFeaturesList: FeatureUsageStats[] = Array.from(featureMap.entries())
        .map(([feature, stats]) => ({
          feature,
          total_usage: stats.total,
          last_used: stats.lastUsed
        }))
        .sort((a, b) => b.total_usage - a.total_usage)
        .slice(0, 10);

      setTopFeatures(topFeaturesList);
    } catch (error) {
      console.error('Error fetching usage frequency:', error);
      toast({
        title: "Error",
        description: "Failed to fetch usage frequency data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logFeatureUsage = async (feature: string, usageCount: number = 1) => {
    try {
      const { error } = await supabase
        .from('ai_usage_frequency_logs')
        .insert({
          feature,
          usage_count: usageCount,
          user_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      console.log('Feature usage logged successfully');
    } catch (error) {
      console.error('Error logging feature usage:', error);
      toast({
        title: "Error",
        description: "Failed to log feature usage",
        variant: "destructive",
      });
    }
  };

  return {
    logs,
    topFeatures,
    loading,
    fetchUsageFrequency,
    logFeatureUsage,
  };
};
