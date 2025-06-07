
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiFollowupReminder {
  id: string;
  agent_id: string;
  lead_id: string;
  reminder_text: string;
  recommended_time: string;
  urgency_level: string;
  created_at: string;
}

export const useAiFollowupReminders = () => {
  const [reminders, setReminders] = useState<AiFollowupReminder[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAgentReminders = async (agentId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_followup_reminders')
        .select('*')
        .order('recommended_time', { ascending: true });

      if (agentId) {
        query = query.eq('agent_id', agentId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setReminders(data || []);
    } catch (error) {
      console.error('Error fetching follow-up reminders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch follow-up reminders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createReminder = async (
    agentId: string,
    leadId: string,
    reminderText: string,
    recommendedTime: string,
    urgencyLevel: string
  ) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('ai_followup_reminders')
        .insert({
          agent_id: agentId,
          lead_id: leadId,
          reminder_text: reminderText,
          recommended_time: recommendedTime,
          urgency_level: urgencyLevel
        });

      if (error) throw error;

      toast({
        title: "Reminder Created",
        description: `AI follow-up reminder with ${urgencyLevel} urgency has been scheduled`,
      });

      // Refresh reminders
      fetchAgentReminders(agentId);
    } catch (error) {
      console.error('Error creating follow-up reminder:', error);
      toast({
        title: "Error",
        description: "Failed to create follow-up reminder",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingReminders = (): AiFollowupReminder[] => {
    const now = new Date();
    return reminders.filter(reminder => new Date(reminder.recommended_time) > now);
  };

  const getOverdueReminders = (): AiFollowupReminder[] => {
    const now = new Date();
    return reminders.filter(reminder => new Date(reminder.recommended_time) <= now);
  };

  return {
    reminders,
    loading,
    fetchAgentReminders,
    createReminder,
    getUpcomingReminders,
    getOverdueReminders,
  };
};
