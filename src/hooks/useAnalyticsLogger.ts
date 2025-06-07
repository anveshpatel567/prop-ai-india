
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export function useAnalyticsLogger() {
  const { user } = useAuth();

  const logEvent = async (event_type: string, event_data?: any) => {
    try {
      await supabase
        .from('analytics_events')
        .insert({
          user_id: user?.id || null,
          event_type,
          event_data: event_data || null
        });
    } catch (error) {
      console.error('Failed to log analytics event:', error);
    }
  };

  return { logEvent };
}
