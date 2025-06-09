
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Zap, AlertCircle } from 'lucide-react';

interface AiCreditTooltipProps {
  credits_required: number;
  tool_name: string;
  user_credits: number;
  children: React.ReactNode;
}

export const AiCreditTooltip: React.FC<AiCreditTooltipProps> = ({
  credits_required,
  tool_name,
  user_credits,
  children
}) => {
  const canAfford = user_credits >= credits_required;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className={`bg-white border-2 shadow-lg p-4 rounded-xl max-w-xs ${
            canAfford 
              ? 'border-green-200 shadow-green-200/50' 
              : 'border-red-200 shadow-red-200/50'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Zap className={`h-4 w-4 ${canAfford ? 'text-green-600' : 'text-red-600'}`} />
              <span className="font-semibold text-gray-800">{tool_name}</span>
            </div>
            
            <div className="text-sm space-y-1">
              <div className={`font-medium ${canAfford ? 'text-green-700' : 'text-red-700'}`}>
                Uses {credits_required} credits
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Your balance:</span>
                <span className={`font-bold ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
                  {user_credits} credits
                </span>
              </div>
              
              {!canAfford && (
                <div className="flex items-center space-x-1 text-red-600 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  <span>Insufficient credits</span>
                </div>
              )}
            </div>
            
            <div className={`text-xs px-2 py-1 rounded-full text-center ${
              canAfford 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {canAfford ? '✓ Ready to use' : '⚠ Buy more credits'}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
