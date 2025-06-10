
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
  const getScoreColor = () => {
    if (matchScore >= 90) return 'bg-green-500 text-white';
    if (matchScore >= 75) return 'bg-blue-500 text-white';
    if (matchScore >= 60) return 'bg-yellow-500 text-black';
    return 'bg-gray-400 text-white';
  };

  const getScoreLabel = () => {
    if (matchScore >= 90) return 'Perfect Match';
    if (matchScore >= 75) return 'Great Match';
    if (matchScore >= 60) return 'Good Match';
    return 'Fair Match';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  return (
    <div className="space-y-2">
      <Badge className={`${getScoreColor()} ${sizeClasses[size]} flex items-center gap-1`}>
        <Brain className="h-3 w-3" />
        {matchScore}% {getScoreLabel()}
      </Badge>
      
      {matchReasons.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {matchReasons.map((reason, index) => (
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
