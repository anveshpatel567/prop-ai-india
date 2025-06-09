
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Shield } from 'lucide-react';

interface AgentTrustBadgeProps {
  confidencePercent: number;
  className?: string;
}

export const AgentTrustBadge: React.FC<AgentTrustBadgeProps> = ({ 
  confidencePercent, 
  className = '' 
}) => {
  const getTrustLevel = (percent: number) => {
    if (percent >= 90) return { label: 'Verified', color: 'from-lime-400 to-green-500' };
    if (percent >= 75) return { label: 'Trusted', color: 'from-yellow-400 to-orange-500' };
    return { label: 'New Agent', color: 'from-orange-500 to-red-500' };
  };

  const trust = getTrustLevel(confidencePercent);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={`bg-gradient-to-r ${trust.color} text-white border-0 ${className}`}>
            <Shield className="h-3 w-3 mr-1" />
            {trust.label} {confidencePercent}%
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">
            Based on follow-up history and feedback.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
