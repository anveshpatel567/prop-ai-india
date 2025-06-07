
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Bot, User, IndianRupee, Send } from 'lucide-react';
import { useNegotiationMessages } from '@/hooks/useNegotiationMessages';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface NegotiationChatPanelProps {
  threadId: string;
  threadStatus: string;
  onStatusUpdate?: (status: string) => void;
}

export const NegotiationChatPanel: React.FC<NegotiationChatPanelProps> = ({
  threadId,
  threadStatus,
  onStatusUpdate
}) => {
  const { user } = useAuth();
  const { messages, loading, sendMessage } = useNegotiationMessages(threadId);
  const { toast } = useToast();
  
  const [newMessage, setNewMessage] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [useAi, setUseAi] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !offerAmount) return;

    try {
      setSending(true);
      
      await sendMessage(
        newMessage || `Counter-offer: ₹${offerAmount}`,
        offerAmount ? parseFloat(offerAmount) : undefined,
        useAi
      );

      setNewMessage('');
      setOfferAmount('');
      setUseAi(false);

      toast({
        title: "Message Sent",
        description: useAi ? "AI-generated message sent successfully" : "Message sent successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  const getMessageIcon = (messageType: string, senderId: string) => {
    if (messageType === 'ai_generated') {
      return <Bot className="h-4 w-4 text-blue-500" />;
    }
    return senderId === user?.id ? 
      <User className="h-4 w-4 text-green-500" /> : 
      <User className="h-4 w-4 text-gray-500" />;
  };

  const getMessageBadge = (messageType: string) => {
    switch (messageType) {
      case 'ai_generated':
        return <Badge variant="secondary" className="text-xs">AI Generated</Badge>;
      case 'offer':
        return <Badge variant="default" className="text-xs">Offer</Badge>;
      case 'counter':
        return <Badge variant="outline" className="text-xs">Counter</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Negotiation Chat
          <Badge variant={threadStatus === 'accepted' ? 'default' : 'secondary'}>
            {threadStatus}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-muted-foreground">No messages yet</div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 space-y-2 ${
                      message.sender_id === user?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {getMessageIcon(message.message_type, message.sender_id)}
                      {getMessageBadge(message.message_type)}
                      {message.offer_amount && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <IndianRupee className="h-3 w-3" />
                          {message.offer_amount.toLocaleString()}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70">
                      {new Date(message.sent_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {threadStatus !== 'accepted' && threadStatus !== 'rejected' && (
          <div className="border-t p-4 space-y-3">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Counter-offer amount"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={() => setUseAi(!useAi)}
                className={useAi ? 'bg-blue-50 border-blue-200' : ''}
              >
                <Bot className="h-4 w-4" />
                AI
              </Button>
            </div>

            <div className="flex gap-2">
              <Textarea
                placeholder={useAi ? "AI will generate a professional message..." : "Type your message..."}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
                rows={2}
                disabled={useAi}
              />
              <Button
                onClick={handleSendMessage}
                disabled={sending || (!newMessage.trim() && !offerAmount)}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {useAi && (
              <p className="text-xs text-muted-foreground">
                AI will generate a professional negotiation message based on the conversation context
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
