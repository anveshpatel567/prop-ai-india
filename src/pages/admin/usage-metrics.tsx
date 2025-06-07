
import React from 'react';
import { AdminUsageMetricsPanel } from '@/components/admin/AdminUsageMetricsPanel';

export default function AdminUsageMetricsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Usage Analytics</h1>
          <p className="text-gray-600">
            Monitor platform usage, user engagement, and AI tool performance
          </p>
        </div>

        <AdminUsageMetricsPanel />
      </div>
    </div>
  );
}
