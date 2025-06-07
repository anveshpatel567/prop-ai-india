
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface LocalityReportData {
  id: string;
  user_id: string;
  locality: string;
  city: string;
  report_markdown: string;
  created_at: string;
}

export interface LocalityReportInput {
  locality: string;
  city: string;
}

export function useLocalityReport() {
  const [data, setData] = useState<LocalityReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateReport = async (input: LocalityReportInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: result, error: functionError } = await supabase.functions.invoke('generateLocalityReport', {
        body: input
      });

      if (functionError) throw functionError;
      
      setData(result);
      toast({
        title: "Locality Report Generated",
        description: "Your locality report has been created successfully!",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate locality report';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReports = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: result, error } = await supabase
        .from('ai_locality_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch reports';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { 
    data, 
    loading, 
    error, 
    generateReport, 
    fetchUserReports 
  };
}
