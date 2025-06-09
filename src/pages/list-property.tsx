
import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/layout/GlassCard';
import { ImprovedListingForm } from '../components/forms/ImprovedListingForm';
import { ReraCarpetGuide } from '../components/listing/ReraCarpetGuide';
import { GoBackHomeButton } from '../components/ui/GoBackHomeButton';

const ListProperty: React.FC = () => {
  const [showReraGuide, setShowReraGuide] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">List Your Property</h1>
            <p className="text-gray-600">Create a comprehensive listing for your property</p>
          </div>
          <GoBackHomeButton />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassCard>
              <div className="p-6">
                <ImprovedListingForm onReraToggle={setShowReraGuide} />
              </div>
            </GlassCard>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            {showReraGuide && <ReraCarpetGuide />}
            
            <GlassCard>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Listing Tips</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500">•</span>
                    <span>Add high-quality photos to get 3x more inquiries</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500">•</span>
                    <span>Include detailed property description</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500">•</span>
                    <span>Mention nearby landmarks and amenities</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500">•</span>
                    <span>Set competitive pricing based on market rates</span>
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
