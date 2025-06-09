
import React from 'react';
import { Zap, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCreditStatus } from '@/hooks/useCreditStatus';
import { BuyCreditsCta } from '@/components/common/BuyCreditsCta';

interface CreditStatusIndicatorProps {
  className?: string;
}

export const CreditStatusIndicator: React.FC<CreditStatusIndicatorProps> = ({
  className = ''
}) => {
  const { userCredits } = useCreditStatus();

  const getStatusColor = () => {
    if (userCredits >= 100) return 'text-green-600 bg-green-50 border-green-200';
    if (userCredits >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getStatusIcon = () => {
    if (userCredits >= 100) return <Zap className="h-3 w-3 text-green-600" />;
    if (userCredits >= 50) return <Zap className="h-3 w-3 text-yellow-600" />;
    return <AlertCircle className="h-3 w-3 text-red-600" />;
  };

  return (
    <div className={`absolute top-3 right-3 z-10 ${className}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor()}`}>
              {getStatusIcon()}
              <span className="hidden sm:inline">{userCredits}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom" 
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-orange-300 shadow-lg"
          >
            <div className="space-y-1">
              <p className="font-medium">Credits: {userCredits}</p>
              {userCredits < 100 && (
                <p className="text-xs">Refill to continue using AI tools</p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {userCredits < 100 && (
        <div className="mt-1">
          <BuyCreditsCta 
            size="sm" 
            variant="outline" 
            className="text-xs px-2 py-1 h-auto border-red-300 text-red-600 hover:bg-red-50"
          />
        </div>
      )}
    </div>
  );
};
