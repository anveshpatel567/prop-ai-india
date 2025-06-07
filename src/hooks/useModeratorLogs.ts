
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ModeratorAction {
  id: string;
  moderator_id: string;
  action_taken: string;
  target_table: string;
  target_id: string;
  decision: string;
  notes: string | null;
  decided_at: string;
}

export const useModeratorLogs = () => {
  const [actions, setActions] = useState<ModeratorAction[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchModeratorLogs = async (targetTableFilter?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_moderator_actions')
        .select('*')
        .order('decided_at', { ascending: false });

      if (targetTableFilter && targetTableFilter !== 'all') {
        query = query.eq('target_table', targetTableFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setActions(data || []);
    } catch (error) {
      console.error('Error fetching moderator logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch moderator logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logModeratorAction = async (
    moderatorId: string,
    actionTaken: string,
    targetTable: string,
    targetId: string,
    decision: string,
    notes?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_moderator_actions')
        .insert({
          moderator_id: moderatorId,
          action_taken: actionTaken,
          target_table: targetTable,
          target_id: targetId,
          decision,
          notes: notes || null
        });

      if (error) throw error;

      console.log('Moderator action logged successfully');
      fetchModeratorLogs();
    } catch (error) {
      console.error('Error logging moderator action:', error);
      toast({
        title: "Error",
        description: "Failed to log moderator action",
        variant: "destructive",
      });
    }
  };

  const searchByTable = (searchTerm: string): ModeratorAction[] => {
    return actions.filter(action => 
      action.target_table.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return {
    actions,
    loading,
    fetchModeratorLogs,
    logModeratorAction,
    searchByTable,
  };
};
