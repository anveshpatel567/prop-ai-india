
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiResponseQualityLog {
  id: string;
  user_id: string;
  feature_context: string;
  response_text: string;
  quality_score: number;
  critique: string | null;
  evaluated_at: string;
}

export const useAiResponseQualityLogs = () => {
  const [qualityLogs, setQualityLogs] = useState<AiResponseQualityLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUserQualityLogs = async (userId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_response_quality_logs')
        .select('*')
        .order('evaluated_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setQualityLogs(data || []);
    } catch (error) {
      console.error('Error fetching quality logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch quality logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logResponseQuality = async (
    userId: string,
    featureContext: string,
    responseText: string,
    qualityScore: number,
    critique?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_response_quality_logs')
        .insert({
          user_id: userId,
          feature_context: featureContext,
          response_text: responseText,
          quality_score: qualityScore,
          critique: critique || null
        });

      if (error) throw error;

      console.log('Response quality logged successfully');

      // Refresh quality logs
      fetchUserQualityLogs(userId);
    } catch (error) {
      console.error('Error logging response quality:', error);
      toast({
        title: "Error",
        description: "Failed to log response quality",
        variant: "destructive",
      });
    }
  };

  const getAverageQualityScore = (): number => {
    if (qualityLogs.length === 0) return 0;
    const total = qualityLogs.reduce((sum, log) => sum + log.quality_score, 0);
    return Number((total / qualityLogs.length).toFixed(2));
  };

  return {
    qualityLogs,
    loading,
    fetchUserQualityLogs,
    logResponseQuality,
    getAverageQualityScore,
  };
};
