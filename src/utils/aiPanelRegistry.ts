
export const aiPanelRegistry = {
  logs: [
    'AiErrorLogsPanel',
    'AiFailureEventsPanel',
    'AiEdgeLogsPanel',
    'AiLearningFeedbackPanel',
    'AiAbuseLogsPanel',
    'UserTrustLogsPanel',
    'DeactivationLogsPanel',
    'AiUsageAnomalyLogsPanel',
    'AiFeedbackTagLogsPanel',
    'LatencyIncidentPanel',
    'PromptRegenLogsPanel',
    'HallucinationReviewPanel',
    'AiInputTracePanel',
    'AnomalyLogPanel',
    'AgentBehaviorLogPanel',
    'KillSwitchLogPanel',
    'DailySnapshotPanel'
  ],
  metrics: [
    'AiPerformanceEvaluationPanel',
    'AiFeatureAdoptionPanel',
    'AiOutputQualityRatingsPanel',
    'ModelVersionTrackerPanel',
    'AiModelDowntimePanel',
    'AiCooldownMonitorPanel',
    'AiToolAttributionPanel',
    'AiSentimentReviewPanel',
    'AiUsageFrequencyPanel',
    'ModuleHealthPanel',
    'FeatureSummaryPanel'
  ],
  decisions: [
    'AiPromptTuningLogPanel',
    'AiVisibilityTrackingPanel',
    'AiInfluencePanel',
    'AiFeatureReviewPanel',
    'UserCorrectionReviewPanel',
    'ModeratorDecisionTrailPanel',
    'AiPromptTaggingPanel',
    'AdminDecisionLogPanel',
    'ManualReviewFlagPanel',
    'AdminNotesPanel'
  ],
  interventions: [
    'AiBehaviorOverridePanel',
    'ToxicityDetectionPanel',
    'DriftDetectionPanel',
    'RestrictedInputLogsPanel',
    'AiRuleManagerPanel',
    'AiRuleViolationsPanel',
    'ModelFreezePanel',
    'RetrainTriggerPanel',
    'HallucinationRiskPanel',
    'BehaviorChangeRequestPanel',
    'ShadowbanManagerPanel',
    'ThrottleZonePanel',
    'FlaggedUserPanel',
    'UserRestorationPanel',
    'PromptTemplateManager',
    'FlaggedPromptLogsPanel'
  ]
};

export type PanelCategory = keyof typeof aiPanelRegistry;
