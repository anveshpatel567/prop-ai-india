
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Zap, IndianRupee } from 'lucide-react';
import { useNegotiationThreads } from '@/hooks/useNegotiationThreads';
import { useToast } from '@/hooks/use-toast';

interface NegotiationAgentCardProps {
  listingId: string;
  listerId: string;
  listingTitle: string;
  currentPrice: number;
}

export const NegotiationAgentCard: React.FC<NegotiationAgentCardProps> = ({
  listingId,
  listerId,
  listingTitle,
  currentPrice
}) => {
  const [showForm, setShowForm] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { startNegotiation } = useNegotiationThreads();
  const { toast } = useToast();

  const handleStartNegotiation = async () => {
    if (!offerAmount) {
      toast({
        title: "Error",
        description: "Please enter an offer amount",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      const fullOfferText = message 
        ? `${message}\n\nOffered Amount: ₹${offerAmount}`
        : `Offered Amount: ₹${offerAmount}`;

      await startNegotiation(listingId, listerId, fullOfferText);

      toast({
        title: "Negotiation Started",
        description: "Your offer has been sent to the property owner",
      });

      setShowForm(false);
      setOfferAmount('');
      setMessage('');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start negotiation",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="flex items-center gap-2 justify-center">
            AI Negotiation Agent
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              50 credits
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Start an intelligent negotiation with the property owner using our AI-powered assistant
          </p>
          <Button 
            onClick={() => setShowForm(true)}
            className="w-full"
          >
            Make an Offer
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Start Negotiation
        </CardTitle>
        <p className="text-sm text-muted-foreground">{listingTitle}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Offer Amount</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              placeholder={`Listed at ₹${currentPrice.toLocaleString()}`}
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Message (Optional)</label>
          <Textarea
            placeholder="Add a personal message to strengthen your offer..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleStartNegotiation}
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Starting...' : 'Start Negotiation'}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowForm(false)}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Zap className="h-3 w-3" />
          <span>This will cost 50 credits from your wallet</span>
        </div>
      </CardContent>
    </Card>
  );
};
