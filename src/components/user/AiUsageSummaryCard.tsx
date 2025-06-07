
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMyToolSummary } from '@/hooks/useMyToolSummary';
import { useNavigate } from 'react-router-dom';
import { Zap, TrendingUp, Target, Activity } from 'lucide-react';

export const AiUsageSummaryCard: React.FC = () => {
  const { summary, loading } = useMyToolSummary();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Loading your AI usage...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Your AI Usage Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Tools Tried</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">{summary.tools_tried}</div>
          </div>

          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">Credits Used</span>
            </div>
            <div className="text-2xl font-bold text-green-900">{summary.credits_consumed}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Attempts:</span>
            <span className="font-medium">{summary.total_attempts}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Successful:</span>
            <span className="font-medium text-green-600">{summary.successful_attempts}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Blocked:</span>
            <span className="font-medium text-red-600">{summary.blocked_attempts}</span>
          </div>

          {summary.most_used_tool && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Most Used:</span>
              <span className="font-medium capitalize">
                {summary.most_used_tool.replace('_', ' ')}
              </span>
            </div>
          )}
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate('/my-ai-usage')}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          View Detailed Usage
        </Button>
      </CardContent>
    </Card>
  );
};
