
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { AiTeaserCards } from '../components/home/AiTeaserCards';
import { RoleSelectorCards } from '../components/home/RoleSelectorCards';
import { SearchIcon, Building2, FileText, Users } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-global-bg">
      <Navbar />
      <HeroSection />
      
      {/* Quick Actions Section */}
      <section id="search" className="section-alt py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-orbitron text-3xl font-bold text-text-primary mb-4">Quick Actions</h2>
            <p className="heading-secondary">
              Get started with our most popular features
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Link to="/search">
              <div className="glass-card-light rounded-2xl p-6 text-center 
                             hover:glass-card-subtle hover:shadow-glow-blue
                             transition-all duration-300 cursor-pointer group">
                <SearchIcon className="w-12 h-12 mx-auto mb-4 text-accent-blue group-hover:scale-110 transition-transform" />
                <h3 className="font-orbitron font-semibold mb-2 text-text-primary">Search Properties</h3>
                <p className="text-sm text-text-muted font-rajdhani">AI-powered property discovery</p>
              </div>
            </Link>
            
            <Link to="/listing/create">
              <div className="glass-card-light rounded-2xl p-6 text-center 
                             hover:glass-card-subtle hover:shadow-glow-cyan
                             transition-all duration-300 cursor-pointer group">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-accent-lime group-hover:scale-110 transition-transform" />
                <h3 className="font-orbitron font-semibold mb-2 text-text-primary">List Property</h3>
                <p className="text-sm text-text-muted font-rajdhani">Sell or rent your property</p>
              </div>
            </Link>
            
            <Link to="/listing/all">
              <div className="glass-card-light rounded-2xl p-6 text-center 
                             hover:glass-card-subtle hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]
                             transition-all duration-300 cursor-pointer group">
                <FileText className="w-12 h-12 mx-auto mb-4 text-accent-violet group-hover:scale-110 transition-transform" />
                <h3 className="font-orbitron font-semibold mb-2 text-text-primary">Browse All</h3>
                <p className="text-sm text-text-muted font-rajdhani">Explore all listings</p>
              </div>
            </Link>
            
            <Link to="/auth">
              <div className="glass-card-light rounded-2xl p-6 text-center 
                             hover:glass-card-subtle hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]
                             transition-all duration-300 cursor-pointer group">
                <Users className="w-12 h-12 mx-auto mb-4 text-orange-500 group-hover:scale-110 transition-transform" />
                <h3 className="font-orbitron font-semibold mb-2 text-text-primary">Join Us</h3>
                <p className="text-sm text-text-muted font-rajdhani">Create your account</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <div id="listing" className="section-features">
        <AiTeaserCards />
      </div>
      
      <div id="compare" className="section-alt">
        <RoleSelectorCards />
      </div>
      
      {/* CTA Section */}
      <section id="ai-tools" className="section-cta py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-orbitron text-3xl font-bold text-white mb-4">
            Ready to Experience the Future of Real Estate?
          </h2>
          <p className="text-white/90 mb-8 text-lg font-rajdhani">
            Join thousands of users who trust FreePropList's AI-powered platform for their property needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <button className="bg-white text-text-primary font-orbitron font-bold 
                               py-4 px-8 rounded-xl shadow-xl 
                               hover:shadow-glow-blue hover:bg-gray-50
                               transition-all duration-300 ease-in-out transform hover:scale-105">
                Start AI Search
              </button>
            </Link>
            <Link to="/listing/create">
              <button className="bg-white/20 backdrop-blur-sm text-white font-rajdhani font-bold 
                               py-4 px-8 rounded-xl border border-white/30
                               hover:bg-white/30 hover:border-white/50 
                               transition-all duration-300 ease-in-out">
                List Your Property
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
