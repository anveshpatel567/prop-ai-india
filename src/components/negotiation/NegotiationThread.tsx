
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNegotiationMessages } from '@/hooks/useNegotiationMessages';
import { useAuth } from '@/context/AuthContext';
import { AiNegotiation } from '@/types/negotiation';

interface NegotiationThreadProps {
  negotiation: AiNegotiation;
  onStatusUpdate?: (status: string) => void;
}

export const NegotiationThread: React.FC<NegotiationThreadProps> = ({
  negotiation,
  onStatusUpdate
}) => {
  const { user } = useAuth();
  const { messages, loading, sendMessage } = useNegotiationMessages(negotiation.id);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      setSending(true);
      await sendMessage(newMessage, 'counter');
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'bg-orange-100 text-orange-700',
      countered: 'bg-yellow-100 text-yellow-700',
      accepted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.open}>
        {status}
      </Badge>
    );
  };

  const isBuyer = user?.id === negotiation.buyer_id;

  return (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Negotiation Thread
          </CardTitle>
          {getStatusBadge(negotiation.status)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="p-3 bg-orange-50 rounded-lg">
          <p className="text-sm font-medium text-orange-800">Initial Offer:</p>
          <p className="text-orange-700">{negotiation.offer_text}</p>
        </div>

        {negotiation.counter_text && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-800">Counter Offer:</p>
            <p className="text-blue-700">{negotiation.counter_text}</p>
          </div>
        )}

        <ScrollArea className="h-64 w-full">
          <div className="space-y-3">
            {loading ? (
              <div className="text-center text-gray-500">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-500">No messages yet</div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.sender_id === user?.id
                      ? 'bg-orange-100 ml-8'
                      : 'bg-gray-100 mr-8'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {message.message_type}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(message.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm">{message.message}</p>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {negotiation.status === 'open' || negotiation.status === 'countered' ? (
          <div className="space-y-3">
            <Textarea
              placeholder="Type your response..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-20"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || sending}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:brightness-110"
              >
                {sending ? 'Sending...' : 'Send Response'}
              </Button>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50"
              >
                AI Assist
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center p-4 text-gray-500">
            This negotiation has been {negotiation.status}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
