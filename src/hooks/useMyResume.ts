
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface MyResume {
  id: string;
  user_id: string;
  resume_data: any;
  resume_url?: string;
  status: 'generating' | 'ready' | 'error';
  error_message?: string;
  credits_used: number;
  created_at: string;
  updated_at: string;
}

export function useMyResume() {
  const { user } = useAuth();
  const [resume, setResume] = useState<MyResume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchResume();
    }
  }, [user?.id]);

  const fetchResume = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('ai_resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      setResume(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resume');
    } finally {
      setLoading(false);
    }
  };

  const generateResume = async (formData: {
    experience_years: number;
    regions_covered: string;
    rera_id: string;
    specializations: string;
    achievements: string;
  }) => {
    try {
      const { data, error } = await supabase.functions.invoke('generateResume', {
        body: formData
      });

      if (error) throw error;

      await fetchResume(); // Refresh resume data
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate resume');
      throw err;
    }
  };

  return {
    resume,
    loading,
    error,
    fetchResume,
    generateResume
  };
}
