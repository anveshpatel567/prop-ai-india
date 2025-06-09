
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useNegotiationThreads } from '@/hooks/useNegotiationThreads';
import { useToast } from '@/hooks/use-toast';

interface SendOfferModalProps {
  listingId: string;
  listerId: string;
  listingTitle: string;
  children: React.ReactNode;
}

export const SendOfferModal: React.FC<SendOfferModalProps> = ({
  listingId,
  listerId,
  listingTitle,
  children
}) => {
  const [open, setOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerText, setOfferText] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { startNegotiation } = useNegotiationThreads();
  const { toast } = useToast();

  const handleSubmitOffer = async () => {
    if (!offerText.trim()) {
      toast({
        title: "Error",
        description: "Please enter your offer details",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      const fullOfferText = offerAmount 
        ? `${offerText}\n\nOffered Amount: ₹${offerAmount}`
        : offerText;

      await startNegotiation(listingId, listerId, fullOfferText);
      
      toast({
        title: "Offer Sent",
        description: "Your negotiation has been started successfully"
      });
      
      setOpen(false);
      setOfferAmount('');
      setOfferText('');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send offer",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Start Negotiation
            <Badge className="bg-orange-100 text-orange-700">
              100 credits
            </Badge>
          </DialogTitle>
          <p className="text-sm text-gray-600">{listingTitle}</p>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="offer-amount">Offer Amount (Optional)</Label>
            <Input
              id="offer-amount"
              type="number"
              placeholder="Enter your offer amount"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="offer-text">Your Offer Details</Label>
            <Textarea
              id="offer-text"
              placeholder="Describe your offer, terms, or any questions..."
              value={offerText}
              onChange={(e) => setOfferText(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSubmitOffer}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:brightness-110"
            >
              {loading ? 'Sending...' : 'Send Offer'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300"
            >
              Cancel
            </Button>
          </div>

          <div className="text-xs text-gray-500">
            This will deduct 100 credits from your wallet and start an AI-assisted negotiation thread.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
