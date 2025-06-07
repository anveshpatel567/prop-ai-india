
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AgentCampaignLog {
  id: string;
  agent_id: string;
  campaign_name: string;
  campaign_type: 'whatsapp' | 'sms' | 'email';
  target_count: number;
  sent_count: number;
  response_count: number;
  campaign_status: 'draft' | 'active' | 'paused' | 'completed';
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useAgentCampaignLogs = () => {
  const [campaigns, setCampaigns] = useState<AgentCampaignLog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = async (agentId?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('agent_campaign_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (agentId) {
        query = query.eq('agent_id', agentId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (campaignData: Omit<AgentCampaignLog, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('agent_campaign_logs')
        .insert([campaignData])
        .select()
        .single();

      if (error) throw error;
      
      await fetchCampaigns(); // Refresh campaigns
      return data;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  };

  const updateCampaignStatus = async (campaignId: string, status: AgentCampaignLog['campaign_status']) => {
    try {
      const updateData: any = { campaign_status: status };
      
      if (status === 'active' && campaigns.find(c => c.id === campaignId)?.started_at === null) {
        updateData.started_at = new Date().toISOString();
      }
      
      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('agent_campaign_logs')
        .update(updateData)
        .eq('id', campaignId)
        .select()
        .single();

      if (error) throw error;
      
      await fetchCampaigns(); // Refresh campaigns
      return data;
    } catch (error) {
      console.error('Error updating campaign status:', error);
      throw error;
    }
  };

  const updateCampaignMetrics = async (campaignId: string, sentCount: number, responseCount: number) => {
    try {
      const { data, error } = await supabase
        .from('agent_campaign_logs')
        .update({ 
          sent_count: sentCount,
          response_count: responseCount 
        })
        .eq('id', campaignId)
        .select()
        .single();

      if (error) throw error;
      
      await fetchCampaigns(); // Refresh campaigns
      return data;
    } catch (error) {
      console.error('Error updating campaign metrics:', error);
      throw error;
    }
  };

  const getActiveCampaigns = () => {
    return campaigns.filter(campaign => campaign.campaign_status === 'active');
  };

  const getCampaignsByType = (type: AgentCampaignLog['campaign_type']) => {
    return campaigns.filter(campaign => campaign.campaign_type === type);
  };

  const getCampaignResponseRate = (campaign: AgentCampaignLog) => {
    if (campaign.sent_count === 0) return 0;
    return (campaign.response_count / campaign.sent_count) * 100;
  };

  return {
    campaigns,
    loading,
    fetchCampaigns,
    createCampaign,
    updateCampaignStatus,
    updateCampaignMetrics,
    getActiveCampaigns,
    getCampaignsByType,
    getCampaignResponseRate
  };
};
