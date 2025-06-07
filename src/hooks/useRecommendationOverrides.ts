
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface RecommendationOverrideLog {
  id: string;
  user_id: string;
  feature_area: string;
  original_ai_suggestion: string;
  final_user_input: string;
  override_reason: string | null;
  created_at: string;
}

export const useRecommendationOverrides = () => {
  const [overrideLogs, setOverrideLogs] = useState<RecommendationOverrideLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUserOverrides = async (userId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_recommendation_override_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setOverrideLogs(data || []);
    } catch (error) {
      console.error('Error fetching recommendation overrides:', error);
      toast({
        title: "Error",
        description: "Failed to fetch recommendation overrides",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logOverride = async (
    userId: string,
    featureArea: string,
    originalSuggestion: string,
    finalInput: string,
    overrideReason?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_recommendation_override_logs')
        .insert({
          user_id: userId,
          feature_area: featureArea,
          original_ai_suggestion: originalSuggestion,
          final_user_input: finalInput,
          override_reason: overrideReason || null
        });

      if (error) throw error;

      console.log('Recommendation override logged successfully');
      
      // Refresh overrides
      fetchUserOverrides(userId);
    } catch (error) {
      console.error('Error logging recommendation override:', error);
      toast({
        title: "Error",
        description: "Failed to log recommendation override",
        variant: "destructive",
      });
    }
  };

  const getOverridesByFeature = (featureArea: string): RecommendationOverrideLog[] => {
    return overrideLogs.filter(log => log.feature_area === featureArea);
  };

  return {
    overrideLogs,
    loading,
    fetchUserOverrides,
    logOverride,
    getOverridesByFeature,
  };
};
