
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiDebugLog {
  id: string;
  user_id: string | null;
  feature_name: string;
  request_payload: any;
  response_payload: any;
  debug_notes: string | null;
  created_at: string;
}

export const useAiDebugLogs = () => {
  const [logs, setLogs] = useState<AiDebugLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchDebugLogs = async (featureFilter?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_debug_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (featureFilter && featureFilter !== 'all') {
        query = query.eq('feature_name', featureFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching debug logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch debug logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    logs,
    loading,
    fetchDebugLogs,
  };
};
