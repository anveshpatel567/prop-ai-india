
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function ResumeConfidenceMeter({ 
  score,
  jobTitle,
  factors 
}: { 
  score: number;
  jobTitle: string;
  factors: Array<{
    factor: string;
    impact: string;
    weight: number;
  }>;
}) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 80) return 'Very Good Match';
    if (score >= 70) return 'Good Match';
    if (score >= 60) return 'Fair Match';
    return 'Needs Improvement';
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'negative': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Resume Match Score</h3>
            <p className="text-sm text-gray-600 mb-4">For: {jobTitle}</p>
            
            <div className="relative mb-4">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
                {score}%
              </div>
              <div className={`text-sm font-medium ${getScoreColor(score)}`}>
                {getScoreLabel(score)}
              </div>
            </div>
            
            <Progress 
              value={score} 
              className="h-3 mb-4"
              style={{
                '--progress-foreground': getProgressColor(score)
              } as React.CSSProperties}
            />
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm">Key Factors:</h4>
            {factors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {getImpactIcon(factor.impact)}
                  <span className="text-sm">{factor.factor}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Weight: {factor.weight}%
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-medium text-sm text-blue-800 mb-2">Improvement Tips:</h5>
            <ul className="text-xs text-blue-700 space-y-1">
              {score < 80 && (
                <>
                  <li>• Add more relevant keywords from the job description</li>
                  <li>• Include quantifiable achievements and metrics</li>
                  <li>• Highlight industry-specific skills and certifications</li>
                </>
              )}
              {score >= 80 && (
                <li>• Your resume is well-optimized for this role!</li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
