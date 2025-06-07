
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiSentimentLog {
  id: string;
  user_id: string | null;
  feature: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  feedback: string | null;
  submitted_at: string;
}

export interface SentimentBreakdown {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}

export const useAiSentimentLogs = () => {
  const [logs, setLogs] = useState<AiSentimentLog[]>([]);
  const [breakdown, setBreakdown] = useState<SentimentBreakdown>({
    positive: 0,
    neutral: 0,
    negative: 0,
    total: 0
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSentimentLogs = async (featureFilter?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_sentiment_feedback_logs')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (featureFilter && featureFilter !== 'all') {
        query = query.eq('feature', featureFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      const sentimentLogs = data || [];
      setLogs(sentimentLogs);

      // Calculate breakdown
      const positive = sentimentLogs.filter(log => log.sentiment === 'positive').length;
      const neutral = sentimentLogs.filter(log => log.sentiment === 'neutral').length;
      const negative = sentimentLogs.filter(log => log.sentiment === 'negative').length;
      const total = sentimentLogs.length;

      setBreakdown({ positive, neutral, negative, total });
    } catch (error) {
      console.error('Error fetching sentiment logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch sentiment logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addSentimentFeedback = async (
    feature: string,
    sentiment: 'positive' | 'neutral' | 'negative',
    feedback: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_sentiment_feedback_logs')
        .insert({
          feature,
          sentiment,
          feedback,
          user_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      console.log('Sentiment feedback added successfully');
      fetchSentimentLogs();
      
      toast({
        title: "Success",
        description: "Sentiment feedback recorded",
      });
    } catch (error) {
      console.error('Error adding sentiment feedback:', error);
      toast({
        title: "Error",
        description: "Failed to record sentiment feedback",
        variant: "destructive",
      });
    }
  };

  return {
    logs,
    breakdown,
    loading,
    fetchSentimentLogs,
    addSentimentFeedback,
  };
};
