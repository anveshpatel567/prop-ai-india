
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingFormWizard } from '@/components/listing/ListingFormWizard';

const CreateListing: React.FC = () => {
  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Property Listing</h1>
          <p className="text-gray-600">List your property with our step-by-step wizard and AI-powered tools</p>
        </div>

        <ListingFormWizard />
      </div>
      <Footer />
    </div>
  );
};

export default CreateListing;
