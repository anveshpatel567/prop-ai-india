
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AgentBehaviorLog {
  id: string;
  agent_id: string;
  context: string;
  behavior_snapshot: string;
  logged_at: string;
}

export function useAgentBehaviorLogs() {
  const [logs, setLogs] = useState<AgentBehaviorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAgentBehaviorLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_agent_behavior_logs')
        .select('*')
        .order('logged_at', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching agent behavior logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch agent behavior logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logAgentBehavior = async (agent_id: string, context: string, behavior_snapshot: string) => {
    try {
      const { error } = await supabase.functions.invoke('logAgentBehavior', {
        body: { agent_id, context, behavior_snapshot }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Agent behavior logged successfully",
      });
      
      fetchAgentBehaviorLogs();
    } catch (error) {
      console.error('Error logging agent behavior:', error);
      toast({
        title: "Error",
        description: "Failed to log agent behavior",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAgentBehaviorLogs();
  }, []);

  return {
    logs,
    loading,
    fetchAgentBehaviorLogs,
    logAgentBehavior
  };
}
