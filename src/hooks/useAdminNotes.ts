
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminNote {
  id: string;
  context: string;
  note: string;
  author_id: string | null;
  created_at: string;
}

export function useAdminNotes() {
  const [notes, setNotes] = useState<AdminNote[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAdminNotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_admin_notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching admin notes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch admin notes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAdminNote = async (context: string, note: string) => {
    try {
      const { error } = await supabase.functions.invoke('addAdminNote', {
        body: { context, note }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Admin note added successfully",
      });
      
      fetchAdminNotes();
    } catch (error) {
      console.error('Error adding admin note:', error);
      toast({
        title: "Error",
        description: "Failed to add admin note",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAdminNotes();
  }, []);

  return {
    notes,
    loading,
    fetchAdminNotes,
    addAdminNote
  };
}
