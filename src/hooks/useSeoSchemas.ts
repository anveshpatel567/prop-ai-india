
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type SeoSchema = {
  id: string;
  user_id: string;
  page_url: string;
  schema_output: string;
  created_at: string;
};

export function useSeoSchemas(userId: string) {
  const [schemas, setSchemas] = useState<SeoSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    supabase
      .from('jsonld_schema_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setSchemas([]);
        } else {
          setSchemas((data || []) as SeoSchema[]);
        }
        setLoading(false);
      });
  }, [userId]);

  return { schemas, loading, error };
}
