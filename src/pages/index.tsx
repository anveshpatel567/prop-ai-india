
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { AiTeaserCards } from '../components/home/AiTeaserCards';
import { RoleSelectorCards } from '../components/home/RoleSelectorCards';
import { GlowButton } from '../components/common/GlowButton';
import { GlassCard } from '../components/layout/GlassCard';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      {/* Quick Actions Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Link to="/search">
              <GlassCard className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="font-semibold mb-2">Search Properties</h3>
                <p className="text-sm text-gray-600">Find your dream property</p>
              </GlassCard>
            </Link>
            
            <Link to="/listing/create">
              <GlassCard className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="font-semibold mb-2">List Property</h3>
                <p className="text-sm text-gray-600">Sell or rent your property</p>
              </GlassCard>
            </Link>
            
            <Link to="/listing/all">
              <GlassCard className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="font-semibold mb-2">Browse All</h3>
                <p className="text-sm text-gray-600">Explore all listings</p>
              </GlassCard>
            </Link>
            
            <Link to="/auth">
              <GlassCard className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-4">👤</div>
                <h3 className="font-semibold mb-2">Join Us</h3>
                <p className="text-sm text-gray-600">Create your account</p>
              </GlassCard>
            </Link>
          </div>
        </div>
      </section>

      <AiTeaserCards />
      <RoleSelectorCards />
      
      {/* CTA Section */}
      <section className="py-16 px-4 warm-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Join thousands of users who trust FreePropList for their real estate needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <GlowButton size="lg" className="w-full sm:w-auto">
                Start Searching
              </GlowButton>
            </Link>
            <Link to="/listing/create">
              <GlowButton variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-orange-600">
                List Your Property
              </GlowButton>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
