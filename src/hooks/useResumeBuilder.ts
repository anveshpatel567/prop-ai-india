
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type ResumeBuilderResult = {
  id: string;
  user_id: string;
  resume_text: string;
  created_at: string;
};

export function useResumeBuilder() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateResume = async (userId: string, details: string): Promise<ResumeBuilderResult | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-resume', {
        body: { userId, details },
      });
      
      if (error) {
        setError(error.message);
        return null;
      }
      
      return data as ResumeBuilderResult;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate resume');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateResume, loading, error };
}
