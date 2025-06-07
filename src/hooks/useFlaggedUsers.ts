
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FlaggedUser {
  id: string;
  user_id: string | null;
  flag_type: string;
  flag_reason: string;
  flagged_by: string | null;
  flagged_at: string;
}

export function useFlaggedUsers() {
  const [flaggedUsers, setFlaggedUsers] = useState<FlaggedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFlaggedUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_flagged_users')
        .select('*')
        .order('flagged_at', { ascending: false });

      if (error) throw error;
      setFlaggedUsers(data || []);
    } catch (error) {
      console.error('Error fetching flagged users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch flagged users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const flagUser = async (user_id: string, flag_type: string, flag_reason: string) => {
    try {
      const { error } = await supabase.functions.invoke('flagUser', {
        body: { user_id, flag_type, flag_reason }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "User flagged successfully",
      });
      
      fetchFlaggedUsers();
    } catch (error) {
      console.error('Error flagging user:', error);
      toast({
        title: "Error",
        description: "Failed to flag user",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchFlaggedUsers();
  }, []);

  return {
    flaggedUsers,
    loading,
    fetchFlaggedUsers,
    flagUser
  };
}
