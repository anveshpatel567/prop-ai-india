
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type AiResumeLog = {
  id: string;
  user_id: string;
  resume_text: string;
  created_at: string;
};

export function useAiResumeLogs(userId: string) {
  const [resumes, setResumes] = useState<AiResumeLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    supabase
      .from('ai_resume_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setResumes([]);
        } else {
          setResumes((data || []) as AiResumeLog[]);
        }
        setLoading(false);
      });
  }, [userId]);

  return { resumes, loading, error };
}
