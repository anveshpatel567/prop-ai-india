
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiAuditTrailEntry {
  id: string;
  admin_id: string | null;
  tool_name: string;
  change_type: string;
  previous_value: string | null;
  new_value: string | null;
  changed_at: string;
}

export const useAiAuditTrail = () => {
  const [auditTrail, setAuditTrail] = useState<AiAuditTrailEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAuditTrail = async (toolFilter?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_admin_audit_trail')
        .select('*')
        .order('changed_at', { ascending: false })
        .limit(100);

      if (toolFilter && toolFilter !== 'all') {
        query = query.eq('tool_name', toolFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      const typedData = (data || []) as AiAuditTrailEntry[];
      setAuditTrail(typedData);
    } catch (error) {
      console.error('Error fetching audit trail:', error);
      toast({
        title: "Error",
        description: "Failed to fetch audit trail",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAuditEntry = async (entry: Omit<AiAuditTrailEntry, 'id' | 'changed_at' | 'admin_id'>) => {
    try {
      const { error } = await supabase
        .from('ai_admin_audit_trail')
        .insert(entry);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Audit entry logged successfully",
      });
      
      fetchAuditTrail();
    } catch (error) {
      console.error('Error adding audit entry:', error);
      toast({
        title: "Error",
        description: "Failed to log audit entry",
        variant: "destructive",
      });
    }
  };

  return {
    auditTrail,
    loading,
    fetchAuditTrail,
    addAuditEntry,
  };
};
