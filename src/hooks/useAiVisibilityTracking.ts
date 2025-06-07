
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiVisibilityTrackingLog {
  id: string;
  user_id: string;
  ai_feature: string;
  viewed_at: string;
  interaction_taken: boolean;
}

export const useAiVisibilityTracking = () => {
  const [visibilityLogs, setVisibilityLogs] = useState<AiVisibilityTrackingLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchVisibilityLogs = async (userId?: string, aiFeature?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_visibility_tracking_logs')
        .select('*')
        .order('viewed_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      if (aiFeature) {
        query = query.eq('ai_feature', aiFeature);
      }

      const { data, error } = await query;

      if (error) throw error;

      setVisibilityLogs(data || []);
    } catch (error) {
      console.error('Error fetching visibility logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch visibility tracking logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const trackVisibility = async (
    userId: string,
    aiFeature: string,
    interactionTaken: boolean = false
  ) => {
    try {
      const { error } = await supabase
        .from('ai_visibility_tracking_logs')
        .insert({
          user_id: userId,
          ai_feature: aiFeature,
          interaction_taken: interactionTaken
        });

      if (error) throw error;

      console.log('AI visibility tracked successfully');
      
      // Refresh visibility logs
      fetchVisibilityLogs();
    } catch (error) {
      console.error('Error tracking AI visibility:', error);
      toast({
        title: "Error",
        description: "Failed to track AI visibility",
        variant: "destructive",
      });
    }
  };

  const getLogsByFeature = (aiFeature: string): AiVisibilityTrackingLog[] => {
    return visibilityLogs.filter(log => log.ai_feature === aiFeature);
  };

  const getInteractionRate = (aiFeature: string): number => {
    const featureLogs = getLogsByFeature(aiFeature);
    if (featureLogs.length === 0) return 0;
    
    const interactedLogs = featureLogs.filter(log => log.interaction_taken);
    return (interactedLogs.length / featureLogs.length) * 100;
  };

  return {
    visibilityLogs,
    loading,
    fetchVisibilityLogs,
    trackVisibility,
    getLogsByFeature,
    getInteractionRate,
  };
};
