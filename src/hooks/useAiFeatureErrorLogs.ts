
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiFeatureErrorLog {
  id: string;
  user_id: string;
  tool_name: string;
  error_message: string | null;
  stack_trace: string | null;
  context: string | null;
  created_at: string;
}

export const useAiFeatureErrorLogs = () => {
  const [errorLogs, setErrorLogs] = useState<AiFeatureErrorLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchErrorLogs = async (userId?: string, toolName?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_feature_error_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      if (toolName) {
        query = query.eq('tool_name', toolName);
      }

      const { data, error } = await query;

      if (error) throw error;

      setErrorLogs(data || []);
    } catch (error) {
      console.error('Error fetching error logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch error logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logError = async (
    userId: string,
    toolName: string,
    errorMessage?: string,
    stackTrace?: string,
    context?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_feature_error_logs')
        .insert({
          user_id: userId,
          tool_name: toolName,
          error_message: errorMessage || null,
          stack_trace: stackTrace || null,
          context: context || null
        });

      if (error) throw error;

      console.log('Error logged successfully');
      
      // Refresh error logs
      fetchErrorLogs();
    } catch (error) {
      console.error('Error logging error:', error);
      toast({
        title: "Error",
        description: "Failed to log error",
        variant: "destructive",
      });
    }
  };

  const getErrorsByTool = (toolName: string): AiFeatureErrorLog[] => {
    return errorLogs.filter(log => log.tool_name === toolName);
  };

  const getErrorRate = (toolName: string): number => {
    const toolErrors = getErrorsByTool(toolName);
    return toolErrors.length;
  };

  return {
    errorLogs,
    loading,
    fetchErrorLogs,
    logError,
    getErrorsByTool,
    getErrorRate,
  };
};
