
import React from 'react';
import { UserAiToolUsagePanel } from '@/components/user/UserAiToolUsagePanel';
import { AiUsageSummaryCard } from '@/components/user/AiUsageSummaryCard';

export default function MyAiUsagePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My AI Tool Usage</h1>
          <p className="text-gray-600">
            View your AI tool usage history and analytics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AiUsageSummaryCard />
          </div>
          
          <div className="lg:col-span-2">
            <UserAiToolUsagePanel />
          </div>
        </div>
      </div>
    </div>
  );
}
