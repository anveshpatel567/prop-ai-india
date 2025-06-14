
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAiCreditLogs } from '@/hooks/useAiCreditLogs';
import { useAuth } from '@/hooks/useAuth';
import { CreditCard } from 'lucide-react';

export default function UserAiCreditsSummary() {
  const { user } = useAuth();
  const userId = user?.id || '';
  const { logs, loading } = useAiCreditLogs(userId);

  const totalCreditsUsed = logs.reduce((sum, log) => sum + log.credits_used, 0);
  const uniqueToolsUsed = new Set(logs.map(log => log.tool_name)).size;

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          AI Usage Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalCreditsUsed}</div>
            <div className="text-sm text-gray-500">Credits Used</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{uniqueToolsUsed}</div>
            <div className="text-sm text-gray-500">Tools Used</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
