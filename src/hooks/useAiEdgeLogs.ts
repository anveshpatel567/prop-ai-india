
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiEdgeInvocationLog {
  id: string;
  user_id: string | null;
  edge_function: string;
  invocation_time: string;
  status_code: number | null;
  response_time_ms: number | null;
  created_at: string;
}

export const useAiEdgeLogs = () => {
  const [edgeLogs, setEdgeLogs] = useState<AiEdgeInvocationLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchEdgeLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_edge_invocation_logs')
        .select('*')
        .order('invocation_time', { ascending: false });

      if (error) throw error;

      setEdgeLogs(data || []);
    } catch (error) {
      console.error('Error fetching edge logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch edge invocation logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logEdgeInvocation = async (
    userId: string | null,
    edgeFunction: string,
    statusCode?: number,
    responseTimeMs?: number
  ) => {
    try {
      const { error } = await supabase
        .from('ai_edge_invocation_logs')
        .insert({
          user_id: userId,
          edge_function: edgeFunction,
          status_code: statusCode || null,
          response_time_ms: responseTimeMs || null
        });

      if (error) throw error;

      console.log('Edge invocation logged successfully');
      
      // Refresh logs
      fetchEdgeLogs();
    } catch (error) {
      console.error('Error logging edge invocation:', error);
      toast({
        title: "Error",
        description: "Failed to log edge invocation",
        variant: "destructive",
      });
    }
  };

  const getLogsByFunction = (functionName: string): AiEdgeInvocationLog[] => {
    return edgeLogs.filter(log => log.edge_function === functionName);
  };

  const getAverageResponseTime = (functionName?: string): number => {
    const logs = functionName ? getLogsByFunction(functionName) : edgeLogs;
    const validLogs = logs.filter(log => log.response_time_ms !== null);
    
    if (validLogs.length === 0) return 0;
    
    const total = validLogs.reduce((sum, log) => sum + (log.response_time_ms || 0), 0);
    return Math.round(total / validLogs.length);
  };

  return {
    edgeLogs,
    loading,
    fetchEdgeLogs,
    logEdgeInvocation,
    getLogsByFunction,
    getAverageResponseTime,
  };
};
