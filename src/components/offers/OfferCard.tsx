
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Percent, Gift } from 'lucide-react';
import { ListingOffer } from '@/types/negotiation';

interface OfferCardProps {
  offer: ListingOffer;
  onViewDetails?: () => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer, onViewDetails }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Gift className="h-5 w-5 text-orange-500" />
            {offer.title}
          </CardTitle>
          <Badge className="bg-gradient-to-r from-lime-400 to-green-500 text-white">
            Active
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700">{offer.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Valid until end of month</span>
          </div>
        </div>

        {onViewDetails && (
          <Button 
            onClick={onViewDetails}
            variant="outline"
            className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
