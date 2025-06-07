
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiReviewQueueItem {
  id: string;
  feature_name: string;
  issue_description: string;
  severity: 'low' | 'medium' | 'high';
  user_id: string;
  submitted_at: string;
  reviewed: boolean;
  review_notes: string | null;
}

export const useAiReviewQueue = () => {
  const [items, setItems] = useState<AiReviewQueueItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchReviewQueue = async (severityFilter?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_feature_review_queue')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (severityFilter && severityFilter !== 'all') {
        query = query.eq('severity', severityFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setItems(data || []);
    } catch (error) {
      console.error('Error fetching review queue:', error);
      toast({
        title: "Error",
        description: "Failed to fetch review queue",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateReviewStatus = async (id: string, reviewed: boolean, reviewNotes?: string) => {
    try {
      const { error } = await supabase
        .from('ai_feature_review_queue')
        .update({
          reviewed,
          review_notes: reviewNotes || null
        })
        .eq('id', id);

      if (error) throw error;

      console.log('Review status updated successfully');
      fetchReviewQueue();
      
      toast({
        title: "Success",
        description: "Review status updated",
      });
    } catch (error) {
      console.error('Error updating review status:', error);
      toast({
        title: "Error",
        description: "Failed to update review status",
        variant: "destructive",
      });
    }
  };

  const submitReview = async (
    featureName: string,
    issueDescription: string,
    severity: 'low' | 'medium' | 'high',
    userId: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_feature_review_queue')
        .insert({
          feature_name: featureName,
          issue_description: issueDescription,
          severity,
          user_id: userId
        });

      if (error) throw error;

      console.log('Review submitted successfully');
      fetchReviewQueue();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      });
    }
  };

  return {
    items,
    loading,
    fetchReviewQueue,
    updateReviewStatus,
    submitReview,
  };
};
