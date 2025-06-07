
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AiToolFlag {
  id: string;
  tool_name: string;
  is_enabled: boolean;
  last_updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export const useAiToolFlags = () => {
  const [flags, setFlags] = useState<AiToolFlag[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchToolFlags = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_tool_flags')
        .select('*')
        .order('tool_name');

      if (error) throw error;
      setFlags(data || []);
    } catch (error) {
      console.error('Error fetching tool flags:', error);
    } finally {
      setLoading(false);
    }
  };

  const isToolEnabled = (toolName: string) => {
    const flag = flags.find(f => f.tool_name === toolName);
    return flag?.is_enabled ?? true; // Default to enabled if not found
  };

  const updateToolFlag = async (toolName: string, isEnabled: boolean) => {
    try {
      const { data, error } = await supabase
        .from('ai_tool_flags')
        .update({ is_enabled: isEnabled })
        .eq('tool_name', toolName)
        .select()
        .single();

      if (error) throw error;
      
      await fetchToolFlags(); // Refresh flags
      return data;
    } catch (error) {
      console.error('Error updating tool flag:', error);
      throw error;
    }
  };

  return {
    flags,
    loading,
    fetchToolFlags,
    isToolEnabled,
    updateToolFlag
  };
};
