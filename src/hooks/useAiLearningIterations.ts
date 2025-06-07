
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiLearningIteration {
  id: string;
  model_name: string;
  domain: string;
  improvement_summary: string | null;
  triggered_by: string | null;
  created_at: string;
}

export const useAiLearningIterations = () => {
  const [iterations, setIterations] = useState<AiLearningIteration[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchIterations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_learning_iterations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setIterations(data || []);
    } catch (error) {
      console.error('Error fetching learning iterations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch learning iterations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logLearningIteration = async (
    modelName: string,
    domain: string,
    improvementSummary?: string,
    triggeredBy?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_learning_iterations')
        .insert({
          model_name: modelName,
          domain: domain,
          improvement_summary: improvementSummary || null,
          triggered_by: triggeredBy || null
        });

      if (error) throw error;

      toast({
        title: "Learning Iteration Logged",
        description: `AI learning iteration for ${domain} has been recorded`,
      });

      // Refresh iterations
      fetchIterations();
    } catch (error) {
      console.error('Error logging learning iteration:', error);
      toast({
        title: "Error",
        description: "Failed to log learning iteration",
        variant: "destructive",
      });
    }
  };

  return {
    iterations,
    loading,
    fetchIterations,
    logLearningIteration,
  };
};
