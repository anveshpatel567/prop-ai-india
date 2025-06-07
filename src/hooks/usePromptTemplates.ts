
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PromptTemplate {
  id: string;
  title: string;
  template: string;
  category: string | null;
  created_by: string | null;
  created_at: string;
}

export const usePromptTemplates = () => {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_prompt_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const typedData = (data || []) as PromptTemplate[];
      setTemplates(typedData);
    } catch (error) {
      console.error('Error fetching prompt templates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch prompt templates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async (template: Omit<PromptTemplate, 'id' | 'created_at' | 'created_by'>) => {
    try {
      const { data, error } = await supabase.functions.invoke('createPromptTemplate', {
        body: template
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prompt template created successfully",
      });
      
      fetchTemplates();
    } catch (error) {
      console.error('Error creating prompt template:', error);
      toast({
        title: "Error",
        description: "Failed to create prompt template",
        variant: "destructive",
      });
    }
  };

  return {
    templates,
    loading,
    fetchTemplates,
    createTemplate,
  };
};
