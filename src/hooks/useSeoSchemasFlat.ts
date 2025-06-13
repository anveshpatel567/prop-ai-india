
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type SeoSchema = {
  id: string;
  user_id: string;
  page_url: string;
  schema_output: string;
  schema_type: string;
  created_at: string;
};

export function useSeoSchemasFlat(userId: string) {
  const [schemas, setSchemas] = useState<SeoSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchSchemas = async () => {
      try {
        const { data, error } = await supabase
          .from('jsonld_schema_logs')
          .select('id, user_id, page_url, schema_output, created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) {
          setError(error.message);
          setSchemas([]);
        } else {
          const transformedSchemas = (data || []).map(item => ({
            id: item.id,
            user_id: item.user_id,
            page_url: item.page_url,
            schema_output: item.schema_output,
            schema_type: 'Website', // Default type
            created_at: item.created_at
          }));
          setSchemas(transformedSchemas);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch schemas');
        setSchemas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemas();
  }, [userId]);

  return { schemas, loading, error };
}
