
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useCommunityChat } from '@/hooks/useCommunityChat';
import { supabase } from '@/integrations/supabase/client';
import { Send, AlertTriangle, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CommunityChatWindowProps {
  communityId: string;
  communityName: string;
}

export const CommunityChatWindow: React.FC<CommunityChatWindowProps> = ({
  communityId,
  communityName
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  const { messages, loading, postMessage, fetchMessages } = useCommunityChat();

  useEffect(() => {
    fetchMessages(communityId);
    
    // Set up real-time subscription
    const channel = supabase
      .channel('community-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'community_messages',
          filter: `community_id=eq.${communityId}`
        },
        () => {
          fetchMessages(communityId);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [communityId]);

  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScroll]);

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;
    setAutoScroll(isAtBottom);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      const result = await postMessage(communityId, newMessage);
      setNewMessage('');
      
      if (result.flagged) {
        toast({
          title: "Message Flagged",
          description: "Your message has been flagged for review by our AI moderation system.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: error instanceof Error ? error.message : "Unable to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'agent': return 'bg-green-100 text-green-700';
      case 'admin': return 'bg-red-100 text-red-700';
      case 'developer': return 'bg-purple-100 text-purple-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <Card className="flex flex-col h-[600px] border-orange-200">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="flex items-center text-orange-600">
          <Users className="mr-2 h-5 w-5" />
          {communityName}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1 p-0">
        {/* Messages Area */}
        <div 
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 space-y-3"
        >
          {messages.map((message) => (
            <div key={message.id} className="flex flex-col space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-gray-800">
                  {message.user?.full_name || 'Anonymous'}
                </span>
                {message.user?.role && (
                  <Badge className={`text-xs ${getRoleColor(message.user.role)}`}>
                    {message.user.role}
                  </Badge>
                )}
                {message.ai_flagged && (
                  <Badge variant="destructive" className="text-xs">
                    <AlertTriangle className="h-2 w-2 mr-1" />
                    Flagged
                  </Badge>
                )}
                <span className="text-xs text-gray-500">
                  {new Date(message.created_at).toLocaleTimeString()}
                </span>
              </div>
              
              <div className={`p-3 rounded-lg max-w-[80%] ${
                message.ai_flagged 
                  ? 'bg-red-50 border border-red-200' 
                  : 'bg-gray-50'
              }`}>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>
            </div>
          ))}
          
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No messages yet. Be the first to start the conversation!
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
              className="flex-1 min-h-[40px] max-h-[120px] resize-none border-orange-200 focus:border-orange-500"
              rows={1}
            />
            <Button
              onClick={handleSendMessage}
              disabled={loading || !newMessage.trim()}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 mt-1">
            Messages are monitored by AI for community guidelines compliance
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
