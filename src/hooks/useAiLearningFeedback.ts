
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiLearningFeedback {
  id: string;
  user_id: string;
  module_name: string;
  question: string | null;
  answer: string | null;
  helpful: boolean | null;
  submitted_at: string;
  created_at: string;
}

export const useAiLearningFeedback = () => {
  const [learningFeedback, setLearningFeedback] = useState<AiLearningFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchLearningFeedback = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_learning_feedback')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;

      setLearningFeedback(data || []);
    } catch (error) {
      console.error('Error fetching learning feedback:', error);
      toast({
        title: "Error",
        description: "Failed to fetch learning feedback",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async (
    userId: string,
    moduleName: string,
    question?: string,
    answer?: string,
    helpful?: boolean
  ) => {
    try {
      const { error } = await supabase
        .from('ai_learning_feedback')
        .insert({
          user_id: userId,
          module_name: moduleName,
          question: question || null,
          answer: answer || null,
          helpful: helpful || null
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Feedback submitted successfully",
      });
      
      // Refresh feedback
      fetchLearningFeedback();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive",
      });
    }
  };

  const getFeedbackByModule = (moduleName: string): AiLearningFeedback[] => {
    return learningFeedback.filter(feedback => feedback.module_name === moduleName);
  };

  const getHelpfulnessRate = (moduleName?: string): number => {
    const feedback = moduleName ? getFeedbackByModule(moduleName) : learningFeedback;
    const validFeedback = feedback.filter(f => f.helpful !== null);
    
    if (validFeedback.length === 0) return 0;
    
    const helpfulCount = validFeedback.filter(f => f.helpful === true).length;
    return Math.round((helpfulCount / validFeedback.length) * 100);
  };

  return {
    learningFeedback,
    loading,
    fetchLearningFeedback,
    submitFeedback,
    getFeedbackByModule,
    getHelpfulnessRate,
  };
};
