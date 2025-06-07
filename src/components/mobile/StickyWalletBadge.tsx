
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Wallet, Zap } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { cn } from '@/lib/utils';

export const StickyWalletBadge: React.FC = () => {
  const { balance } = useWallet();
  const [isLow, setIsLow] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const currentBalance = balance?.balance || 0;

  useEffect(() => {
    const lowThreshold = 50; // Credits below which we consider "low"
    const newIsLow = currentBalance < lowThreshold;
    
    if (newIsLow && !isLow) {
      setShouldAnimate(true);
      setTimeout(() => setShouldAnimate(false), 3000);
    }
    
    setIsLow(newIsLow);
  }, [currentBalance, isLow]);

  if (!balance) return null;

  return (
    <div className="fixed top-4 right-4 z-50 md:hidden">
      <Badge
        variant={isLow ? "destructive" : "secondary"}
        className={cn(
          "flex items-center gap-1 px-3 py-1 text-sm font-medium shadow-lg",
          shouldAnimate && "animate-pulse"
        )}
      >
        {isLow ? (
          <Zap className="h-3 w-3" />
        ) : (
          <Wallet className="h-3 w-3" />
        )}
        <span>{currentBalance} credits</span>
      </Badge>
    </div>
  );
};
