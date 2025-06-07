
import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { GlassCard } from '../../components/layout/GlassCard';
import { useAuth } from '../../context/AuthContext';
import AdminButtonControlsPanel from '../../components/admin/AdminButtonControlsPanel';
import RecommendationOverridePanel from '../../components/ai-tools/RecommendationOverridePanel';
import PricingFeedbackPanel from '../../components/ai-tools/PricingFeedbackPanel';
import MarketPressurePanel from '../../components/ai-tools/MarketPressurePanel';
import AiPromptTuningLogPanel from '../../components/ai-tools/AiPromptTuningLogPanel';
import AiVisibilityTrackingPanel from '../../components/ai-tools/AiVisibilityTrackingPanel';
import AiPerformanceEvaluationPanel from '../../components/ai-tools/AiPerformanceEvaluationPanel';

const Admin: React.FC = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen warm-gradient">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <GlassCard>
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
              <p className="text-gray-600">You do not have permission to access the admin panel.</p>
            </div>
          </GlassCard>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, payments, and AI tool configurations</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GlassCard className="text-center">
            <div className="text-2xl font-bold text-blue-600">1,250</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </GlassCard>
          <GlassCard className="text-center">
            <div className="text-2xl font-bold text-green-600">850</div>
            <div className="text-sm text-gray-600">Active Listings</div>
          </GlassCard>
          <GlassCard className="text-center">
            <div className="text-2xl font-bold text-orange-600">25,000</div>
            <div className="text-sm text-gray-600">AI Tool Uses</div>
          </GlassCard>
          <GlassCard className="text-center">
            <div className="text-2xl font-bold text-purple-600">₹2.5L</div>
            <div className="text-sm text-gray-600">Revenue</div>
          </GlassCard>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <GlassCard>
            <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                <div>
                  <div className="font-medium">Payment Verification</div>
                  <div className="text-sm text-gray-600">₹5,000 - John Doe</div>
                </div>
                <div className="space-x-2">
                  <button className="text-green-600 text-sm">Approve</button>
                  <button className="text-red-600 text-sm">Reject</button>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                <div>
                  <div className="font-medium">RERA Verification</div>
                  <div className="text-sm text-gray-600">RERA123456 - Agent Name</div>
                </div>
                <div className="space-x-2">
                  <button className="text-green-600 text-sm">Approve</button>
                  <button className="text-red-600 text-sm">Reject</button>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold mb-4">AI Tool Controls</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Brochure Parser</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">10 credits</span>
                  <button className="text-green-600 text-sm">Enabled</button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Smart Search</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">8 credits</span>
                  <button className="text-green-600 text-sm">Enabled</button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Video Generator</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">20 credits</span>
                  <button className="text-red-600 text-sm">Disabled</button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Button Controls Panel */}
        <AdminButtonControlsPanel />

        {/* AI Analytics Panels - Batches 28-30 */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <RecommendationOverridePanel />
          <PricingFeedbackPanel />
          <MarketPressurePanel />
        </div>

        {/* AI Visibility & Performance Panels - Batches 31-33 */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <AiPromptTuningLogPanel />
          <AiVisibilityTrackingPanel />
          <AiPerformanceEvaluationPanel />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
