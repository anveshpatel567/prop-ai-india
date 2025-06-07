import React from 'react';
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

export function AdminPanelsGrid(): JSX.Element {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AdminAnalyticsPanel />
        <DeveloperAiUsagePanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AiPerformanceEvaluationPanel />
        <AiFeatureAdoptionPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AiErrorLogsPanel />
        <AiAutoresponseFeedbackPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AiPromptTuningLogPanel />
        <AiVisibilityTrackingPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AiEdgeLogsPanel />
        <AiLearningFeedbackPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AiFailureEventsPanel />
        <AiAbuseLogsPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <UserTrustLogsPanel />
        <DeactivationLogsPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AiUsageAnomalyLogsPanel />
        <AiFeedbackTagLogsPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AiOutputQualityRatingsPanel />
        <LatencyIncidentPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PromptRegenLogsPanel />
        <HallucinationReviewPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AiInputTracePanel />
        <AiInfluencePanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ModelVersionTrackerPanel />
        <AiFeatureReviewPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <UserCorrectionReviewPanel />
        <ModeratorDecisionTrailPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AiPromptTaggingPanel />
        <AiModelDowntimePanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AiCooldownMonitorPanel />
        <AiToolAttributionPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AiSentimentReviewPanel />
        <AiUsageFrequencyPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PromptTemplateManager />
        <FlaggedPromptLogsPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AiBehaviorOverridePanel />
        <AdminDecisionLogPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ToxicityDetectionPanel />
        <DriftDetectionPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RestrictedInputLogsPanel />
        <ManualReviewFlagPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AiRuleManagerPanel />
        <AiRuleViolationsPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ModelFreezePanel />
        <RetrainTriggerPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <HallucinationRiskPanel />
        <AnomalyLogPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AgentBehaviorLogPanel />
        <BehaviorChangeRequestPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ShadowbanManagerPanel />
        <ThrottleZonePanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <FlaggedUserPanel />
        <UserRestorationPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <KillSwitchLogPanel />
        <ModuleHealthPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <FeatureSummaryPanel />
        <AdminNotesPanel />
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <DailySnapshotPanel />
      </div>
    </>
  );
}
