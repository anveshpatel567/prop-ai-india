
import React from 'react';
import UserAiCreditsSummary from '@/components/account/UserAiCreditsSummary';
import AiUsageHistory from '@/components/account/AiUsageHistory';

export default function AiUsagePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Usage Dashboard</h1>
          <p className="text-gray-600">Track your AI tool usage and credit consumption</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <UserAiCreditsSummary />
          </div>
        </div>

        <div className="space-y-6">
          <AiUsageHistory />
        </div>
      </div>
    </div>
  );
}
