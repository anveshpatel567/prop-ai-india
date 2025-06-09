
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, CheckCircle, XCircle, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FlaggedMessage {
  id: string;
  message: string;
  ai_flagged: boolean;
  created_at: string;
  user?: {
    full_name: string;
    email: string;
  };
  community?: {
    name: string;
  };
}

export const CommunityModerationPanel: React.FC = () => {
  const [flaggedMessages, setFlaggedMessages] = useState<FlaggedMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed'>('pending');

  useEffect(() => {
    fetchFlaggedMessages();
  }, [filter]);

  const fetchFlaggedMessages = async () => {
    try {
      let query = supabase
        .from('community_messages')
        .select(`
          id,
          message,
          ai_flagged,
          created_at,
          user:users(full_name, email),
          community:communities(name)
        `)
        .eq('ai_flagged', true)
        .order('created_at', { ascending: false });

      const { data, error } = await query;
      
      if (error) throw error;
      setFlaggedMessages(data || []);
    } catch (error) {
      console.error('Error fetching flagged messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('community_messages')
        .update({ ai_flagged: false })
        .eq('id', messageId);

      if (error) throw error;
      
      await fetchFlaggedMessages();
      toast({
        title: "Message Approved",
        description: "The message has been approved and is now visible to all community members.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('community_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;
      
      await fetchFlaggedMessages();
      toast({
        title: "Message Deleted",
        description: "The message has been permanently deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading moderation queue...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Community Moderation Panel
          </CardTitle>
          <div className="flex gap-2">
            {(['pending', 'all'] as const).map((filterOption) => (
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
        {flaggedMessages.map((message) => (
          <Card key={message.id} className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-xs">
                    <AlertTriangle className="h-2 w-2 mr-1" />
                    AI Flagged
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {message.community?.name}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(message.created_at).toLocaleString()}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm text-gray-600 mb-1">
                  User: {message.user?.full_name} ({message.user?.email})
                </div>
              </div>
              
              <div className="p-3 bg-white rounded-lg mb-3 border border-red-200">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => handleApproveMessage(message.id)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Approve
                </Button>
                
                <Button
                  onClick={() => handleDeleteMessage(message.id)}
                  size="sm"
                  variant="destructive"
                >
                  <XCircle className="mr-1 h-3 w-3" />
                  Delete
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-300"
                  onClick={() => window.open(`/community/${message.community?.name}`, '_blank')}
                >
                  <Eye className="mr-1 h-3 w-3" />
                  View Community
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {flaggedMessages.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No flagged messages found. Great job maintaining community standards!
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
