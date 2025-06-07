
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ModelFreezeLog {
  id: string;
  model_version: string;
  reason: string;
  frozen_by: string | null;
  frozen_at: string;
}

export function useModelFreezeLogs() {
  const [logs, setLogs] = useState<ModelFreezeLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchModelFreezeLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_model_freeze_logs')
        .select('*')
        .order('frozen_at', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching model freeze logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch model freeze logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const freezeModel = async (model_version: string, reason: string) => {
    try {
      const { error } = await supabase.functions.invoke('freezeModel', {
        body: { model_version, reason }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Model freeze logged successfully",
      });
      
      fetchModelFreezeLogs();
    } catch (error) {
      console.error('Error freezing model:', error);
      toast({
        title: "Error",
        description: "Failed to freeze model",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchModelFreezeLogs();
  }, []);

  return {
    logs,
    loading,
    fetchModelFreezeLogs,
    freezeModel
  };
}
