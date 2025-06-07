
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiRecommendationOverride {
  id: string;
  user_id: string;
  override_reason: string;
  override_data: Record<string, any>;
  triggered_by: string;
  created_at: string;
}

export const useAiRecommendationOverrides = () => {
  const [overrides, setOverrides] = useState<AiRecommendationOverride[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUserOverrides = async (userId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_recommendation_overrides')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setOverrides(data || []);
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
    overrideReason: string,
    overrideData: Record<string, any>,
    triggeredBy: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_recommendation_overrides')
        .insert({
          user_id: userId,
          override_reason: overrideReason,
          override_data: overrideData,
          triggered_by: triggeredBy
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

  const getOverridesByTrigger = (triggeredBy: string): AiRecommendationOverride[] => {
    return overrides.filter(override => override.triggered_by === triggeredBy);
  };

  return {
    overrides,
    loading,
    fetchUserOverrides,
    logOverride,
    getOverridesByTrigger,
  };
};
