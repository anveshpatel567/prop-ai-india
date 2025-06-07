
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Zap } from 'lucide-react';

interface BuyCreditsCtaProps {
  toolName?: string;
  creditsNeeded?: number;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export const BuyCreditsCta: React.FC<BuyCreditsCtaProps> = ({
  toolName,
  creditsNeeded,
  variant = 'default',
  size = 'default',
  className
}) => {
  const navigate = useNavigate();

  const handleBuyCredits = () => {
    const params = new URLSearchParams();
    if (toolName) params.set('tool', toolName);
    if (creditsNeeded) params.set('needed', creditsNeeded.toString());
    
    navigate(`/wallet?${params.toString()}`);
  };

  return (
    <Button 
      variant={variant}
      size={size}
      onClick={handleBuyCredits}
      className={`flex items-center gap-2 ${className}`}
    >
      <ShoppingCart className="h-4 w-4" />
      {creditsNeeded ? `Buy ${creditsNeeded} Credits` : 'Buy Credits'}
    </Button>
  );
};
