
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiPromptTuningLog {
  id: string;
  admin_id: string | null;
  ai_module: string;
  old_prompt: string;
  new_prompt: string;
  reason_for_change: string | null;
  tuned_at: string;
}

export const useAiPromptTuning = () => {
  const [tuningLogs, setTuningLogs] = useState<AiPromptTuningLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchPromptTuningLogs = async (aiModule?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_prompt_tuning_logs')
        .select('*')
        .order('tuned_at', { ascending: false });

      if (aiModule) {
        query = query.eq('ai_module', aiModule);
      }

      const { data, error } = await query;

      if (error) throw error;

      setTuningLogs(data || []);
    } catch (error) {
      console.error('Error fetching prompt tuning logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch prompt tuning logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logPromptTuning = async (
    adminId: string | null,
    aiModule: string,
    oldPrompt: string,
    newPrompt: string,
    reasonForChange?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_prompt_tuning_logs')
        .insert({
          admin_id: adminId,
          ai_module: aiModule,
          old_prompt: oldPrompt,
          new_prompt: newPrompt,
          reason_for_change: reasonForChange || null
        });

      if (error) throw error;

      console.log('Prompt tuning logged successfully');
      
      // Refresh tuning logs
      fetchPromptTuningLogs();
    } catch (error) {
      console.error('Error logging prompt tuning:', error);
      toast({
        title: "Error",
        description: "Failed to log prompt tuning",
        variant: "destructive",
      });
    }
  };

  const getLogsByModule = (aiModule: string): AiPromptTuningLog[] => {
    return tuningLogs.filter(log => log.ai_module === aiModule);
  };

  return {
    tuningLogs,
    loading,
    fetchPromptTuningLogs,
    logPromptTuning,
    getLogsByModule,
  };
};
