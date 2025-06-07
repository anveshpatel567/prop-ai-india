
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface AdminCreditUsageCardProps {
  toolName: string;
  creditsUsed: number;
  dailyLimit: number;
  enforced: boolean;
}

export function AdminCreditUsageCard({ 
  toolName, 
  creditsUsed, 
  dailyLimit, 
  enforced 
}: AdminCreditUsageCardProps) {
  const percentage = dailyLimit > 0 ? (creditsUsed / dailyLimit) * 100 : 0;
  const isOverLimit = creditsUsed > dailyLimit;
  
  const getStatusColor = () => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-orange-600';
    return 'text-green-600';
  };

  const getProgressColor = () => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          {toolName}
          {!enforced && <Badge variant="outline">Not Enforced</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className={getStatusColor()}>
              {creditsUsed} / {dailyLimit} credits
            </span>
            <span className="text-muted-foreground">
              {percentage.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={Math.min(percentage, 100)} 
            className="h-2"
          />
          {isOverLimit && enforced && (
            <p className="text-xs text-red-600 font-medium">
              ⚠️ Limit exceeded
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
