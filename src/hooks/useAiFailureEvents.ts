
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiFailureEventLog {
  id: string;
  module: string;
  user_id: string | null;
  failure_type: string;
  description: string | null;
  occurred_at: string;
  created_at: string;
}

export const useAiFailureEvents = () => {
  const [failureEvents, setFailureEvents] = useState<AiFailureEventLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchFailureEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_failure_event_logs')
        .select('*')
        .order('occurred_at', { ascending: false });

      if (error) throw error;

      setFailureEvents(data || []);
    } catch (error) {
      console.error('Error fetching failure events:', error);
      toast({
        title: "Error",
        description: "Failed to fetch failure events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logFailureEvent = async (
    module: string,
    failureType: string,
    userId?: string,
    description?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_failure_event_logs')
        .insert({
          module,
          failure_type: failureType,
          user_id: userId || null,
          description: description || null
        });

      if (error) throw error;

      console.log('Failure event logged successfully');
      
      // Refresh events
      fetchFailureEvents();
    } catch (error) {
      console.error('Error logging failure event:', error);
      toast({
        title: "Error",
        description: "Failed to log failure event",
        variant: "destructive",
      });
    }
  };

  const getEventsByModule = (module: string): AiFailureEventLog[] => {
    return failureEvents.filter(event => event.module === module);
  };

  const getEventsByType = (failureType: string): AiFailureEventLog[] => {
    return failureEvents.filter(event => event.failure_type === failureType);
  };

  const getFailureRate = (module?: string): number => {
    const events = module ? getEventsByModule(module) : failureEvents;
    return events.length;
  };

  return {
    failureEvents,
    loading,
    fetchFailureEvents,
    logFailureEvent,
    getEventsByModule,
    getEventsByType,
    getFailureRate,
  };
};
