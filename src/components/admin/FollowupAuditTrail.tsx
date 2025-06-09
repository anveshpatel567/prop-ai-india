
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface FollowupAudit {
  id: string;
  lead_id: string;
  agent_id: string;
  followup_message: string;
  followup_variant: string;
  followup_type: string;
  is_scheduled: boolean;
  scheduled_date: string | null;
  sent_at: string | null;
  created_at: string;
  agent?: {
    full_name: string;
    email: string;
  };
}

export const FollowupAuditTrail: React.FC = () => {
  const [followups, setFollowups] = useState<FollowupAudit[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'sent' | 'pending'>('all');

  useEffect(() => {
    fetchFollowups();
  }, [filter]);

  const fetchFollowups = async () => {
    try {
      let query = supabase
        .from('ai_followups')
        .select(`
          *,
          agent:users!agent_id(full_name, email)
        `)
        .order('created_at', { ascending: false });

      if (filter === 'scheduled') {
        query = query.eq('is_scheduled', true).is('sent_at', null);
      } else if (filter === 'sent') {
        query = query.not('sent_at', 'is', null);
      } else if (filter === 'pending') {
        query = query.eq('is_scheduled', false).is('sent_at', null);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setFollowups(data || []);
    } catch (error) {
      console.error('Error fetching followups:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (followup: FollowupAudit) => {
    if (followup.sent_at) {
      return <Badge className="bg-green-100 text-green-700 border-green-300">Sent</Badge>;
    }
    if (followup.is_scheduled) {
      return <Badge className="bg-blue-100 text-blue-700 border-blue-300">Scheduled</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Pending</Badge>;
  };

  const getVariantIcon = (variant: string) => {
    switch (variant) {
      case 'professional': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'friendly': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'value': return <AlertCircle className="h-4 w-4 text-purple-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading follow-up audit trail...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <FileText className="mr-2 h-5 w-5" />
            Follow-up Audit Trail
          </CardTitle>
          <div className="flex gap-2">
            {(['all', 'scheduled', 'sent', 'pending'] as const).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  filter === filterOption
                    ? 'bg-orange-100 text-orange-700 border border-orange-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-3">
        {followups.map((followup) => (
          <Card key={followup.id} className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getVariantIcon(followup.followup_variant)}
                  <span className="font-medium text-gray-800">
                    {followup.followup_variant} variant
                  </span>
                  {getStatusBadge(followup)}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(followup.created_at).toLocaleString()}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm text-gray-600 mb-1">
                  Agent: {followup.agent?.full_name} ({followup.agent?.email})
                </div>
                <div className="text-sm text-gray-600">
                  Lead ID: {followup.lead_id}
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg mb-3">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {followup.followup_message}
                </p>
              </div>
              
              {followup.scheduled_date && (
                <div className="flex items-center gap-1 text-sm text-blue-600">
                  <Clock className="h-3 w-3" />
                  Scheduled for: {new Date(followup.scheduled_date).toLocaleString()}
                </div>
              )}
              
              {followup.sent_at && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  Sent at: {new Date(followup.sent_at).toLocaleString()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {followups.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No follow-ups found for the selected filter.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
