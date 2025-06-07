
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreditLimits } from '@/hooks/useCreditLimits';
import { useAiCreditsUsedToday } from '@/hooks/useAiCreditsUsedToday';
import { AdminCreditUsageCard } from './AdminCreditUsageCard';
import { CreditCard } from 'lucide-react';

export function AdminAiCreditsPanel() {
  const { limits, loading: limitsLoading } = useCreditLimits();
  const { creditsUsed, loading: usageLoading } = useAiCreditsUsedToday();

  const loading = limitsLoading || usageLoading;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Credit Usage Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading credit data...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {limits.map((limit) => (
              <AdminCreditUsageCard
                key={limit.id}
                toolName={limit.tool_name}
                creditsUsed={creditsUsed[limit.tool_name] || 0}
                dailyLimit={limit.max_daily_credits}
                enforced={limit.enforced}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
