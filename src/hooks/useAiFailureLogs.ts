
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiFailureLog {
  id: string;
  feature: string;
  error_type: string;
  error_message: string | null;
  failed_at: string;
  user_id: string | null;
  retry_attempted: boolean;
}

export const useAiFailureLogs = () => {
  const [failureLogs, setFailureLogs] = useState<AiFailureLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchFailureLogs = async (errorTypeFilter?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_failure_logs')
        .select('*')
        .order('failed_at', { ascending: false })
        .limit(100);

      if (errorTypeFilter && errorTypeFilter !== 'all') {
        query = query.eq('error_type', errorTypeFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      const typedData = (data || []) as AiFailureLog[];
      setFailureLogs(typedData);
    } catch (error) {
      console.error('Error fetching failure logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch AI failure logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markRetryAttempted = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ai_failure_logs')
        .update({ retry_attempted: true })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Retry status updated successfully",
      });
      
      fetchFailureLogs();
    } catch (error) {
      console.error('Error updating retry status:', error);
      toast({
        title: "Error",
        description: "Failed to update retry status",
        variant: "destructive",
      });
    }
  };

  return {
    failureLogs,
    loading,
    fetchFailureLogs,
    markRetryAttempted,
  };
};
