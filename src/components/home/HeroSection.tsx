
import React from 'react';
import { Link } from 'react-router-dom';
import { AiFeatureCard } from './AiFeatureCard';

export const HeroSection: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="section-hero py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="heading-primary">
                  India's Most
                  <span className="block bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] bg-clip-text text-transparent">
                    Intelligent
                  </span>
                  Property Platform
                </h1>
                
                <p className="text-lg text-[#8b4513] max-w-xl font-dmsans">
                  Powered by advanced AI algorithms, we revolutionize real estate discovery 
                  with smart matching, fraud detection, and predictive analytics for Indian markets.
                </p>
              </div>

              {/* Verified stats */}
              <div className="grid grid-cols-3 gap-6 py-6">
                <div className="text-center">
                  <div className="text-3xl font-orbitron font-bold text-[#ff4500]">
                    1M+
                  </div>
                  <div className="text-sm font-rajdhani text-[#8b4513]">Verified Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-orbitron font-bold text-[#ff4500]">
                    50K+
                  </div>
                  <div className="text-sm font-rajdhani text-[#8b4513]">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-orbitron font-bold text-[#ff4500]">
                    99.9%
                  </div>
                  <div className="text-sm font-rajdhani text-[#8b4513]">AI Accuracy</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/search">
                  <button className="w-full sm:w-auto bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 transform hover:scale-105 font-rajdhani">
                    Explore Listings with AI
                  </button>
                </Link>
                
                <Link to="/list-property">
                  <button className="w-full sm:w-auto bg-[#fff7f0] border-2 border-[#ff4500] text-[#ff4500] font-bold py-4 px-8 rounded-xl hover:bg-gradient-to-r hover:from-[#ff6a00] hover:to-[#ff0000] hover:text-white transition-all duration-300 font-rajdhani">
                    List Your Property
                  </button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-gradient-to-r from-[#ff6a00] to-[#ff0000] text-white px-3 py-1 text-sm rounded-full font-rajdhani font-medium">
                    RERA Verified
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[#8b4513] text-sm font-rajdhani">AI-Powered Analytics</span>
                </div>
              </div>
            </div>

            {/* Right Content - AI Dashboard Mock */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(255,102,0,0.45)]">
                
                {/* AI Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-orbitron text-xl font-bold text-[#2d0000]">AI Analytics Dashboard</h3>
                  <div className="w-3 h-3 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full animate-pulse"></div>
                </div>

                {/* Mock AI metrics */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                    <span className="font-rajdhani text-[#8b4513]">Market Analysis</span>
                    <span className="text-[#ff4500] font-orbitron font-bold">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                    <span className="font-rajdhani text-[#8b4513]">Price Prediction</span>
                    <span className="text-[#ff4500] font-orbitron font-bold">₹47.2L</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                    <span className="font-rajdhani text-[#8b4513]">Investment Score</span>
                    <span className="text-[#ff4500] font-orbitron font-bold">9.2/10</span>
                  </div>
                </div>

                {/* AI scan animation */}
                <div className="relative h-2 bg-[#fff7f0] rounded-full overflow-hidden">
                  <div className="absolute h-full w-1/3 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full animate-pulse"></div>
                </div>
                <p className="text-center text-[#8b4513] text-sm font-rajdhani mt-2">AI Processing Real-time Data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-[#fff7f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-orbitron text-3xl lg:text-4xl font-bold text-[#2d0000] mb-4">
              Intelligent Real Estate Solutions
            </h2>
            <p className="text-lg text-[#8b4513] max-w-2xl mx-auto font-dmsans">
              Experience the future of property discovery with our AI-powered platform designed for Indian real estate markets
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AiFeatureCard
              icon={<div className="w-8 h-8 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold">S</div>}
              title="Smart Search"
              description="AI-powered property matching based on your preferences and behavior patterns"
              category="intelligence"
              href="#search"
            />
            <AiFeatureCard
              icon={<div className="w-8 h-8 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold">V</div>}
              title="Document Verification"
              description="Automated verification of property documents and legal compliance"
              category="verification"
              href="#listing"
            />
            <AiFeatureCard
              icon={<div className="w-8 h-8 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold">P</div>}
              title="Price Prediction"
              description="Machine learning algorithms predict accurate property valuations"
              category="analysis"
              href="#compare"
            />
            <AiFeatureCard
              icon={<div className="w-8 h-8 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold">L</div>}
              title="Lead Intelligence"
              description="Automated lead scoring and buyer-seller matching system"
              category="automation"
              href="#ai-tools"
            />
          </div>
        </div>
      </section>
    </>
  );
};
