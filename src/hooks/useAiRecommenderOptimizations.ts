
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiRecommenderOptimization {
  id: string;
  model_version: string;
  user_id: string | null;
  optimization_type: string;
  affected_feature: string;
  notes: string | null;
  applied_at: string;
}

export const useAiRecommenderOptimizations = () => {
  const [optimizations, setOptimizations] = useState<AiRecommenderOptimization[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchOptimizations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_recommender_optimizations')
        .select('*')
        .order('applied_at', { ascending: false });

      if (error) throw error;

      setOptimizations(data || []);
    } catch (error) {
      console.error('Error fetching recommender optimizations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch recommender optimizations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logOptimization = async (
    modelVersion: string,
    optimizationType: string,
    affectedFeature: string,
    notes?: string,
    userId?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_recommender_optimizations')
        .insert({
          model_version: modelVersion,
          optimization_type: optimizationType,
          affected_feature: affectedFeature,
          notes: notes || null,
          user_id: userId || null
        });

      if (error) throw error;

      toast({
        title: "Optimization Logged",
        description: `AI recommender optimization for ${affectedFeature} has been recorded`,
      });

      // Refresh optimizations
      fetchOptimizations();
    } catch (error) {
      console.error('Error logging optimization:', error);
      toast({
        title: "Error",
        description: "Failed to log optimization",
        variant: "destructive",
      });
    }
  };

  return {
    optimizations,
    loading,
    fetchOptimizations,
    logOptimization,
  };
};
