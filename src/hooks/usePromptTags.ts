
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PromptTag {
  id: string;
  prompt_id: string;
  feature_area: string;
  tags: string[];
  tagged_by: string | null;
  tagged_at: string;
}

export const usePromptTags = () => {
  const [tags, setTags] = useState<PromptTag[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchPromptTags = async (featureFilter?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_prompt_tags')
        .select('*')
        .order('tagged_at', { ascending: false });

      if (featureFilter && featureFilter !== 'all') {
        query = query.eq('feature_area', featureFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setTags(data || []);
    } catch (error) {
      console.error('Error fetching prompt tags:', error);
      toast({
        title: "Error",
        description: "Failed to fetch prompt tags",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addPromptTag = async (
    promptId: string,
    featureArea: string,
    tags: string[]
  ) => {
    try {
      const { error } = await supabase
        .from('ai_prompt_tags')
        .insert({
          prompt_id: promptId,
          feature_area: featureArea,
          tags,
          tagged_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      console.log('Prompt tag added successfully');
      fetchPromptTags();
      
      toast({
        title: "Success",
        description: "Prompt tag added successfully",
      });
    } catch (error) {
      console.error('Error adding prompt tag:', error);
      toast({
        title: "Error",
        description: "Failed to add prompt tag",
        variant: "destructive",
      });
    }
  };

  return {
    tags,
    loading,
    fetchPromptTags,
    addPromptTag,
  };
};
