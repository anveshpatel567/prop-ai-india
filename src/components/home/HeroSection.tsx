
import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonPrimary } from '../common/ButtonPrimary';
import { ButtonGradient } from '../common/ButtonGradient';

export const HeroSection: React.FC = () => {
  return (
    <section className="warm-gradient min-h-screen flex items-center relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-50 floating-animation"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-red-200 rounded-full opacity-40 floating-animation" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-orange-300 rounded-full opacity-30 floating-animation" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Find Your
                <span className="block text-fire">Dream Property</span>
                with AI Power
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                India's first AI-enhanced real estate platform. Search smart, list faster, 
                and discover properties that match your exact needs with our advanced AI tools.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 fire-gradient rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700 font-medium">AI Smart Search</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 fire-gradient rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700 font-medium">Verified Listings</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 fire-gradient rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700 font-medium">Expert Agents</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 fire-gradient rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700 font-medium">RERA Certified</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/search">
                <ButtonPrimary className="w-full sm:w-auto">
                  Start Smart Search
                </ButtonPrimary>
              </Link>
              <Link to="/list-property">
                <ButtonGradient variant="glass" page="HeroSection" className="w-full sm:w-auto">
                  List Your Property
                </ButtonGradient>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-fire">50K+</div>
                <div className="text-sm text-gray-600">Properties Listed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-fire">25K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-fire">500+</div>
                <div className="text-sm text-gray-600">Expert Agents</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Visual */}
          <div className="relative">
            <div className="glass-card p-8 glow-hover">
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 fire-gradient rounded-full mx-auto flex items-center justify-center">
                    <span className="text-4xl">🏠</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">AI-Powered</h3>
                  <p className="text-gray-600">Smart property matching with 95% accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
