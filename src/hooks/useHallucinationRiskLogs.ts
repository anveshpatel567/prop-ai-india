
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface HallucinationRiskLog {
  id: string;
  feature: string;
  input: string;
  output: string;
  risk_score: number;
  flagged: boolean;
  detected_at: string;
}

export function useHallucinationRiskLogs() {
  const [logs, setLogs] = useState<HallucinationRiskLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchHallucinationRiskLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_hallucination_risk_logs')
        .select('*')
        .order('detected_at', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching hallucination risk logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch hallucination risk logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logHallucinationRisk = async (feature: string, input: string, output: string, risk_score: number, flagged = false) => {
    try {
      const { error } = await supabase.functions.invoke('logHallucinationRisk', {
        body: { feature, input, output, risk_score, flagged }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Hallucination risk logged successfully",
      });
      
      fetchHallucinationRiskLogs();
    } catch (error) {
      console.error('Error logging hallucination risk:', error);
      toast({
        title: "Error",
        description: "Failed to log hallucination risk",
        variant: "destructive",
      });
    }
  };

  const toggleFlag = async (id: string, flagged: boolean) => {
    try {
      const { error } = await supabase
        .from('ai_hallucination_risk_logs')
        .update({ flagged })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Risk ${flagged ? 'flagged' : 'unflagged'} successfully`,
      });
      
      fetchHallucinationRiskLogs();
    } catch (error) {
      console.error('Error toggling flag:', error);
      toast({
        title: "Error",
        description: "Failed to toggle flag",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchHallucinationRiskLogs();
  }, []);

  return {
    logs,
    loading,
    fetchHallucinationRiskLogs,
    logHallucinationRisk,
    toggleFlag
  };
}
