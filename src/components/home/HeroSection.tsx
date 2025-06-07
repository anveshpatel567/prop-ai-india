
import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonPrimary } from '../common/ButtonPrimary';
import { ButtonGradient } from '../common/ButtonGradient';
import { AiFeatureCard } from './AiFeatureCard';
import { SparklesIcon, MagnifyingGlassIcon, DocumentTextIcon, GlobeIcon, BoltIcon } from '../icons';

export const HeroSection: React.FC = () => {
  return (
    <section className="warm-gradient hero-smoke hero-gradient min-h-screen flex items-center relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-30 animate-float-slow"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-red-200 rounded-full opacity-25 animate-float-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-orange-300 rounded-full opacity-20 animate-float-slow" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-orbitron font-bold leading-tight text-white drop-shadow-md">
                Find Your
                <span className="block text-fire-primary drop-shadow-glow">Dream Property</span>
                with AI Power
              </h1>
              <p className="text-xl md:text-2xl font-rajdhani text-gray-100 leading-relaxed animate-fadein">
                India's first AI-enhanced real estate platform. Search smart, list faster, 
                and discover properties that match your exact needs with our advanced AI tools.
              </p>
            </div>

            {/* AI Feature Cards */}
            <div id="ai-section" className="py-8">
              <h3 className="font-orbitron text-2xl font-bold text-center mb-6 text-fire-primary drop-shadow-sm">
                AI-Powered Features
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                <AiFeatureCard
                  icon={<SparklesIcon />}
                  title="Smart Match"
                  description="AI finds perfect properties matching your lifestyle"
                  href="#search"
                />
                <AiFeatureCard
                  icon={<MagnifyingGlassIcon />}
                  title="Visual Search"
                  description="Search using images and natural language"
                  href="#search"
                />
                <AiFeatureCard
                  icon={<DocumentTextIcon />}
                  title="Auto Listings"
                  description="Generate property descriptions instantly"
                  href="#listing"
                />
                <AiFeatureCard
                  icon={<BoltIcon />}
                  title="Price Prediction"
                  description="AI-powered market value analysis"
                  href="#compare"
                />
                <AiFeatureCard
                  icon={<GlobeIcon />}
                  title="Virtual Tours"
                  description="Immersive 3D property experiences"
                  href="#ai-tools"
                />
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-100 font-rajdhani font-medium">AI Smart Search</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-100 font-rajdhani font-medium">Verified Listings</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-100 font-rajdhani font-medium">Expert Agents</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-100 font-rajdhani font-medium">RERA Certified</span>
              </div>
            </div>

            {/* CTA Buttons with improved styling */}
            <div id="login" className="flex flex-col sm:flex-row gap-4">
              <Link to="/search">
                <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:shadow-[0_0_12px_#ff6a00] transition duration-300 ease-in-out transform hover:scale-105">
                  Start Smart Search
                </button>
              </Link>
              <Link to="/list-property">
                <ButtonGradient variant="glass" page="HeroSection" className="w-full sm:w-auto font-bold py-3 px-8 rounded-full">
                  List Your Property
                </ButtonGradient>
              </Link>
            </div>

            {/* Stats with improved styling */}
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-fire-primary drop-shadow-sm">50K+</div>
                <div className="text-sm text-gray-200 font-rajdhani">Properties Listed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-fire-primary drop-shadow-sm">25K+</div>
                <div className="text-sm text-gray-200 font-rajdhani">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-fire-primary drop-shadow-sm">500+</div>
                <div className="text-sm text-gray-200 font-rajdhani">Expert Agents</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Visual */}
          <div className="relative">
            <div className="glass-card p-8 glow-hover shadow-xl">
              <div className="aspect-square bg-gradient-to-br from-orange-100/30 to-red-100/30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto flex items-center justify-center shadow-2xl">
                    <span className="text-4xl">🏠</span>
                  </div>
                  <h3 className="text-2xl font-orbitron font-bold text-white drop-shadow-sm">AI-Powered</h3>
                  <p className="text-gray-100 font-rajdhani">Smart property matching with 95% accuracy</p>
                  
                  {/* AI Badge */}
                  <div className="absolute bottom-4 right-4">
                    <span className="text-xs text-orange-400 bg-white/10 px-3 py-1 rounded-xl backdrop-blur-sm border border-orange-300/20 font-rajdhani">
                      AI-powered by GPT-4o Mini
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
