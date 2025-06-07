
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiFaqGeneration {
  id: string;
  context: string;
  generated_by: string | null;
  faq_markdown: string;
  created_at: string;
}

export const useAiFaqGenerations = () => {
  const [faqs, setFaqs] = useState<AiFaqGeneration[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUserFaqs = async (userId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_faq_generations')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('generated_by', userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQ generations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch FAQ generations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateFaq = async (
    context: string,
    faqMarkdown: string,
    userId?: string
  ) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('ai_faq_generations')
        .insert({
          context: context,
          faq_markdown: faqMarkdown,
          generated_by: userId || null
        });

      if (error) throw error;

      toast({
        title: "FAQ Generated",
        description: `AI FAQ for ${context} has been created`,
      });

      // Refresh FAQs
      fetchUserFaqs(userId);
    } catch (error) {
      console.error('Error generating FAQ:', error);
      toast({
        title: "Error",
        description: "Failed to generate FAQ",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    faqs,
    loading,
    fetchUserFaqs,
    generateFaq,
  };
};
