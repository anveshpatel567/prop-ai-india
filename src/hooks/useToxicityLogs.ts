
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ToxicityLog {
  id: string;
  prompt: string;
  toxicity_score: number;
  flagged: boolean;
  detected_at: string;
}

export function useToxicityLogs() {
  const [logs, setLogs] = useState<ToxicityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchToxicityLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_toxicity_detection_logs')
        .select('*')
        .order('detected_at', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching toxicity logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch toxicity logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logToxicityDetection = async (prompt: string, toxicity_score: number, flagged = false) => {
    try {
      const { error } = await supabase.functions.invoke('logToxicityDetection', {
        body: { prompt, toxicity_score, flagged }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Toxicity detection logged successfully",
      });
      
      fetchToxicityLogs();
    } catch (error) {
      console.error('Error logging toxicity detection:', error);
      toast({
        title: "Error",
        description: "Failed to log toxicity detection",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchToxicityLogs();
  }, []);

  return {
    logs,
    loading,
    fetchToxicityLogs,
    logToxicityDetection
  };
}
