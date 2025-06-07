
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface AiVideoJob {
  id: string;
  user_id: string;
  listing_id: string;
  video_url: string | null;
  thumbnail_url: string | null;
  generation_prompt: string;
  status: string;
  credits_used: number;
  created_at: string;
}

export function useAiVideoJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<AiVideoJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchJobs();
    }
  }, [user?.id]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_video_jobs')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch video jobs');
    } finally {
      setLoading(false);
    }
  };

  const generateVideo = async (listing_id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('generateVideoFromListing', {
        body: { listing_id }
      });

      if (error) throw error;
      await fetchJobs();
      return data.video_job;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate video');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    jobs,
    loading,
    error,
    generateVideo,
    refetch: fetchJobs
  };
}
