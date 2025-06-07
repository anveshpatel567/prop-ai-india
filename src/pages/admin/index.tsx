import React from 'react';
import { Shield, Users, CreditCard, BarChart, Zap, Lightbulb } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import AdminAnalyticsPanel from '@/components/admin/AdminAnalyticsPanel';
import DeveloperAiUsagePanel from '@/components/admin/DeveloperAiUsagePanel';
import AiPerformanceEvaluationPanel from '@/components/ai-tools/AiPerformanceEvaluationPanel';
import AiPromptTuningLogPanel from '@/components/admin/AiPromptTuningLogPanel';
import AiVisibilityTrackingPanel from '@/components/admin/AiVisibilityTrackingPanel';
import AiFeatureAdoptionPanel from '@/components/admin/AiFeatureAdoptionPanel';
import AiErrorLogsPanel from '@/components/admin/AiErrorLogsPanel';
import AiAutoresponseFeedbackPanel from '@/components/admin/AiAutoresponseFeedbackPanel';

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
          <AiPromptTuningLogPanel />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AiVisibilityTrackingPanel />
          <AiFeatureAdoptionPanel />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AiErrorLogsPanel />
          <AiAutoresponseFeedbackPanel />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <BarChart className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-semibold">Campaign Insights</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Monitor agent campaigns, analyze performance, and optimize strategies.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="/admin/campaign-insights"
                className="px-4 py-2 bg-orange-50 text-orange-700 rounded-md hover:bg-orange-100 transition"
              >
                View Insights
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-amber-500" />
              <h2 className="text-xl font-semibold">AI Tools Management</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Configure AI tools, manage feature flags, and monitor usage patterns.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="/admin/ai-tools"
                className="px-4 py-2 bg-amber-50 text-amber-700 rounded-md hover:bg-amber-100 transition"
              >
                Manage AI Tools
              </a>
              <a
                href="/admin/feature-flags"
                className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-md hover:bg-yellow-100 transition"
              >
                Feature Flags
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
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
  );
}
