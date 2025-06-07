
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FlaggedPrompt {
  id: string;
  prompt: string;
  reason: string;
  severity: 'low' | 'moderate' | 'high';
  flagged_at: string;
}

export const useFlaggedPrompts = () => {
  const [flaggedPrompts, setFlaggedPrompts] = useState<FlaggedPrompt[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchFlaggedPrompts = async (severityFilter?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_flagged_prompt_logs')
        .select('*')
        .order('flagged_at', { ascending: false })
        .limit(100);

      if (severityFilter && severityFilter !== 'all') {
        query = query.eq('severity', severityFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      const typedData = (data || []) as FlaggedPrompt[];
      setFlaggedPrompts(typedData);
    } catch (error) {
      console.error('Error fetching flagged prompts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch flagged prompts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logFlaggedPrompt = async (prompt: Omit<FlaggedPrompt, 'id' | 'flagged_at'>) => {
    try {
      const { data, error } = await supabase.functions.invoke('logFlaggedPrompt', {
        body: prompt
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Flagged prompt logged successfully",
      });
      
      fetchFlaggedPrompts();
    } catch (error) {
      console.error('Error logging flagged prompt:', error);
      toast({
        title: "Error",
        description: "Failed to log flagged prompt",
        variant: "destructive",
      });
    }
  };

  return {
    flaggedPrompts,
    loading,
    fetchFlaggedPrompts,
    logFlaggedPrompt,
  };
};
