
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BehaviorChangeRequest {
  id: string;
  requested_by: string | null;
  agent_id: string;
  proposed_change: string;
  reason: string | null;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
}

export function useBehaviorChangeRequests() {
  const [requests, setRequests] = useState<BehaviorChangeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchBehaviorChangeRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_behavior_change_requests')
        .select('*')
        .order('requested_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching behavior change requests:', error);
      toast({
        title: "Error",
        description: "Failed to fetch behavior change requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitBehaviorChangeRequest = async (agent_id: string, proposed_change: string, reason?: string) => {
    try {
      const { error } = await supabase.functions.invoke('submitBehaviorChangeRequest', {
        body: { agent_id, proposed_change, reason }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Behavior change request submitted successfully",
      });
      
      fetchBehaviorChangeRequests();
    } catch (error) {
      console.error('Error submitting behavior change request:', error);
      toast({
        title: "Error",
        description: "Failed to submit behavior change request",
        variant: "destructive",
      });
    }
  };

  const updateRequestStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('ai_behavior_change_requests')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Request status updated successfully",
      });
      
      fetchBehaviorChangeRequests();
    } catch (error) {
      console.error('Error updating request status:', error);
      toast({
        title: "Error",
        description: "Failed to update request status",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchBehaviorChangeRequests();
  }, []);

  return {
    requests,
    loading,
    fetchBehaviorChangeRequests,
    submitBehaviorChangeRequest,
    updateRequestStatus
  };
}
