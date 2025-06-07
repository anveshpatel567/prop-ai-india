
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiInfluenceLog {
  id: string;
  user_id: string;
  feature_name: string;
  influencing_factors: string[];
  influence_weights: number[];
  output_summary: string;
  recorded_at: string;
}

export interface TopInfluenceFactor {
  factor: string;
  weight: number;
}

export const useAiInfluenceLogs = () => {
  const [logs, setLogs] = useState<AiInfluenceLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchInfluenceLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_output_influence_logs')
        .select('*')
        .order('recorded_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching influence logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch influence logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logInfluence = async (
    userId: string,
    featureName: string,
    factors: string[],
    weights: number[],
    outputSummary: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_output_influence_logs')
        .insert({
          user_id: userId,
          feature_name: featureName,
          influencing_factors: factors,
          influence_weights: weights,
          output_summary: outputSummary
        });

      if (error) throw error;

      console.log('Influence log recorded successfully');
      fetchInfluenceLogs();
    } catch (error) {
      console.error('Error logging influence:', error);
      toast({
        title: "Error",
        description: "Failed to log influence",
        variant: "destructive",
      });
    }
  };

  const getTopFactors = (log: AiInfluenceLog): TopInfluenceFactor[] => {
    const factorWeightPairs = log.influencing_factors.map((factor, index) => ({
      factor,
      weight: log.influence_weights[index] || 0
    }));

    return factorWeightPairs
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 3);
  };

  return {
    logs,
    loading,
    fetchInfluenceLogs,
    logInfluence,
    getTopFactors,
  };
};
