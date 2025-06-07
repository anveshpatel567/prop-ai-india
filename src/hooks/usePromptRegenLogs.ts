
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PromptRegenLog {
  id: string;
  user_id: string;
  feature: string;
  regenerated_from_prompt: string | null;
  regenerated_at: string;
}

export const usePromptRegenLogs = () => {
  const [regenLogs, setRegenLogs] = useState<PromptRegenLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchRegenLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_prompt_regen_logs')
        .select('*')
        .order('regenerated_at', { ascending: false });

      if (error) throw error;

      setRegenLogs(data || []);
    } catch (error) {
      console.error('Error fetching prompt regen logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch prompt regeneration logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logPromptRegen = async (
    userId: string,
    feature: string,
    regeneratedFromPrompt?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_prompt_regen_logs')
        .insert({
          user_id: userId,
          feature: feature,
          regenerated_from_prompt: regeneratedFromPrompt || null
        });

      if (error) throw error;

      console.log('Prompt regeneration logged successfully');
      
      // Refresh logs
      fetchRegenLogs();
    } catch (error) {
      console.error('Error logging prompt regeneration:', error);
      toast({
        title: "Error",
        description: "Failed to log prompt regeneration",
        variant: "destructive",
      });
    }
  };

  const getTopRetriedFeatures = (): { feature: string; count: number }[] => {
    const featureMap = new Map<string, number>();
    
    regenLogs.forEach(log => {
      const current = featureMap.get(log.feature) || 0;
      featureMap.set(log.feature, current + 1);
    });

    return Array.from(featureMap.entries())
      .map(([feature, count]) => ({ feature, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const getRegensByFeature = (feature: string): PromptRegenLog[] => {
    return regenLogs.filter(log => log.feature === feature);
  };

  return {
    regenLogs,
    loading,
    fetchRegenLogs,
    logPromptRegen,
    getTopRetriedFeatures,
    getRegensByFeature,
  };
};
