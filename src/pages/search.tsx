
import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/layout/GlassCard';

const Search: React.FC = () => {
  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Property Search</h1>
          <p className="text-gray-600">Find your perfect property with manual filters or AI search</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <GlassCard>
            <h2 className="text-xl font-semibold mb-4">Manual Search (Free)</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <select className="px-4 py-2 border rounded-lg">
                  <option>Select City</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Bangalore</option>
                </select>
                <select className="px-4 py-2 border rounded-lg">
                  <option>Property Type</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Min Price" className="px-4 py-2 border rounded-lg" />
                <input type="number" placeholder="Max Price" className="px-4 py-2 border rounded-lg" />
              </div>
              <button className="w-full fire-gradient text-white py-3 rounded-lg">
                Search Properties
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold mb-4">AI Smart Search (8 Credits)</h2>
            <div className="space-y-4">
              <textarea
                placeholder="Describe what you're looking for... e.g., '3BHK apartment near metro station in Mumbai under 2 crores'"
                className="w-full px-4 py-3 border rounded-lg h-32 resize-none"
              ></textarea>
              <button className="w-full fire-gradient text-white py-3 rounded-lg">
                Search with AI
              </button>
              <div className="text-sm text-gray-600 text-center">
                AI will understand your requirements and find matching properties
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sample Search Results</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <GlassCard key={i}>
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 rounded-lg mb-4"></div>
                <h3 className="font-semibold mb-2">Luxury 3BHK in Bandra West</h3>
                <p className="text-sm text-gray-600 mb-2">1200 sqft • Ready to move</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-orange-600">₹2.5 Cr</span>
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">92% Match</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
