
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiToolAttributionLog {
  id: string;
  tool_name: string;
  feature_area: string;
  invoked_by: string | null;
  context_info: string | null;
  invoked_at: string;
}

export const useAiToolAttribution = () => {
  const [logs, setLogs] = useState<AiToolAttributionLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAttributionLogs = async (featureFilter?: string, toolFilter?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_tool_attribution_logs')
        .select('*')
        .order('invoked_at', { ascending: false });

      if (featureFilter && featureFilter !== 'all') {
        query = query.eq('feature_area', featureFilter);
      }

      if (toolFilter && toolFilter !== 'all') {
        query = query.eq('tool_name', toolFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching attribution logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch attribution logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAttributionLog = async (
    toolName: string,
    featureArea: string,
    contextInfo: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_tool_attribution_logs')
        .insert({
          tool_name: toolName,
          feature_area: featureArea,
          context_info: contextInfo,
          invoked_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      console.log('Attribution log added successfully');
      fetchAttributionLogs();
    } catch (error) {
      console.error('Error adding attribution log:', error);
      toast({
        title: "Error",
        description: "Failed to add attribution log",
        variant: "destructive",
      });
    }
  };

  return {
    logs,
    loading,
    fetchAttributionLogs,
    addAttributionLog,
  };
};
