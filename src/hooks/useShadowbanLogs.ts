
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ShadowbanLog {
  id: string;
  user_id: string | null;
  reason: string;
  shadowban_start: string;
  shadowban_end: string | null;
  banned_by: string | null;
}

export function useShadowbanLogs() {
  const [logs, setLogs] = useState<ShadowbanLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchShadowbanLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_user_shadowban_logs')
        .select('*')
        .order('shadowban_start', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching shadowban logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch shadowban logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const shadowbanUser = async (user_id: string, reason: string, shadowban_end?: string) => {
    try {
      const { error } = await supabase.functions.invoke('shadowbanUser', {
        body: { user_id, reason, shadowban_end }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "User shadowbanned successfully",
      });
      
      fetchShadowbanLogs();
    } catch (error) {
      console.error('Error shadowbanning user:', error);
      toast({
        title: "Error",
        description: "Failed to shadowban user",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchShadowbanLogs();
  }, []);

  return {
    logs,
    loading,
    fetchShadowbanLogs,
    shadowbanUser
  };
}
