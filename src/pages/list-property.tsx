
import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/layout/GlassCard';
import { ImprovedListingForm } from '../components/forms/ImprovedListingForm';
import { GoBackHomeButton } from '../components/ui/GoBackHomeButton';

const ListProperty: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">List Your Property</h1>
            <p className="text-gray-600">Create a comprehensive listing for your property</p>
          </div>
          <GoBackHomeButton />
        </div>

        <GlassCard>
          <div className="p-6">
            <ImprovedListingForm />
          </div>
        </GlassCard>
      </div>
      <Footer />
    </div>
  );
};

export default ListProperty;
