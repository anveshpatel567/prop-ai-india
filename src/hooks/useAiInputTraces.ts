
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiInputTrace {
  id: string;
  user_id: string;
  feature_area: string;
  input_data: Record<string, any>;
  trace_level: 'info' | 'warning' | 'error';
  logged_at: string;
}

export const useAiInputTraces = () => {
  const [traces, setTraces] = useState<AiInputTrace[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchTraces = async (traceLevel?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_input_trace_logs')
        .select('*')
        .order('logged_at', { ascending: false })
        .limit(100);

      if (traceLevel && traceLevel !== 'all') {
        query = query.eq('trace_level', traceLevel);
      }

      const { data, error } = await query;

      if (error) throw error;

      setTraces(data || []);
    } catch (error) {
      console.error('Error fetching input traces:', error);
      toast({
        title: "Error",
        description: "Failed to fetch input traces",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logInputTrace = async (
    userId: string,
    featureArea: string,
    inputData: Record<string, any>,
    traceLevel: 'info' | 'warning' | 'error'
  ) => {
    try {
      const { error } = await supabase
        .from('ai_input_trace_logs')
        .insert({
          user_id: userId,
          feature_area: featureArea,
          input_data: inputData,
          trace_level: traceLevel
        });

      if (error) throw error;

      console.log('Input trace logged successfully');
      fetchTraces();
    } catch (error) {
      console.error('Error logging input trace:', error);
      toast({
        title: "Error",
        description: "Failed to log input trace",
        variant: "destructive",
      });
    }
  };

  const getTracesByLevel = (level: string): AiInputTrace[] => {
    return traces.filter(trace => trace.trace_level === level);
  };

  return {
    traces,
    loading,
    fetchTraces,
    logInputTrace,
    getTracesByLevel,
  };
};
