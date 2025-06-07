
import React from 'react';
import { AdminToolsOverviewPanel } from '@/components/admin/AdminToolsOverviewPanel';
import { AdminCreditManagement } from '@/components/admin/AdminCreditManagement';

export default function AdminToolsOverviewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Tools Overview</h1>
          <p className="text-gray-600">
            Monitor and manage all AI-powered features and tools
          </p>
        </div>

        <AdminToolsOverviewPanel />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AdminCreditManagement />
          
          <div className="space-y-4">
            {/* Additional admin panels can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
}
