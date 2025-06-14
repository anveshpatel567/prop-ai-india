
import React from 'react';
import { AdminAccessGate } from '@/components/admin/AccessGate';
import AdminToolsHeader from '@/components/admin/tools/AdminToolsHeader';
import AiToolFlagsPanel from '@/components/admin/tools/AiToolFlagsPanel';
import TotalAiCreditsUsed from '@/components/admin/widgets/TotalAiCreditsUsed';

export default function AdminAiToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminAccessGate>
        <div className="container mx-auto px-4 py-8">
          <AdminToolsHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <TotalAiCreditsUsed />
          </div>

          <div className="space-y-6">
            <AiToolFlagsPanel />
          </div>
        </div>
      </AdminAccessGate>
    </div>
  );
}
