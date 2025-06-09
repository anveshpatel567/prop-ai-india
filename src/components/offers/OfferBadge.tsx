
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Percent, Gift } from 'lucide-react';

interface OfferBadgeProps {
  discountPercent?: number;
  offerText?: string;
  className?: string;
}

export const OfferBadge: React.FC<OfferBadgeProps> = ({ 
  discountPercent, 
  offerText, 
  className = '' 
}) => {
  if (discountPercent) {
    return (
      <Badge className={`bg-gradient-to-r from-lime-400 to-green-500 text-white ${className}`}>
        <Percent className="h-3 w-3 mr-1" />
        {discountPercent}% OFF
      </Badge>
    );
  }

  if (offerText) {
    return (
      <Badge className={`bg-gradient-to-r from-orange-500 to-red-500 text-white ${className}`}>
        <Gift className="h-3 w-3 mr-1" />
        {offerText}
      </Badge>
    );
  }

  return null;
};
