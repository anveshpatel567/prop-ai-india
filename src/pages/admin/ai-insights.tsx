
import React from 'react';
import { Brain } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { AiDebugViewerPanel } from '@/components/admin/AiDebugViewerPanel';
import { TrustFeedbackPanel } from '@/components/admin/TrustFeedbackPanel';
import { AiHealthDashboard } from '@/components/admin/AiHealthDashboard';

export default function AiInsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Brain className="h-6 w-6" />
          <h1 className="text-3xl font-bold">AI Insights & Oversight</h1>
        </div>

        <div className="space-y-8">
          <AiHealthDashboard />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AiDebugViewerPanel />
            <TrustFeedbackPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
