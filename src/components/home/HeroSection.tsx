
import React from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, ShieldIcon, ZapIcon } from '../icons';
import { AiFeatureCard } from './AiFeatureCard';
import { BuildingIcon, BrainIcon, ScanIcon, UsersIcon } from '../icons';

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
                  <span className="block bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">
                    Intelligent
                  </span>
                  Property Platform
                </h1>
                
                <p className="heading-secondary max-w-xl animate-fade-in">
                  Powered by advanced AI algorithms, we revolutionize real estate discovery 
                  with smart matching, fraud detection, and predictive analytics for Indian markets.
                </p>
              </div>

              {/* Verified stats */}
              <div className="grid grid-cols-3 gap-6 py-6">
                <div className="text-center">
                  <div className="text-3xl font-orbitron font-bold text-accent-blue">
                    1M+
                  </div>
                  <div className="text-sm font-rajdhani text-text-muted">Verified Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-orbitron font-bold text-accent-cyan">
                    50K+
                  </div>
                  <div className="text-sm font-rajdhani text-text-muted">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-orbitron font-bold text-accent-sky">
                    99.9%
                  </div>
                  <div className="text-sm font-rajdhani text-text-muted">AI Accuracy</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/search">
                  <button className="btn-primary ring-2 ring-offset-2 ring-accent-blue/20 animate-pulse-border">
                    Explore Listings with AI
                  </button>
                </Link>
                
                <Link to="/list-property">
                  <button className="btn-secondary">
                    List Your Property
                  </button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <ShieldIcon className="w-5 h-5 text-accent-green" />
                  <span className="bg-accent-green text-white px-2 py-1 text-xs rounded-full font-rajdhani font-medium">
                    RERA Verified
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ZapIcon className="w-5 h-5 text-accent-blue" />
                  <span className="text-text-muted text-sm font-rajdhani">AI-Powered Analytics</span>
                </div>
              </div>
            </div>

            {/* Right Content - AI Dashboard Mock */}
            <div className="relative">
              <div className="glass-card-light rounded-3xl p-8 shadow-card">
                
                {/* AI Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-orbitron text-xl font-bold text-text-primary">AI Analytics Dashboard</h3>
                  <div className="w-3 h-3 bg-accent-green rounded-full animate-pulse"></div>
                </div>

                {/* Mock AI metrics */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center p-3 glass-card-subtle rounded-xl">
                    <span className="font-rajdhani text-text-secondary">Market Analysis</span>
                    <span className="text-accent-blue font-orbitron font-bold">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 glass-card-subtle rounded-xl">
                    <span className="font-rajdhani text-text-secondary">Price Prediction</span>
                    <span className="text-accent-cyan font-orbitron font-bold">₹47.2L</span>
                  </div>
                  <div className="flex justify-between items-center p-3 glass-card-subtle rounded-xl">
                    <span className="font-rajdhani text-text-secondary">Investment Score</span>
                    <span className="text-accent-violet font-orbitron font-bold">9.2/10</span>
                  </div>
                </div>

                {/* AI scan animation */}
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="absolute h-full w-1/3 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full animate-ai-scan"></div>
                </div>
                <p className="text-center text-text-muted text-sm font-rajdhani mt-2">AI Processing Real-time Data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="section-features py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-orbitron text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Intelligent Real Estate Solutions
            </h2>
            <p className="heading-secondary max-w-2xl mx-auto">
              Experience the future of property discovery with our AI-powered platform designed for Indian real estate markets
            </p>
          </div>
          
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
      </section>
    </>
  );
};
