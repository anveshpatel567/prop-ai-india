
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RestrictedInput {
  id: string;
  input_text: string;
  restriction_reason: string;
  rejected_at: string;
}

export function useRestrictedInputs() {
  const [logs, setLogs] = useState<RestrictedInput[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRestrictedInputs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_restricted_input_logs')
        .select('*')
        .order('rejected_at', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching restricted inputs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch restricted inputs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logRestrictedInput = async (input_text: string, restriction_reason: string) => {
    try {
      const { error } = await supabase.functions.invoke('logRestrictedInput', {
        body: { input_text, restriction_reason }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Restricted input logged successfully",
      });
      
      fetchRestrictedInputs();
    } catch (error) {
      console.error('Error logging restricted input:', error);
      toast({
        title: "Error",
        description: "Failed to log restricted input",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchRestrictedInputs();
  }, []);

  return {
    logs,
    loading,
    fetchRestrictedInputs,
    logRestrictedInput
  };
}
