
import React from 'react';
import { Badge } from '@/components/ui/badge';

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
      <Badge className={`bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-white ${className}`}>
        {discountPercent}% OFF
      </Badge>
    );
  }

  if (offerText) {
    return (
      <Badge className={`bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-white ${className}`}>
        {offerText}
      </Badge>
    );
  }

  return null;
};
