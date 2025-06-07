
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiAutoresponseFeedback {
  id: string;
  user_id: string;
  message_id: string | null;
  was_helpful: boolean | null;
  feedback: string | null;
  created_at: string;
}

export const useAiAutoresponseFeedback = () => {
  const [feedbackLogs, setFeedbackLogs] = useState<AiAutoresponseFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAutoresponseFeedback = async (userId?: string, messageId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_autoresponse_feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      if (messageId) {
        query = query.eq('message_id', messageId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setFeedbackLogs(data || []);
    } catch (error) {
      console.error('Error fetching autoresponse feedback:', error);
      toast({
        title: "Error",
        description: "Failed to fetch autoresponse feedback",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async (
    userId: string,
    wasHelpful: boolean,
    messageId?: string,
    feedback?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_autoresponse_feedback')
        .insert({
          user_id: userId,
          message_id: messageId || null,
          was_helpful: wasHelpful,
          feedback: feedback || null
        });

      if (error) throw error;

      console.log('Autoresponse feedback submitted successfully');
      
      // Refresh feedback logs
      fetchAutoresponseFeedback();
    } catch (error) {
      console.error('Error submitting autoresponse feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive",
      });
    }
  };

  const getHelpfulnessRate = (): number => {
    if (feedbackLogs.length === 0) return 0;
    
    const helpfulFeedback = feedbackLogs.filter(log => log.was_helpful === true);
    return (helpfulFeedback.length / feedbackLogs.length) * 100;
  };

  return {
    feedbackLogs,
    loading,
    fetchAutoresponseFeedback,
    submitFeedback,
    getHelpfulnessRate,
  };
};
