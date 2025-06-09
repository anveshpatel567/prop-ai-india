
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/layout/GlassCard';
import { AdminAiEngagementPanel } from '@/components/admin/AdminAiEngagementPanel';
import { GoBackHomeButton } from '@/components/ui/GoBackHomeButton';
import { MobileCardSpacing } from '@/components/mobile/MobileCardSpacingFix';

const AiEngagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">AI Engagement Analytics</h1>
            <p className="text-sm sm:text-base text-gray-600">Monitor AI tool usage patterns and performance metrics</p>
          </div>
          <div className="flex justify-center sm:justify-end">
            <GoBackHomeButton />
          </div>
        </div>

        <MobileCardSpacing>
          <GlassCard>
            <div className="p-4 sm:p-6">
              <AdminAiEngagementPanel />
            </div>
          </GlassCard>
        </MobileCardSpacing>
      </div>
      <Footer />
    </div>
  );
};

export default AiEngagement;
