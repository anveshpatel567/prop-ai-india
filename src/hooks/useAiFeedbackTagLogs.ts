
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiFeedbackTagLog {
  id: string;
  user_id: string;
  feature_used: string;
  tag: string;
  context_snippet: string | null;
  submitted_at: string;
}

export const useAiFeedbackTagLogs = () => {
  const [feedbackLogs, setFeedbackLogs] = useState<AiFeedbackTagLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchFeedbackLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_feedback_tag_logs')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;

      setFeedbackLogs(data || []);
    } catch (error) {
      console.error('Error fetching feedback tag logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch feedback tag logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitFeedbackTag = async (
    userId: string,
    featureUsed: string,
    tag: string,
    contextSnippet?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_feedback_tag_logs')
        .insert({
          user_id: userId,
          feature_used: featureUsed,
          tag: tag,
          context_snippet: contextSnippet || null
        });

      if (error) throw error;

      console.log('Feedback tag submitted successfully');
      
      // Refresh logs
      fetchFeedbackLogs();
    } catch (error) {
      console.error('Error submitting feedback tag:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback tag",
        variant: "destructive",
      });
    }
  };

  const getFeedbackByFeature = (feature: string): AiFeedbackTagLog[] => {
    return feedbackLogs.filter(log => log.feature_used === feature);
  };

  const getFeedbackByTag = (tag: string): AiFeedbackTagLog[] => {
    return feedbackLogs.filter(log => log.tag === tag);
  };

  return {
    feedbackLogs,
    loading,
    fetchFeedbackLogs,
    submitFeedbackTag,
    getFeedbackByFeature,
    getFeedbackByTag,
  };
};
