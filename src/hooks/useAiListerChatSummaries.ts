
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiListerChatSummary {
  id: string;
  lister_id: string;
  chat_thread_id: string;
  summary_markdown: string;
  summary_type: string;
  created_at: string;
}

export const useAiListerChatSummaries = () => {
  const [summaries, setSummaries] = useState<AiListerChatSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUserSummaries = async (userId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_lister_chat_summaries')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('lister_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setSummaries(data || []);
    } catch (error) {
      console.error('Error fetching chat summaries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch chat summaries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createSummary = async (
    listerId: string,
    chatThreadId: string,
    summaryMarkdown: string,
    summaryType: string
  ) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('ai_lister_chat_summaries')
        .insert({
          lister_id: listerId,
          chat_thread_id: chatThreadId,
          summary_markdown: summaryMarkdown,
          summary_type: summaryType
        });

      if (error) throw error;

      toast({
        title: "Summary Created",
        description: `AI chat summary for ${summaryType} has been generated`,
      });

      // Refresh summaries
      fetchUserSummaries(listerId);
    } catch (error) {
      console.error('Error creating chat summary:', error);
      toast({
        title: "Error",
        description: "Failed to create chat summary",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    summaries,
    loading,
    fetchUserSummaries,
    createSummary,
  };
};
