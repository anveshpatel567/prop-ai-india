
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SmartMatchScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function SmartMatchScore({ score, size = 'md' }: SmartMatchScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Poor Match';
  };

  const sizeClasses = {
    sm: 'h-2 text-xs',
    md: 'h-3 text-sm',
    lg: 'h-4 text-base'
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className={`font-semibold ${size === 'lg' ? 'text-lg' : size === 'md' ? 'text-base' : 'text-sm'}`}>
          {score}% Match
        </span>
        <Badge variant="secondary" className="text-xs">
          {getScoreText(score)}
        </Badge>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`${getScoreColor(score)} ${sizeClasses[size]} rounded-full transition-all duration-1000 ease-out glow-animation`}
          style={{ width: `${score}%` }}
        />
      </div>
      
      <style jsx>{`
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6); }
        }
        
        .glow-animation {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
