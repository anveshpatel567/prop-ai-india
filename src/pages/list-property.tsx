
import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/layout/GlassCard';
import { EnhancedListingForm } from '../components/listing/EnhancedListingForm';
import { ReraCarpetGuide } from '../components/listing/ReraCarpetGuide';
import { GoBackHomeButton } from '../components/ui/GoBackHomeButton';
import { MobileCardSpacing } from '../components/mobile/MobileCardSpacingFix';

const ListProperty: React.FC = () => {
  const [showReraGuide, setShowReraGuide] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">List Your Property</h1>
            <p className="text-sm sm:text-base text-gray-600">Create a comprehensive listing with AI-powered tools</p>
          </div>
          <div className="flex justify-center sm:justify-end">
            <GoBackHomeButton />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2">
            <GlassCard>
              <div className="p-4 sm:p-6">
                <EnhancedListingForm onReraToggle={setShowReraGuide} />
              </div>
            </GlassCard>
          </div>
          
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {showReraGuide && <ReraCarpetGuide />}
            
            <GlassCard>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">AI-Powered Listing Tips</h3>
                <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500 text-sm">✨</span>
                    <span>Use AI to enhance your property title and description</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500 text-sm">💰</span>
                    <span>Get AI pricing suggestions based on market data</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500 text-sm">🎥</span>
                    <span>Generate professional videos from your photos</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500 text-sm">📄</span>
                    <span>Upload brochures and let AI extract property details</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500 text-sm">🔍</span>
                    <span>Use quality enhancer to improve listing performance</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Credit Usage Guide</h3>
                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Title Enhancement:</span>
                    <span className="font-medium">5 credits</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Description Enhancement:</span>
                    <span className="font-medium">15 credits</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Pricing:</span>
                    <span className="font-medium">25 credits</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Brochure Parser:</span>
                    <span className="font-medium">50 credits</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Video Generation:</span>
                    <span className="font-medium">100 credits</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality Enhancer:</span>
                    <span className="font-medium">300 credits</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListProperty;
