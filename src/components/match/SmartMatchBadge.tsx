
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Brain, Star } from 'lucide-react';

interface SmartMatchBadgeProps {
  matchScore: number;
  matchReasons: string[];
  size?: 'sm' | 'md' | 'lg';
}

export const SmartMatchBadge: React.FC<SmartMatchBadgeProps> = ({
  matchScore,
  matchReasons,
  size = 'md'
}) => {
  // Ensure match score is within valid range
  const validScore = Math.max(0, Math.min(100, matchScore || 0));

  const getScoreColor = () => {
    if (validScore >= 90) return 'bg-green-500 text-white';
    if (validScore >= 75) return 'bg-blue-500 text-white';
    if (validScore >= 60) return 'bg-yellow-500 text-black';
    return 'bg-gray-400 text-white';
  };

  const getScoreLabel = () => {
    if (validScore >= 90) return 'Perfect Match';
    if (validScore >= 75) return 'Great Match';
    if (validScore >= 60) return 'Good Match';
    return 'Fair Match';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  const validReasons = Array.isArray(matchReasons) ? matchReasons : [];

  return (
    <div className="space-y-2">
      <Badge className={`${getScoreColor()} ${sizeClasses[size]} flex items-center gap-1`}>
        <Brain className="h-3 w-3" />
        {validScore}% {getScoreLabel()}
      </Badge>
      
      {validReasons.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {validReasons.slice(0, 3).map((reason, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              <Star className="h-2 w-2 mr-1" />
              {reason}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
