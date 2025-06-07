
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AdminDecisionLog {
  id: string;
  module: string;
  action: string;
  decision: string;
  decided_by: string | null;
  decided_at: string;
}

export const useAdminDecisionLogs = () => {
  const [decisionLogs, setDecisionLogs] = useState<AdminDecisionLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchDecisionLogs = async (moduleFilter?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_admin_decision_logs')
        .select('*')
        .order('decided_at', { ascending: false })
        .limit(100);

      if (moduleFilter && moduleFilter !== 'all') {
        query = query.eq('module', moduleFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      const typedData = (data || []) as AdminDecisionLog[];
      setDecisionLogs(typedData);
    } catch (error) {
      console.error('Error fetching admin decision logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch admin decision logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logDecision = async (decision: Omit<AdminDecisionLog, 'id' | 'decided_at' | 'decided_by'>) => {
    try {
      const { data, error } = await supabase.functions.invoke('logAdminDecision', {
        body: decision
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin decision logged successfully",
      });
      
      fetchDecisionLogs();
    } catch (error) {
      console.error('Error logging admin decision:', error);
      toast({
        title: "Error",
        description: "Failed to log admin decision",
        variant: "destructive",
      });
    }
  };

  return {
    decisionLogs,
    loading,
    fetchDecisionLogs,
    logDecision,
  };
};
