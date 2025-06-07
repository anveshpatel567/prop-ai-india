
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiAbuseLog {
  id: string;
  user_id: string;
  abuse_type: string;
  detail: string | null;
  detected_at: string;
}

export const useAiAbuseLogs = () => {
  const [abuseLogs, setAbuseLogs] = useState<AiAbuseLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAbuseLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_abuse_watch_logs')
        .select('*')
        .order('detected_at', { ascending: false });

      if (error) throw error;

      setAbuseLogs(data || []);
    } catch (error) {
      console.error('Error fetching abuse logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch abuse logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logAbuseDetection = async (
    userId: string,
    abuseType: string,
    detail?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_abuse_watch_logs')
        .insert({
          user_id: userId,
          abuse_type: abuseType,
          detail: detail || null
        });

      if (error) throw error;

      console.log('Abuse detection logged successfully');
      
      // Refresh logs
      fetchAbuseLogs();
    } catch (error) {
      console.error('Error logging abuse detection:', error);
      toast({
        title: "Error",
        description: "Failed to log abuse detection",
        variant: "destructive",
      });
    }
  };

  const getAbuseByType = (abuseType: string): AiAbuseLog[] => {
    return abuseLogs.filter(log => log.abuse_type === abuseType);
  };

  const getAbuseCount = (userId?: string): number => {
    if (userId) {
      return abuseLogs.filter(log => log.user_id === userId).length;
    }
    return abuseLogs.length;
  };

  return {
    abuseLogs,
    loading,
    fetchAbuseLogs,
    logAbuseDetection,
    getAbuseByType,
    getAbuseCount,
  };
};
