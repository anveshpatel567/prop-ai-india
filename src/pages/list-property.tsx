
import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/layout/GlassCard';

const ListProperty: React.FC = () => {
  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">List Your Property</h1>
          <p className="text-gray-600">Choose manual entry or let AI parse your brochure</p>
        </div>

        <GlassCard>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏗️</div>
            <h2 className="text-2xl font-semibold mb-4">Property Listing Form</h2>
            <p className="text-gray-600 mb-8">
              This feature is under development. Manual and AI-assisted property listing will be available soon.
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="glass-card p-4">
                <h3 className="font-medium mb-2">Manual Entry</h3>
                <p className="text-sm text-gray-600">Free - Fill form manually</p>
              </div>
              <div className="glass-card p-4">
                <h3 className="font-medium mb-2">AI Brochure Parser</h3>
                <p className="text-sm text-gray-600">10 credits - Upload & auto-fill</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
      <Footer />
    </div>
  );
};

export default ListProperty;
