
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PersonalizationFeedback {
  id: string;
  user_id: string;
  feature_name: string;
  feedback_type: string;
  feedback_notes: string | null;
  created_at: string;
}

export const usePersonalizationFeedback = () => {
  const [feedback, setFeedback] = useState<PersonalizationFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchFeedback = async (userId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_personalization_feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setFeedback(data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast({
        title: "Error",
        description: "Failed to fetch feedback",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async (
    userId: string,
    featureName: string,
    feedbackType: 'positive' | 'negative' | 'neutral',
    notes?: string
  ) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('ai_personalization_feedback')
        .insert({
          user_id: userId,
          feature_name: featureName,
          feedback_type: feedbackType,
          feedback_notes: notes || null
        });

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted",
      });

      // Refresh feedback
      fetchFeedback(userId);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    feedback,
    loading,
    fetchFeedback,
    submitFeedback,
  };
};
