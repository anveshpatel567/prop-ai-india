
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PromptDriftLog {
  id: string;
  feature: string;
  expected_behavior: string;
  observed_behavior: string;
  reported_by: string | null;
  drift_detected_at: string;
  resolved: boolean;
}

export const usePromptDriftLogs = () => {
  const [logs, setLogs] = useState<PromptDriftLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchDriftLogs = async (resolvedFilter?: boolean) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_prompt_drift_logs')
        .select('*')
        .order('drift_detected_at', { ascending: false });

      if (resolvedFilter !== undefined) {
        query = query.eq('resolved', resolvedFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      const logsData = (data || []) as PromptDriftLog[];
      setLogs(logsData);
    } catch (error) {
      console.error('Error fetching drift logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch prompt drift logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resolveLog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ai_prompt_drift_logs')
        .update({ resolved: true })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Drift issue marked as resolved",
      });
      
      fetchDriftLogs();
    } catch (error) {
      console.error('Error resolving drift log:', error);
      toast({
        title: "Error",
        description: "Failed to resolve drift log",
        variant: "destructive",
      });
    }
  };

  const addDriftLog = async (logData: Omit<PromptDriftLog, 'id' | 'drift_detected_at' | 'reported_by' | 'resolved'>) => {
    try {
      const { error } = await supabase
        .from('ai_prompt_drift_logs')
        .insert(logData);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Drift log reported successfully",
      });
      
      fetchDriftLogs();
    } catch (error) {
      console.error('Error adding drift log:', error);
      toast({
        title: "Error",
        description: "Failed to report drift",
        variant: "destructive",
      });
    }
  };

  return {
    logs,
    loading,
    fetchDriftLogs,
    resolveLog,
    addDriftLog,
  };
};
