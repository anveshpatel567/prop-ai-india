
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Building2, Zap, Shield } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const handleGetStarted = () => {
    window.location.href = '/search';
  };

  const handleListProperty = () => {
    window.location.href = '/list-property';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ff4500%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M30%2030c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zm10%200c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Top Tagline */}
        <div className="mb-6 animate-fade-in">
          <p className="text-sm sm:text-base font-medium text-orange-600 uppercase tracking-wider">
            India&apos;s 1st AI-driven real estate hub
          </p>
        </div>

        {/* Main Heading with Animation */}
        <div className="animate-slide-up">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-gray-900 mb-2">Find Your Perfect</span>
            <span className="block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              Property
            </span>
            <span className="block text-gray-900">with AI Power</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-delayed">
          Discover verified properties with AI-powered search, fraud detection, smart pricing, and instant matching. 
          Experience the future of real estate today.
        </p>

        {/* CTA Buttons with Hover Effects */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-delayed">
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_rgba(255,102,0,0.3)] hover:shadow-[0_0_40px_rgba(255,102,0,0.5)] transition-all duration-300 ease-in-out transform hover:scale-105 animate-pulse-glow"
          >
            <Search className="h-5 w-5 mr-2" />
            Start AI Search
          </Button>
          
          <Button
            onClick={handleListProperty}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-2 border-orange-500 text-orange-500 font-bold py-4 px-8 rounded-xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <Building2 className="h-5 w-5 mr-2" />
            List Your Property
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger-up">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-200">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900">AI-Powered</h3>
            <p className="text-sm text-gray-600">Smart search and instant matching</p>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-200">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900">Fraud Detection</h3>
            <p className="text-sm text-gray-600">Verified listings only</p>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-200">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xl">
              💰
            </div>
            <h3 className="font-semibold mb-2 text-gray-900">Smart Pricing</h3>
            <p className="text-sm text-gray-600">AI pricing optimization</p>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-200">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xl">
              ⚡
            </div>
            <h3 className="font-semibold mb-2 text-gray-900">Fast Matching</h3>
            <p className="text-sm text-gray-600">Instant property matches</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(255,102,0,0.3); }
          50% { box-shadow: 0 0 40px rgba(255,102,0,0.6); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-stagger-up {
          animation: slide-up 0.8s ease-out 0.4s both;
        }
      `}</style>
    </section>
  );
};
