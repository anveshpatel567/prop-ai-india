
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type CrmAuditLog = {
  id: string;
  user_id: string;
  action: string;
  context: string;
  created_at: string;
};

export function useCrmAuditLogs() {
  const [logs, setLogs] = useState<CrmAuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('crm_lead_audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setLogs([]);
        } else {
          setLogs((data || []) as CrmAuditLog[]);
        }
        setLoading(false);
      });
  }, []);

  return { logs, loading, error };
}
