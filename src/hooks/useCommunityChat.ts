
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Community {
  id: string;
  name: string;
  role_access: string;
  city: string;
  state: string;
  monthly_fee: number;
}

interface CommunityMessage {
  id: string;
  community_id: string;
  user_id: string;
  message: string;
  ai_flagged: boolean;
  created_at: string;
  user?: {
    full_name: string;
    role: string;
  };
}

export const useCommunityChat = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [userMemberships, setUserMemberships] = useState<string[]>([]);

  const fetchCommunities = async () => {
    try {
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCommunities(data || []);
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
  };

  const fetchUserMemberships = async () => {
    try {
      const { data, error } = await supabase
        .from('community_memberships')
        .select('community_id')
        .gt('expires_at', new Date().toISOString());

      if (error) throw error;
      setUserMemberships(data?.map(m => m.community_id) || []);
    } catch (error) {
      console.error('Error fetching memberships:', error);
    }
  };

  const fetchMessages = async (communityId: string) => {
    try {
      const { data, error } = await supabase
        .from('community_messages')
        .select(`
          *,
          user:users(full_name, role)
        `)
        .eq('community_id', communityId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const joinCommunity = async (communityId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('joinCommunity', {
        body: { communityId }
      });

      if (error) throw error;
      
      await fetchUserMemberships();
      return data;
    } catch (error) {
      console.error('Error joining community:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const postMessage = async (communityId: string, message: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('postCommunityMessage', {
        body: { communityId, message }
      });

      if (error) throw error;
      
      await fetchMessages(communityId);
      return data;
    } catch (error) {
      console.error('Error posting message:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
    fetchUserMemberships();
  }, []);

  return {
    communities,
    messages,
    userMemberships,
    loading,
    joinCommunity,
    postMessage,
    fetchMessages,
    fetchCommunities,
    fetchUserMemberships
  };
};
