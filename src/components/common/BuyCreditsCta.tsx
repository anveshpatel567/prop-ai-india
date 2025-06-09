
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
      className={`flex items-center gap-2 bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-white hover:from-[#ff3c00] hover:to-[#ff6a00] shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] ${className}`}
    >
      {creditsNeeded ? `Buy ${creditsNeeded} Credits` : 'Buy Credits'}
    </Button>
  );
};
