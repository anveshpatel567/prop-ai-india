
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiPricingFeedbackLog {
  id: string;
  user_id: string;
  listing_id: string;
  previous_price: number | null;
  ai_suggested_price: number | null;
  user_feedback: string;
  notes: string | null;
  created_at: string;
}

export const useAiPricingFeedbackLogs = () => {
  const [feedbackLogs, setFeedbackLogs] = useState<AiPricingFeedbackLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUserFeedback = async (userId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_pricing_feedback_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setFeedbackLogs(data || []);
    } catch (error) {
      console.error('Error fetching pricing feedback logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch pricing feedback",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logPricingFeedback = async (
    userId: string,
    listingId: string,
    previousPrice: number | null,
    aiSuggestedPrice: number | null,
    userFeedback: string,
    notes?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_pricing_feedback_logs')
        .insert({
          user_id: userId,
          listing_id: listingId,
          previous_price: previousPrice,
          ai_suggested_price: aiSuggestedPrice,
          user_feedback: userFeedback,
          notes: notes || null
        });

      if (error) throw error;

      console.log('Pricing feedback logged successfully');
      
      // Refresh feedback logs
      fetchUserFeedback(userId);
    } catch (error) {
      console.error('Error logging pricing feedback:', error);
      toast({
        title: "Error",
        description: "Failed to log pricing feedback",
        variant: "destructive",
      });
    }
  };

  const getFeedbackByType = (feedbackType: string): AiPricingFeedbackLog[] => {
    return feedbackLogs.filter(log => log.user_feedback === feedbackType);
  };

  const getAveragePriceDifference = (): number => {
    const logsWithPrices = feedbackLogs.filter(log => 
      log.previous_price !== null && log.ai_suggested_price !== null
    );
    
    if (logsWithPrices.length === 0) return 0;
    
    const totalDifference = logsWithPrices.reduce((sum, log) => 
      sum + Math.abs((log.ai_suggested_price || 0) - (log.previous_price || 0)), 0
    );
    
    return Number((totalDifference / logsWithPrices.length).toFixed(2));
  };

  return {
    feedbackLogs,
    loading,
    fetchUserFeedback,
    logPricingFeedback,
    getFeedbackByType,
    getAveragePriceDifference,
  };
};
