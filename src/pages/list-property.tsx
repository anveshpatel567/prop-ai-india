
import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/layout/GlassCard';
import { GlowButton } from '../components/common/GlowButton';
import { ListingForm } from '../components/forms/ListingForm';
import { ImprovedListingForm } from '../components/forms/ImprovedListingForm';
import { FileUpload } from 'lucide-react';

const ListProperty: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'manual' | 'ai'>('manual');

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Rajdhani']">List Your Property</h1>
          <p className="text-gray-600 font-['DM_Sans']">Choose manual entry or let AI parse your brochure</p>
        </div>

        {/* Toggle Switch */}
        <GlassCard className="mb-8">
          <div className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="glass-card rounded-lg p-1 inline-flex">
                <button
                  onClick={() => setActiveMode('manual')}
                  className={`px-6 py-3 rounded-md font-medium font-['Rajdhani'] transition-all duration-300 ${
                    activeMode === 'manual'
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  ✍️ Manual Entry
                </button>
                <button
                  onClick={() => setActiveMode('ai')}
                  className={`px-6 py-3 rounded-md font-medium font-['Rajdhani'] transition-all duration-300 ${
                    activeMode === 'ai'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  🤖 Upload Brochure (AI)
                </button>
              </div>
            </div>

            <div className="text-center mb-6">
              {activeMode === 'manual' ? (
                <div>
                  <h3 className="text-lg font-semibold mb-2 font-['Rajdhani']">Manual Property Entry</h3>
                  <p className="text-gray-600 font-['DM_Sans']">Fill out the form manually with your property details</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold mb-2 font-['Rajdhani']">AI-Powered Brochure Parser</h3>
                  <p className="text-gray-600 font-['DM_Sans']">Upload your property brochure and let AI extract the details (10 credits)</p>
                </div>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Content based on active mode */}
        <GlassCard>
          {activeMode === 'manual' ? (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 font-['Rajdhani']">Property Details</h2>
              <ListingForm />
            </div>
          ) : (
            <div className="p-6">
              <ImprovedListingForm />
            </div>
          )}
        </GlassCard>
      </div>
      <Footer />
    </div>
  );
};

export default ListProperty;
