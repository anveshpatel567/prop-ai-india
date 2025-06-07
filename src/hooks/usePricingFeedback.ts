
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PricingFeedbackLog {
  id: string;
  lister_id: string;
  listing_id: string;
  ai_price_suggested: number | null;
  user_accepted: boolean | null;
  feedback_text: string | null;
  rejection_reason: string | null;
  created_at: string;
}

export const usePricingFeedback = () => {
  const [feedbackLogs, setFeedbackLogs] = useState<PricingFeedbackLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchListerFeedback = async (listerId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_pricing_feedback_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (listerId) {
        query = query.eq('lister_id', listerId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setFeedbackLogs(data || []);
    } catch (error) {
      console.error('Error fetching pricing feedback:', error);
      toast({
        title: "Error",
        description: "Failed to fetch pricing feedback",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async (
    listerId: string,
    listingId: string,
    aiPriceSuggested: number | null,
    userAccepted: boolean,
    feedbackText?: string,
    rejectionReason?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_pricing_feedback_logs')
        .insert({
          lister_id: listerId,
          listing_id: listingId,
          ai_price_suggested: aiPriceSuggested,
          user_accepted: userAccepted,
          feedback_text: feedbackText || null,
          rejection_reason: rejectionReason || null
        });

      if (error) throw error;

      console.log('Pricing feedback submitted successfully');
      
      // Refresh feedback logs
      fetchListerFeedback(listerId);
    } catch (error) {
      console.error('Error submitting pricing feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit pricing feedback",
        variant: "destructive",
      });
    }
  };

  const getAcceptedFeedback = (): PricingFeedbackLog[] => {
    return feedbackLogs.filter(log => log.user_accepted === true);
  };

  const getRejectedFeedback = (): PricingFeedbackLog[] => {
    return feedbackLogs.filter(log => log.user_accepted === false);
  };

  return {
    feedbackLogs,
    loading,
    fetchListerFeedback,
    submitFeedback,
    getAcceptedFeedback,
    getRejectedFeedback,
  };
};
