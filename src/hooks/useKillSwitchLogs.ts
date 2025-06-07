
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface KillSwitchLog {
  id: string;
  triggered_by: string | null;
  module: string;
  reason: string;
  triggered_at: string;
}

export function useKillSwitchLogs() {
  const [logs, setLogs] = useState<KillSwitchLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchKillSwitchLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_kill_switch_logs')
        .select('*')
        .order('triggered_at', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching kill switch logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch kill switch logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const triggerKillSwitch = async (module: string, reason: string) => {
    try {
      const { error } = await supabase.functions.invoke('triggerKillSwitch', {
        body: { module, reason }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Kill switch triggered successfully",
      });
      
      fetchKillSwitchLogs();
    } catch (error) {
      console.error('Error triggering kill switch:', error);
      toast({
        title: "Error",
        description: "Failed to trigger kill switch",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchKillSwitchLogs();
  }, []);

  return {
    logs,
    loading,
    fetchKillSwitchLogs,
    triggerKillSwitch
  };
}
