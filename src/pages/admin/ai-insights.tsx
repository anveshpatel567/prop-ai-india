import React from 'react';
import { Brain } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { AiDebugViewerPanel } from '@/components/admin/AiDebugViewerPanel';
import { TrustFeedbackPanel } from '@/components/admin/TrustFeedbackPanel';
import { AiHealthDashboard } from '@/components/admin/AiHealthDashboard';
import { BiasDetectionPanel } from '@/components/admin/BiasDetectionPanel';
import { ToxicityFlagQueuePanel } from '@/components/admin/ToxicityFlagQueuePanel';
import { PromptDriftTrackerPanel } from '@/components/admin/PromptDriftTrackerPanel';
import { AiFeatureHeatmapPanel } from '@/components/admin/AiFeatureHeatmapPanel';
import { AiFailureLogsPanel } from '@/components/admin/AiFailureLogsPanel';
import { AiAuditTrailPanel } from '@/components/admin/AiAuditTrailPanel';
import { ToxicityDetectionPanel } from '@/components/admin/ToxicityDetectionPanel';
import { DriftDetectionPanel } from '@/components/admin/DriftDetectionPanel';
import { RestrictedInputLogsPanel } from '@/components/admin/RestrictedInputLogsPanel';
import { ManualReviewFlagPanel } from '@/components/admin/ManualReviewFlagPanel';
import { AiRuleManagerPanel } from '@/components/admin/AiRuleManagerPanel';
import { AiRuleViolationsPanel } from '@/components/admin/AiRuleViolationsPanel';
import { ModelFreezePanel } from '@/components/admin/ModelFreezePanel';
import { RetrainTriggerPanel } from '@/components/admin/RetrainTriggerPanel';
import { HallucinationRiskPanel } from '@/components/admin/HallucinationRiskPanel';
import { AnomalyLogPanel } from '@/components/admin/AnomalyLogPanel';
import { AgentBehaviorLogPanel } from '@/components/admin/AgentBehaviorLogPanel';
import { BehaviorChangeRequestPanel } from '@/components/admin/BehaviorChangeRequestPanel';

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BiasDetectionPanel />
            <ToxicityFlagQueuePanel />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <PromptDriftTrackerPanel />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AiFeatureHeatmapPanel />
            <AiFailureLogsPanel />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ToxicityDetectionPanel />
            <DriftDetectionPanel />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RestrictedInputLogsPanel />
            <ManualReviewFlagPanel />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AiRuleManagerPanel />
            <AiRuleViolationsPanel />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ModelFreezePanel />
            <RetrainTriggerPanel />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HallucinationRiskPanel />
            <AnomalyLogPanel />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AgentBehaviorLogPanel />
            <BehaviorChangeRequestPanel />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <AiAuditTrailPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
