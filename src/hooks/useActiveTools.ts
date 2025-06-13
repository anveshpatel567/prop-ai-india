
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type ActiveTool = {
  id: string;
  tool_name: string;
  is_enabled: boolean;
};

export function useActiveTools() {
  const [tools, setTools] = useState<ActiveTool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('ai_tool_flags')
      .select('*')
      .eq('is_enabled', true)
      .order('tool_name', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setTools([]);
        } else {
          const mapped = (data || []).map(item => ({
            id: item.id,
            tool_name: item.tool_name || '',
            is_enabled: item.is_enabled || false
          }));
          setTools(mapped);
        }
        setLoading(false);
      });
  }, []);

  return { tools, loading, error };
}
