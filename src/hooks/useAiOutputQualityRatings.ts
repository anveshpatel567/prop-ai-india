
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiOutputQualityRating {
  id: string;
  user_id: string;
  feature_name: string;
  rating: number;
  comments: string | null;
  rated_at: string;
}

export const useAiOutputQualityRatings = () => {
  const [qualityRatings, setQualityRatings] = useState<AiOutputQualityRating[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchQualityRatings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_output_quality_ratings')
        .select('*')
        .order('rated_at', { ascending: false });

      if (error) throw error;

      setQualityRatings(data || []);
    } catch (error) {
      console.error('Error fetching quality ratings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch quality ratings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitQualityRating = async (
    userId: string,
    featureName: string,
    rating: number,
    comments?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_output_quality_ratings')
        .insert({
          user_id: userId,
          feature_name: featureName,
          rating: rating,
          comments: comments || null
        });

      if (error) throw error;

      console.log('Quality rating submitted successfully');
      
      // Refresh ratings
      fetchQualityRatings();
    } catch (error) {
      console.error('Error submitting quality rating:', error);
      toast({
        title: "Error",
        description: "Failed to submit quality rating",
        variant: "destructive",
      });
    }
  };

  const getRatingsByFeature = (featureName: string): AiOutputQualityRating[] => {
    return qualityRatings.filter(rating => rating.feature_name === featureName);
  };

  const getAverageRating = (featureName?: string): number => {
    const ratings = featureName 
      ? qualityRatings.filter(rating => rating.feature_name === featureName)
      : qualityRatings;
    
    if (ratings.length === 0) return 0;
    
    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return Number((total / ratings.length).toFixed(2));
  };

  return {
    qualityRatings,
    loading,
    fetchQualityRatings,
    submitQualityRating,
    getRatingsByFeature,
    getAverageRating,
  };
};
