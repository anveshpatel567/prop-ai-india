import React from 'react';
import { Shield, Users, CreditCard, BarChart, Zap, Lightbulb } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
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

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold">User Management</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Manage users, verify RERA credentials, and handle user permissions.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="/admin/users"
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition"
              >
                Manage Users
              </a>
              <a
                href="/admin/rera-verification"
                className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition"
              >
                RERA Verification
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-purple-500" />
              <h2 className="text-xl font-semibold">Credit Management</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Manage credit packs, approve payment receipts, and monitor credit usage.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="/admin/credit-packs"
                className="px-4 py-2 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition"
              >
                Credit Packs
              </a>
              <a
                href="/admin/payment-receipts"
                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition"
              >
                Payment Receipts
              </a>
            </div>
          </div>
        </div>

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
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-cyan-500" />
              <h2 className="text-xl font-semibold">Developer AI Summary</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Get a comprehensive overview of AI system performance, usage patterns, and technical metrics.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="/admin/developer-ai-summary"
                className="px-4 py-2 bg-cyan-50 text-cyan-700 rounded-md hover:bg-cyan-100 transition"
              >
                View Summary
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
