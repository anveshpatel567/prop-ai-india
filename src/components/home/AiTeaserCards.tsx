
import React from 'react';

export const AiTeaserCards: React.FC = () => {
  console.log('AiTeaserCards rendering...');

  const handleCardClick = (path: string) => {
    window.location.href = path;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-[#fff7f0] to-[#ffe4d6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#2d0000] mb-4">
            AI-Powered Real Estate Tools
          </h2>
          <p className="text-lg text-[#8b4513] max-w-3xl mx-auto">
            Experience the future of property management with our cutting-edge AI tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            onClick={() => handleCardClick('/ai')}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-[0_0_30px_rgba(255,102,0,0.25)] border border-[#ff4500]/20 hover:shadow-[0_0_40px_rgba(255,102,0,0.4)] transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-2xl">
              🧠
            </div>
            <h3 className="text-xl font-semibold mb-4 text-[#2d0000] text-center">AI Search</h3>
            <p className="text-[#8b4513] text-center mb-4">
              Find properties using natural language queries powered by advanced AI
            </p>
            <div className="bg-[#ff4500]/10 rounded-lg p-3 text-center">
              <span className="text-[#ff4500] font-semibold">10 credits per search</span>
            </div>
          </div>

          <div 
            onClick={() => handleCardClick('/tools/ai-pricing')}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-[0_0_30px_rgba(255,102,0,0.25)] border border-[#ff4500]/20 hover:shadow-[0_0_40px_rgba(255,102,0,0.4)] transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-2xl">
              💰
            </div>
            <h3 className="text-xl font-semibold mb-4 text-[#2d0000] text-center">Smart Pricing</h3>
            <p className="text-[#8b4513] text-center mb-4">
              Get AI-powered pricing suggestions based on market data and trends
            </p>
            <div className="bg-[#ff4500]/10 rounded-lg p-3 text-center">
              <span className="text-[#ff4500] font-semibold">25 credits per analysis</span>
            </div>
          </div>

          <div 
            onClick={() => handleCardClick('/tools/ai-video')}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-[0_0_30px_rgba(255,102,0,0.25)] border border-[#ff4500]/20 hover:shadow-[0_0_40px_rgba(255,102,0,0.4)] transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-2xl">
              🎬
            </div>
            <h3 className="text-xl font-semibold mb-4 text-[#2d0000] text-center">Video Generator</h3>
            <p className="text-[#8b4513] text-center mb-4">
              Create stunning property videos automatically from photos and details
            </p>
            <div className="bg-[#ff4500]/10 rounded-lg p-3 text-center">
              <span className="text-[#ff4500] font-semibold">100 credits per video</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
