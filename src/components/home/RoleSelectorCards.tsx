
import React from 'react';

export const RoleSelectorCards: React.FC = () => {
  console.log('RoleSelectorCards rendering...');

  const handleCardClick = (path: string) => {
    window.location.href = path;
  };

  return (
    <section className="py-16 bg-[#fff7f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#2d0000] mb-4">
            Choose Your Role
          </h2>
          <p className="text-lg text-[#8b4513] max-w-3xl mx-auto">
            Whether you're buying, selling, or working as an agent, we have the perfect tools for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            onClick={() => handleCardClick('/search')}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_30px_rgba(255,102,0,0.25)] border border-[#ff4500]/20 hover:shadow-[0_0_40px_rgba(255,102,0,0.4)] transition-all duration-300 cursor-pointer transform hover:scale-105 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-3xl">
              🏠
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-[#2d0000]">Property Seeker</h3>
            <p className="text-[#8b4513] mb-6">
              Find your dream property with AI-powered search and smart recommendations
            </p>
            <ul className="text-left text-[#8b4513] space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-[#ff4500] mr-2">✓</span>
                AI-powered property search
              </li>
              <li className="flex items-center">
                <span className="text-[#ff4500] mr-2">✓</span>
                Smart property matching
              </li>
              <li className="flex items-center">
                <span className="text-[#ff4500] mr-2">✓</span>
                Fraud detection & verification
              </li>
            </ul>
            <button className="w-full bg-gradient-to-r from-[#ff6a00] to-[#ff0000] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300">
              Start Searching
            </button>
          </div>

          <div 
            onClick={() => handleCardClick('/list-property')}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_30px_rgba(255,102,0,0.25)] border border-[#ff4500]/20 hover:shadow-[0_0_40px_rgba(255,102,0,0.4)] transition-all duration-300 cursor-pointer transform hover:scale-105 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-3xl">
              💼
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-[#2d0000]">Property Owner</h3>
            <p className="text-[#8b4513] mb-6">
              List and sell your property with AI assistance and smart pricing
            </p>
            <ul className="text-left text-[#8b4513] space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-[#ff4500] mr-2">✓</span>
                AI-powered listing optimization
              </li>
              <li className="flex items-center">
                <span className="text-[#ff4500] mr-2">✓</span>
                Smart pricing suggestions
              </li>
              <li className="flex items-center">
                <span className="text-[#ff4500] mr-2">✓</span>
                Automated video generation
              </li>
            </ul>
            <button className="w-full bg-gradient-to-r from-[#ff6a00] to-[#ff0000] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300">
              List Property
            </button>
          </div>

          <div 
            onClick={() => handleCardClick('/agent/dashboard')}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_30px_rgba(255,102,0,0.25)] border border-[#ff4500]/20 hover:shadow-[0_0_40px_rgba(255,102,0,0.4)] transition-all duration-300 cursor-pointer transform hover:scale-105 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-3xl">
              🤝
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-[#2d0000]">Real Estate Agent</h3>
            <p className="text-[#8b4513] mb-6">
              Manage multiple properties and clients with AI-powered tools
            </p>
            <ul className="text-left text-[#8b4513] space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-[#ff4500] mr-2">✓</span>
                Lead scoring & management
              </li>
              <li className="flex items-center">
                <span className="text-[#ff4500] mr-2">✓</span>
                AI resume builder
              </li>
              <li className="flex items-center">
                <span className="text-[#ff4500] mr-2">✓</span>
                Automated client responses
              </li>
            </ul>
            <button className="w-full bg-gradient-to-r from-[#ff6a00] to-[#ff0000] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300">
              Agent Dashboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
