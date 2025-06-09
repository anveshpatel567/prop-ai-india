
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Star } from 'lucide-react';

interface ResumeScoreBadgeProps {
  score: number;
  className?: string;
}

export const ResumeScoreBadge: React.FC<ResumeScoreBadgeProps> = ({ 
  score, 
  className = '' 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-lime-400 to-green-500';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-orange-500 to-red-500';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-3 ${className}`}>
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-full bg-gradient-to-r ${getScoreColor(score)}`}>
                <Star className="h-3 w-3 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {score}/100
                </div>
                <div className="text-xs text-gray-700">
                  AI Resume Match
                </div>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">
            This score reflects your resume's match with active listings in your area.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
