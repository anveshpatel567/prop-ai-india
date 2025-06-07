
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiSeekerBehaviorLog {
  id: string;
  seeker_id: string;
  behavior_type: string;
  behavior_data: Record<string, any>;
  inferred_preference: string | null;
  created_at: string;
}

export const useAiSeekerBehaviorLogs = () => {
  const [behaviorLogs, setBehaviorLogs] = useState<AiSeekerBehaviorLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSeekerBehaviorLogs = async (seekerId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_seeker_behavior_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (seekerId) {
        query = query.eq('seeker_id', seekerId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setBehaviorLogs(data || []);
    } catch (error) {
      console.error('Error fetching seeker behavior logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch behavior logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logBehavior = async (
    seekerId: string,
    behaviorType: string,
    behaviorData: Record<string, any>,
    inferredPreference?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_seeker_behavior_logs')
        .insert({
          seeker_id: seekerId,
          behavior_type: behaviorType,
          behavior_data: behaviorData,
          inferred_preference: inferredPreference || null
        });

      if (error) throw error;

      console.log('Seeker behavior logged successfully');

      // Refresh logs
      fetchSeekerBehaviorLogs(seekerId);
    } catch (error) {
      console.error('Error logging seeker behavior:', error);
      toast({
        title: "Error",
        description: "Failed to log behavior",
        variant: "destructive",
      });
    }
  };

  const getBehaviorsByType = (behaviorType: string): AiSeekerBehaviorLog[] => {
    return behaviorLogs.filter(log => log.behavior_type === behaviorType);
  };

  const getUniquePreferences = (): string[] => {
    const preferences = behaviorLogs
      .map(log => log.inferred_preference)
      .filter(pref => pref !== null) as string[];
    return [...new Set(preferences)];
  };

  return {
    behaviorLogs,
    loading,
    fetchSeekerBehaviorLogs,
    logBehavior,
    getBehaviorsByType,
    getUniquePreferences,
  };
};
