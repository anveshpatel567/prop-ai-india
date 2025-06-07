
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export function useVisitLogger() {
  const { user } = useAuth();

  useEffect(() => {
    const logVisit = async () => {
      try {
        const url = new URL(window.location.href);
        const utm_source = url.searchParams.get('utm_source');
        const utm_medium = url.searchParams.get('utm_medium');
        const utm_campaign = url.searchParams.get('utm_campaign');

        await supabase
          .from('visit_logs')
          .insert({
            user_id: user?.id || null,
            page_url: window.location.pathname,
            utm_source,
            utm_medium,
            utm_campaign,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent
          });
      } catch (error) {
        console.error('Failed to log visit:', error);
      }
    };

    logVisit();
  }, [user?.id]);

  return null;
}
