
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Coins, AlertTriangle } from 'lucide-react';

export function CreditBalanceIndicator({ 
  balance,
  showWarning = true 
}: { 
  balance: number;
  showWarning?: boolean;
}) {
  const isLow = balance < 10;
  const isCritical = balance < 5;

  const getVariant = () => {
    if (isCritical) return 'destructive';
    if (isLow) return 'secondary';
    return 'default';
  };

  const getIcon = () => {
    if (isCritical && showWarning) {
      return <AlertTriangle className="h-3 w-3" />;
    }
    return <Coins className="h-3 w-3" />;
  };

  return (
    <Badge 
      variant={getVariant()} 
      className="flex items-center gap-1 px-2 py-1"
    >
      {getIcon()}
      <span className="font-medium">{balance}</span>
      <span className="text-xs">credits</span>
    </Badge>
  );
}
