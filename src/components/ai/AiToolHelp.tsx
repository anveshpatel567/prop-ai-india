
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AiToolHelpProps {
  toolName: string;
  description: string;
  className?: string;
}

export const AiToolHelp: React.FC<AiToolHelpProps> = ({
  toolName,
  description,
  className = ''
}) => {
  return (
    <div className={`absolute top-3 left-3 z-10 ${className}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300 cursor-help">
              <HelpCircle className="h-3 w-3" />
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom" 
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-orange-300 shadow-lg max-w-xs"
          >
            <div className="space-y-1">
              <p className="font-medium text-sm">{toolName}</p>
              <p className="text-xs opacity-90">{description}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
