
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Zap, ArrowRight } from 'lucide-react';

export function StickyUpgradeBanner({ 
  creditsRemaining,
  onUpgrade,
  onDismiss 
}: { 
  creditsRemaining: number;
  onUpgrade: () => void;
  onDismiss: () => void;
}) {
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  if (isDismissed || creditsRemaining > 10) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss();
  };

  const getUrgencyMessage = (credits: number) => {
    if (credits <= 0) return "You're out of credits!";
    if (credits <= 3) return "Almost out of credits!";
    if (credits <= 5) return "Running low on credits!";
    return "Credits running low!";
  };

  const getUrgencyColor = (credits: number) => {
    if (credits <= 0) return "bg-red-500";
    if (credits <= 3) return "bg-orange-500";
    return "bg-yellow-500";
  };

  return (
    <Card className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md mx-4 shadow-lg border-orange-200">
      <div className={`${getUrgencyColor(creditsRemaining)} text-white p-4 rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            <span className="font-semibold">{getUrgencyMessage(creditsRemaining)}</span>
          </div>
          <button
            onClick={handleDismiss}
            className="hover:bg-white/20 rounded-full p-1 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-3">
            You have <span className="font-bold text-orange-600">{creditsRemaining} credits</span> remaining. 
            Upgrade now to continue using AI tools without interruption.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={onUpgrade}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <span>Upgrade Now</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-xs text-center text-gray-500">
          ✨ Unlimited AI tools • Priority support • Advanced features
        </div>
      </div>
    </Card>
  );
}
