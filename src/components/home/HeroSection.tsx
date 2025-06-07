
import React from 'react';
import { Link } from 'react-router-dom';
import { AiFeatureCard } from './AiFeatureCard';
import { BuildingIcon, SearchIcon, DocumentIcon, ShieldIcon, ZapIcon, BrainIcon, ScanIcon, UsersIcon } from '../icons';

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-hero-from via-hero-via to-hero-to relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-neon-cyan/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-neon-lime/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-ai-purple/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-orbitron font-bold leading-tight tracking-wide text-white drop-shadow-xl">
                India's Most
                <span className="block bg-gradient-to-r from-neon-cyan to-neon-lime bg-clip-text text-transparent">
                  Intelligent
                </span>
                Property Platform
              </h1>
              
              <p className="text-xl md:text-2xl font-rajdhani text-gray-200 leading-relaxed animate-fade-in">
                Powered by advanced AI algorithms, we revolutionize real estate discovery 
                with smart matching, fraud detection, and predictive analytics for Indian markets.
              </p>
            </div>

            {/* Verified stats with premium styling */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold bg-gradient-to-r from-neon-cyan to-neon-lime bg-clip-text text-transparent">
                  1M+
                </div>
                <div className="text-sm font-rajdhani text-gray-300">Verified Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold bg-gradient-to-r from-neon-cyan to-neon-lime bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-sm font-rajdhani text-gray-300">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold bg-gradient-to-r from-neon-cyan to-neon-lime bg-clip-text text-transparent">
                  99.9%
                </div>
                <div className="text-sm font-rajdhani text-gray-300">AI Accuracy</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/search">
                <button className="bg-gradient-to-r from-neon-blue to-neon-purple text-white font-orbitron font-bold 
                                 py-4 px-8 rounded-xl shadow-xl 
                                 hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] 
                                 transition-all duration-300 ease-in-out 
                                 transform hover:scale-105 
                                 border border-neon-cyan/30 animate-pulse-border">
                  Explore Listings with AI
                </button>
              </Link>
              
              <Link to="/list-property">
                <button className="bg-white/10 backdrop-blur-sm text-white font-rajdhani font-bold 
                                 py-4 px-8 rounded-xl border border-white/30
                                 hover:bg-white/20 hover:border-neon-lime/50
                                 transition-all duration-300 ease-in-out">
                  List Your Property
                </button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <ShieldIcon className="w-5 h-5 text-green-400" />
                <span className="bg-green-400 text-white px-2 py-1 text-xs rounded-full font-rajdhani">
                  RERA Verified
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ZapIcon className="w-5 h-5 text-neon-cyan" />
                <span className="text-gray-300 text-sm font-rajdhani">AI-Powered Analytics</span>
              </div>
            </div>
          </div>

          {/* Right Content - AI Dashboard Mock */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 
                           shadow-[0_0_50px_rgba(138,35,135,0.3)]">
              
              {/* AI Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-orbitron text-xl font-bold text-white">AI Analytics Dashboard</h3>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>

              {/* Mock AI metrics */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span className="font-rajdhani text-gray-300">Market Analysis</span>
                  <span className="text-neon-cyan font-orbitron">98.5%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span className="font-rajdhani text-gray-300">Price Prediction</span>
                  <span className="text-neon-lime font-orbitron">₹47.2L</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span className="font-rajdhani text-gray-300">Investment Score</span>
                  <span className="text-orange-400 font-orbitron">9.2/10</span>
                </div>
              </div>

              {/* AI scan animation */}
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="absolute h-full w-1/3 bg-gradient-to-r from-neon-cyan to-neon-lime rounded-full animate-ai-scan"></div>
              </div>
              <p className="text-center text-gray-400 text-sm font-rajdhani mt-2">AI Processing Real-time Data</p>
            </div>
          </div>
        </div>

        {/* AI Features Section */}
        <div id="ai-features" className="py-20">
          <h2 className="text-3xl font-orbitron font-bold text-center mb-4 text-white">
            Intelligent Real Estate Solutions
          </h2>
          <p className="text-center text-gray-300 font-rajdhani text-lg mb-12 max-w-2xl mx-auto">
            Experience the future of property discovery with our AI-powered platform designed for Indian real estate markets
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AiFeatureCard
              icon={<SearchIcon />}
              title="Smart Search"
              description="AI-powered property matching based on your preferences and behavior patterns"
              category="intelligence"
              href="#search"
            />
            <AiFeatureCard
              icon={<ScanIcon />}
              title="Document Verification"
              description="Automated verification of property documents and legal compliance"
              category="verification"
              href="#listing"
            />
            <AiFeatureCard
              icon={<BrainIcon />}
              title="Price Prediction"
              description="Machine learning algorithms predict accurate property valuations"
              category="analysis"
              href="#compare"
            />
            <AiFeatureCard
              icon={<UsersIcon />}
              title="Lead Intelligence"
              description="Automated lead scoring and buyer-seller matching system"
              category="automation"
              href="#ai-tools"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
