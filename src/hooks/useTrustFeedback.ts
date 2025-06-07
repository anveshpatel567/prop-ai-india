
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TrustFeedback {
  id: string;
  user_id: string | null;
  feature_name: string;
  trust_rating: number;
  comment: string | null;
  submitted_at: string;
}

export interface TrustStats {
  feature_name: string;
  avg_rating: number;
  total_feedback: number;
  rating_distribution: {
    rating: number;
    count: number;
  }[];
}

export const useTrustFeedback = () => {
  const [feedback, setFeedback] = useState<TrustFeedback[]>([]);
  const [stats, setStats] = useState<TrustStats[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchTrustFeedback = async (featureFilter?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_trust_feedback')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (featureFilter && featureFilter !== 'all') {
        query = query.eq('feature_name', featureFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      const feedbackData = (data || []) as TrustFeedback[];
      setFeedback(feedbackData);

      // Calculate stats
      const featureGroups = feedbackData.reduce((acc, item) => {
        if (!acc[item.feature_name]) {
          acc[item.feature_name] = [];
        }
        acc[item.feature_name].push(item);
        return acc;
      }, {} as Record<string, TrustFeedback[]>);

      const calculatedStats: TrustStats[] = Object.entries(featureGroups).map(([feature, items]) => {
        const totalRating = items.reduce((sum, item) => sum + item.trust_rating, 0);
        const avgRating = totalRating / items.length;
        
        const distribution = [1, 2, 3, 4, 5].map(rating => ({
          rating,
          count: items.filter(item => item.trust_rating === rating).length
        }));

        return {
          feature_name: feature,
          avg_rating: Math.round(avgRating * 10) / 10,
          total_feedback: items.length,
          rating_distribution: distribution
        };
      }).sort((a, b) => a.avg_rating - b.avg_rating);

      setStats(calculatedStats);
    } catch (error) {
      console.error('Error fetching trust feedback:', error);
      toast({
        title: "Error",
        description: "Failed to fetch trust feedback",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    feedback,
    stats,
    loading,
    fetchTrustFeedback,
  };
};
