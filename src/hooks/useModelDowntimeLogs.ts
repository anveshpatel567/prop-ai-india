
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ModelDowntimeLog {
  id: string;
  model_name: string;
  downtime_reason: string | null;
  started_at: string;
  resolved_at: string | null;
  created_by: string | null;
}

export const useModelDowntimeLogs = () => {
  const [logs, setLogs] = useState<ModelDowntimeLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchDowntimeLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_model_downtime_logs')
        .select('*')
        .order('started_at', { ascending: false });

      if (error) throw error;

      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching downtime logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch downtime logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addDowntimeLog = async (
    modelName: string,
    reason: string,
    startedAt: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_model_downtime_logs')
        .insert({
          model_name: modelName,
          downtime_reason: reason,
          started_at: startedAt,
          created_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      console.log('Downtime log added successfully');
      fetchDowntimeLogs();
      
      toast({
        title: "Success",
        description: "Downtime log added successfully",
      });
    } catch (error) {
      console.error('Error adding downtime log:', error);
      toast({
        title: "Error",
        description: "Failed to add downtime log",
        variant: "destructive",
      });
    }
  };

  const resolveDowntime = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ai_model_downtime_logs')
        .update({
          resolved_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      console.log('Downtime resolved successfully');
      fetchDowntimeLogs();
      
      toast({
        title: "Success",
        description: "Downtime resolved",
      });
    } catch (error) {
      console.error('Error resolving downtime:', error);
      toast({
        title: "Error",
        description: "Failed to resolve downtime",
        variant: "destructive",
      });
    }
  };

  return {
    logs,
    loading,
    fetchDowntimeLogs,
    addDowntimeLog,
    resolveDowntime,
  };
};
