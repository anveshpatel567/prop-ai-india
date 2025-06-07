
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiPerformanceEvaluation {
  id: string;
  evaluated_by: string | null;
  ai_module: string;
  evaluation_context: string | null;
  quality_score: number;
  feedback: string | null;
  evaluated_at: string;
}

export const useAiPerformanceEvaluations = () => {
  const [evaluations, setEvaluations] = useState<AiPerformanceEvaluation[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchPerformanceEvaluations = async (aiModule?: string, evaluatedBy?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_performance_evaluations')
        .select('*')
        .order('evaluated_at', { ascending: false });

      if (aiModule) {
        query = query.eq('ai_module', aiModule);
      }

      if (evaluatedBy) {
        query = query.eq('evaluated_by', evaluatedBy);
      }

      const { data, error } = await query;

      if (error) throw error;

      setEvaluations(data || []);
    } catch (error) {
      console.error('Error fetching performance evaluations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch performance evaluations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitEvaluation = async (
    evaluatedBy: string | null,
    aiModule: string,
    qualityScore: number,
    evaluationContext?: string,
    feedback?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_performance_evaluations')
        .insert({
          evaluated_by: evaluatedBy,
          ai_module: aiModule,
          evaluation_context: evaluationContext || null,
          quality_score: qualityScore,
          feedback: feedback || null
        });

      if (error) throw error;

      console.log('Performance evaluation submitted successfully');
      
      // Refresh evaluations
      fetchPerformanceEvaluations();
    } catch (error) {
      console.error('Error submitting performance evaluation:', error);
      toast({
        title: "Error",
        description: "Failed to submit performance evaluation",
        variant: "destructive",
      });
    }
  };

  const getEvaluationsByModule = (aiModule: string): AiPerformanceEvaluation[] => {
    return evaluations.filter(evaluation => evaluation.ai_module === aiModule);
  };

  const getAverageScore = (aiModule?: string): number => {
    const targetEvaluations = aiModule ? getEvaluationsByModule(aiModule) : evaluations;
    if (targetEvaluations.length === 0) return 0;
    
    const totalScore = targetEvaluations.reduce((sum, evaluation) => sum + evaluation.quality_score, 0);
    return totalScore / targetEvaluations.length;
  };

  return {
    evaluations,
    loading,
    fetchPerformanceEvaluations,
    submitEvaluation,
    getEvaluationsByModule,
    getAverageScore,
  };
};
