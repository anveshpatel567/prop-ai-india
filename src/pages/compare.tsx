
import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/layout/GlassCard';

const Compare: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] to-[#ffe4d6]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2d0000] mb-2 font-rajdhani">Compare Properties</h1>
          <p className="text-[#8b4513] font-dmsans">Compare up to 5 properties side by side</p>
        </div>

        <GlassCard>
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              CP
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-[#2d0000] font-rajdhani">Property Comparison Tool</h2>
            <p className="text-[#8b4513] mb-8 font-dmsans">
              Add properties to your comparison board from search results or saved properties.
            </p>
            <div className="max-w-md mx-auto">
              <GlassCard>
                <div className="p-4">
                  <h3 className="font-medium mb-2 text-[#2d0000] font-rajdhani">Comparison Features</h3>
                  <ul className="text-sm text-[#8b4513] space-y-1 font-dmsans">
                    <li>• Side-by-side property details</li>
                    <li>• Price and area comparison</li>
                    <li>• Location advantages</li>
                    <li>• AI-generated insights</li>
                  </ul>
                </div>
              </GlassCard>
            </div>
          </div>
        </GlassCard>
      </div>
      <Footer />
    </div>
  );
};

export default Compare;
