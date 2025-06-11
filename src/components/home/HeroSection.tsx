
import React from 'react';

export const HeroSection: React.FC = () => {
  console.log('HeroSection rendering...');

  const handleGetStarted = () => {
    window.location.href = '/search';
  };

  const handleListProperty = () => {
    window.location.href = '/list-property';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7f0] to-[#ffe4d6] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span className="block text-[#2d0000] mb-2">India's Most</span>
          <span className="block bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] bg-clip-text text-transparent">
            Intelligent
          </span>
          <span className="block text-[#2d0000]">Property Platform</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-[#8b4513] mb-8 max-w-3xl mx-auto leading-relaxed">
          Discover properties with AI-powered search, fraud detection, pricing optimization and more. 
          Experience the future of real estate with verified listings and smart matching.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={handleGetStarted}
            className="w-full sm:w-auto bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-[#fff7f0] font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 ease-in-out transform hover:scale-105 min-h-[56px]"
          >
            🔍 Start AI Search
          </button>
          
          <button
            onClick={handleListProperty}
            className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-[#ff4500] font-bold py-4 px-8 rounded-xl border-2 border-[#ff4500] hover:bg-[#ff4500] hover:text-white transition-all duration-300 ease-in-out min-h-[56px]"
          >
            🏠 List Your Property
          </button>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_30px_rgba(255,102,0,0.25)] border border-[#ff4500]/20">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-xl">
              🤖
            </div>
            <h3 className="font-semibold mb-2 text-[#2d0000]">AI-Powered</h3>
            <p className="text-sm text-[#8b4513]">Smart search and matching</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_30px_rgba(255,102,0,0.25)] border border-[#ff4500]/20">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-xl">
              🛡️
            </div>
            <h3 className="font-semibold mb-2 text-[#2d0000]">Fraud Detection</h3>
            <p className="text-sm text-[#8b4513]">Verified listings only</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_30px_rgba(255,102,0,0.25)] border border-[#ff4500]/20">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-xl">
              💰
            </div>
            <h3 className="font-semibold mb-2 text-[#2d0000]">Smart Pricing</h3>
            <p className="text-sm text-[#8b4513]">AI pricing optimization</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_30px_rgba(255,102,0,0.25)] border border-[#ff4500]/20">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-xl">
              ⚡
            </div>
            <h3 className="font-semibold mb-2 text-[#2d0000]">Fast Matching</h3>
            <p className="text-sm text-[#8b4513]">Instant property matches</p>
          </div>
        </div>
      </div>
    </section>
  );
};
