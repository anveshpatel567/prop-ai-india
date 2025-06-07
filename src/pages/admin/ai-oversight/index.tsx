
import React, { useState } from 'react';
import { AdminRoleGate } from '@/components/admin/AdminRoleGate';
import { AdminAiPanelLayout } from '@/components/admin/AdminAiPanelLayout';
import { AdminAiSummaryCards } from '@/components/admin/AdminAiSummaryCards';
import { AiOversightSectionGroup } from '@/components/admin/AiOversightSectionGroup';
import { AiPanelSearch } from '@/components/admin/AiPanelSearch';
import { AdminAiControlPanel } from '@/components/admin/AdminAiControlPanel';
import { aiPanelRegistry } from '@/utils/aiPanelRegistry';

// Import all panels with lazy loading for heavy ones
import AdminAnalyticsPanel from '@/components/admin/AdminAnalyticsPanel';
import DeveloperAiUsagePanel from '@/components/admin/DeveloperAiUsagePanel';
import AiPerformanceEvaluationPanel from '@/components/ai-tools/AiPerformanceEvaluationPanel';
import AiFeatureAdoptionPanel from '@/components/admin/AiFeatureAdoptionPanel';
import AiErrorLogsPanel from '@/components/admin/AiErrorLogsPanel';
import AiAutoresponseFeedbackPanel from '@/components/admin/AiAutoresponseFeedbackPanel';
import { AiPromptTuningLogPanel } from '@/components/admin/AiPromptTuningLogPanel';
import { AiVisibilityTrackingPanel } from '@/components/admin/AiVisibilityTrackingPanel';
import AiEdgeLogsPanel from '@/components/admin/AiEdgeLogsPanel';
import AiLearningFeedbackPanel from '@/components/admin/AiLearningFeedbackPanel';
import AiFailureEventsPanel from '@/components/admin/AiFailureEventsPanel';
import { AiAbuseLogsPanel } from '@/components/admin/AiAbuseLogsPanel';
import { UserTrustLogsPanel } from '@/components/admin/UserTrustLogsPanel';
import { DeactivationLogsPanel } from '@/components/admin/DeactivationLogsPanel';
import { AiUsageAnomalyLogsPanel } from '@/components/admin/AiUsageAnomalyLogsPanel';
import { AiFeedbackTagLogsPanel } from '@/components/admin/AiFeedbackTagLogsPanel';
import { AiOutputQualityRatingsPanel } from '@/components/admin/AiOutputQualityRatingsPanel';
import { LatencyIncidentPanel } from '@/components/admin/LatencyIncidentPanel';
import { PromptRegenLogsPanel } from '@/components/admin/PromptRegenLogsPanel';
import { HallucinationReviewPanel } from '@/components/admin/HallucinationReviewPanel';
import { AiInputTracePanel } from '@/components/admin/AiInputTracePanel';
import { AiInfluencePanel } from '@/components/admin/AiInfluencePanel';
import { ModelVersionTrackerPanel } from '@/components/admin/ModelVersionTrackerPanel';
import { AiFeatureReviewPanel } from '@/components/admin/AiFeatureReviewPanel';
import { UserCorrectionReviewPanel } from '@/components/admin/UserCorrectionReviewPanel';
import { ModeratorDecisionTrailPanel } from '@/components/admin/ModeratorDecisionTrailPanel';
import { AiPromptTaggingPanel } from '@/components/admin/AiPromptTaggingPanel';
import { AiModelDowntimePanel } from '@/components/admin/AiModelDowntimePanel';
import { AiCooldownMonitorPanel } from '@/components/admin/AiCooldownMonitorPanel';
import { AiToolAttributionPanel } from '@/components/admin/AiToolAttributionPanel';
import { AiSentimentReviewPanel } from '@/components/admin/AiSentimentReviewPanel';
import { AiUsageFrequencyPanel } from '@/components/admin/AiUsageFrequencyPanel';
import { PromptTemplateManager } from '@/components/admin/PromptTemplateManager';
import { FlaggedPromptLogsPanel } from '@/components/admin/FlaggedPromptLogsPanel';
import { AiBehaviorOverridePanel } from '@/components/admin/AiBehaviorOverridePanel';
import { AdminDecisionLogPanel } from '@/components/admin/AdminDecisionLogPanel';
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
import { ShadowbanManagerPanel } from '@/components/admin/ShadowbanManagerPanel';
import { ThrottleZonePanel } from '@/components/admin/ThrottleZonePanel';
import { FlaggedUserPanel } from '@/components/admin/FlaggedUserPanel';
import { UserRestorationPanel } from '@/components/admin/UserRestorationPanel';
import { KillSwitchLogPanel } from '@/components/admin/KillSwitchLogPanel';
import { ModuleHealthPanel } from '@/components/admin/ModuleHealthPanel';
import { FeatureSummaryPanel } from '@/components/admin/FeatureSummaryPanel';
import { AdminNotesPanel } from '@/components/admin/AdminNotesPanel';
import { DailySnapshotPanel } from '@/components/admin/DailySnapshotPanel';

import { FileText, Activity, Shield, Settings, AlertTriangle, BarChart3, Users, Cog } from 'lucide-react';

export default function AiOversightPage() {
  const [filteredPanels, setFilteredPanels] = useState<string[]>([]);
  const allPanels = Object.values(aiPanelRegistry).flat();

  const visiblePanels = filteredPanels.length > 0 ? filteredPanels : allPanels;

  const shouldShowPanel = (panelName: string) => {
    return visiblePanels.includes(panelName);
  };

  return (
    <AdminRoleGate>
      <AdminAiPanelLayout>
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">AI Oversight Control Hub</h1>
                <p className="text-muted-foreground">
                  Comprehensive monitoring and control of all AI systems
                </p>
              </div>
              <AiPanelSearch 
                onFilterChange={setFilteredPanels}
                allPanels={allPanels}
              />
            </div>
            
            <AdminAiSummaryCards />
          </div>

          {/* AI Control Panel Section */}
          <AiOversightSectionGroup
            title="⚙️ AI System Control"
            icon={Settings}
            description="Manage AI tools, credit limits, and system alerts"
          >
            <div className="col-span-full">
              <AdminAiControlPanel />
            </div>
          </AiOversightSectionGroup>

          {/* System Logs Section */}
          <AiOversightSectionGroup
            title="🧠 System Logs"
            icon={FileText}
            description="AI system activity and error tracking"
          >
            {shouldShowPanel('AiErrorLogsPanel') && <AiErrorLogsPanel />}
            {shouldShowPanel('AiFailureEventsPanel') && <AiFailureEventsPanel />}
            {shouldShowPanel('AiEdgeLogsPanel') && <AiEdgeLogsPanel />}
            {shouldShowPanel('AiLearningFeedbackPanel') && <AiLearningFeedbackPanel />}
            {shouldShowPanel('AiInputTracePanel') && <AiInputTracePanel />}
            {shouldShowPanel('LatencyIncidentPanel') && <LatencyIncidentPanel />}
          </AiOversightSectionGroup>

          {/* Performance Metrics Section */}
          <AiOversightSectionGroup
            title="📊 Performance Metrics"
            icon={BarChart3}
            description="System performance and usage analytics"
          >
            {shouldShowPanel('ModuleHealthPanel') && <ModuleHealthPanel />}
            {shouldShowPanel('FeatureSummaryPanel') && <FeatureSummaryPanel />}
            <AiPerformanceEvaluationPanel />
            <AiFeatureAdoptionPanel />
            {shouldShowPanel('AiOutputQualityRatingsPanel') && <AiOutputQualityRatingsPanel />}
            {shouldShowPanel('AiUsageFrequencyPanel') && <AiUsageFrequencyPanel />}
          </AiOversightSectionGroup>

          {/* User Safety & Moderation Section */}
          <AiOversightSectionGroup
            title="🛑 Safety & Moderation"
            icon={Shield}
            description="User protection and content moderation"
          >
            {shouldShowPanel('ShadowbanManagerPanel') && <ShadowbanManagerPanel />}
            {shouldShowPanel('ThrottleZonePanel') && <ThrottleZonePanel />}
            {shouldShowPanel('FlaggedUserPanel') && <FlaggedUserPanel />}
            {shouldShowPanel('ToxicityDetectionPanel') && <ToxicityDetectionPanel />}
            {shouldShowPanel('HallucinationRiskPanel') && <HallucinationRiskPanel />}
            {shouldShowPanel('RestrictedInputLogsPanel') && <RestrictedInputLogsPanel />}
          </AiOversightSectionGroup>

          {/* System Control & Rules Section */}
          <AiOversightSectionGroup
            title="⚙️ System Control"
            icon={Settings}
            description="AI behavior rules and interventions"
          >
            {shouldShowPanel('KillSwitchLogPanel') && <KillSwitchLogPanel />}
            {shouldShowPanel('AiRuleManagerPanel') && <AiRuleManagerPanel />}
            {shouldShowPanel('AiRuleViolationsPanel') && <AiRuleViolationsPanel />}
            {shouldShowPanel('ModelFreezePanel') && <ModelFreezePanel />}
            {shouldShowPanel('RetrainTriggerPanel') && <RetrainTriggerPanel />}
            {shouldShowPanel('AiBehaviorOverridePanel') && <AiBehaviorOverridePanel />}
          </AiOversightSectionGroup>

          {/* Administrative Tools Section */}
          <AiOversightSectionGroup
            title="🔧 Administrative Tools"
            icon={Cog}
            description="Admin decision tracking and notes"
          >
            {shouldShowPanel('AdminNotesPanel') && <AdminNotesPanel />}
            {shouldShowPanel('AdminDecisionLogPanel') && <AdminDecisionLogPanel />}
            {shouldShowPanel('ManualReviewFlagPanel') && <ManualReviewFlagPanel />}
            {shouldShowPanel('UserRestorationPanel') && <UserRestorationPanel />}
            {shouldShowPanel('PromptTemplateManager') && <PromptTemplateManager />}
            {shouldShowPanel('DailySnapshotPanel') && <DailySnapshotPanel />}
          </AiOversightSectionGroup>
        </div>
      </AdminAiPanelLayout>
    </AdminRoleGate>
  );
}
