
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiDeactivationLog {
  id: string;
  tool_name: string;
  deactivated_by: string | null;
  reason: string | null;
  deactivated_at: string;
}

export const useAiDeactivationLogs = () => {
  const [deactivationLogs, setDeactivationLogs] = useState<AiDeactivationLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchDeactivationLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_deactivation_logs')
        .select('*')
        .order('deactivated_at', { ascending: false });

      if (error) throw error;

      setDeactivationLogs(data || []);
    } catch (error) {
      console.error('Error fetching deactivation logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch deactivation logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logDeactivation = async (
    toolName: string,
    deactivatedBy: string,
    reason?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_deactivation_logs')
        .insert({
          tool_name: toolName,
          deactivated_by: deactivatedBy,
          reason: reason || null
        });

      if (error) throw error;

      console.log('Deactivation logged successfully');
      
      // Refresh logs
      fetchDeactivationLogs();
    } catch (error) {
      console.error('Error logging deactivation:', error);
      toast({
        title: "Error",
        description: "Failed to log deactivation",
        variant: "destructive",
      });
    }
  };

  const getLogsByTool = (toolName: string): AiDeactivationLog[] => {
    return deactivationLogs.filter(log => log.tool_name === toolName);
  };

  const getRecentDeactivations = (hours: number = 24): AiDeactivationLog[] => {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return deactivationLogs.filter(log => new Date(log.deactivated_at) > cutoff);
  };

  return {
    deactivationLogs,
    loading,
    fetchDeactivationLogs,
    logDeactivation,
    getLogsByTool,
    getRecentDeactivations,
  };
};
