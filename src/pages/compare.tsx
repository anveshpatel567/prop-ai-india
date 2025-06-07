
import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/layout/GlassCard';

const Compare: React.FC = () => {
  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Compare Properties</h1>
          <p className="text-gray-600">Compare up to 5 properties side by side</p>
        </div>

        <GlassCard>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-semibold mb-4">Property Comparison Tool</h2>
            <p className="text-gray-600 mb-8">
              Add properties to your comparison board from search results or saved properties.
            </p>
            <div className="max-w-md mx-auto">
              <div className="glass-card p-4">
                <h3 className="font-medium mb-2">Comparison Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Side-by-side property details</li>
                  <li>• Price and area comparison</li>
                  <li>• Location advantages</li>
                  <li>• AI-generated insights</li>
                </ul>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
      <Footer />
    </div>
  );
};

export default Compare;
