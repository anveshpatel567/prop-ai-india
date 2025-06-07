
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiResumeData {
  id: string;
  user_id: string;
  name: string;
  experience_years: number;
  city: string;
  specialization: string;
  past_projects: string;
  strengths: string;
  resume_markdown: string;
  created_at: string;
}

export interface CreateResumeInput {
  name: string;
  experience_years: number;
  city: string;
  specialization: string;
  past_projects: string;
  strengths: string;
}

export function useAiResume() {
  const [data, setData] = useState<AiResumeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateResume = async (input: CreateResumeInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: result, error: functionError } = await supabase.functions.invoke('generateAgentResume', {
        body: input
      });

      if (functionError) throw functionError;
      
      setData(result);
      toast({
        title: "Resume Generated",
        description: "Your AI-powered resume has been created successfully!",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate resume';
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

  const fetchUserResume = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: result, error } = await supabase
        .from('ai_resumes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch resume';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { 
    data, 
    loading, 
    error, 
    generateResume, 
    fetchUserResume 
  };
}
