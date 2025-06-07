
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { AiTeaserCards } from '../components/home/AiTeaserCards';
import { RoleSelectorCards } from '../components/home/RoleSelectorCards';
import { GlassCard } from '../components/layout/GlassCard';
import { SearchIcon, Building2, FileText, Users } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-hero-from via-hero-via to-hero-to">
      <Navbar />
      <HeroSection />
      
      {/* Quick Actions Section */}
      <section id="search" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-orbitron font-bold text-center mb-4 text-white">Quick Actions</h2>
          <p className="text-center text-gray-300 font-rajdhani text-lg mb-12">
            Get started with our most popular features
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Link to="/search">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center 
                             hover:bg-white/20 hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]
                             transition-all duration-300 cursor-pointer group">
                <SearchIcon className="w-12 h-12 mx-auto mb-4 text-neon-cyan group-hover:scale-110 transition-transform" />
                <h3 className="font-orbitron font-semibold mb-2 text-white">Search Properties</h3>
                <p className="text-sm text-gray-300 font-rajdhani">AI-powered property discovery</p>
              </div>
            </Link>
            
            <Link to="/listing/create">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center 
                             hover:bg-white/20 hover:border-neon-lime/50 hover:shadow-[0_0_30px_rgba(166,255,0,0.3)]
                             transition-all duration-300 cursor-pointer group">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-neon-lime group-hover:scale-110 transition-transform" />
                <h3 className="font-orbitron font-semibold mb-2 text-white">List Property</h3>
                <p className="text-sm text-gray-300 font-rajdhani">Sell or rent your property</p>
              </div>
            </Link>
            
            <Link to="/listing/all">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center 
                             hover:bg-white/20 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(138,35,135,0.3)]
                             transition-all duration-300 cursor-pointer group">
                <FileText className="w-12 h-12 mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-orbitron font-semibold mb-2 text-white">Browse All</h3>
                <p className="text-sm text-gray-300 font-rajdhani">Explore all listings</p>
              </div>
            </Link>
            
            <Link to="/auth">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center 
                             hover:bg-white/20 hover:border-orange-400/50 hover:shadow-[0_0_30px_rgba(242,113,33,0.3)]
                             transition-all duration-300 cursor-pointer group">
                <Users className="w-12 h-12 mx-auto mb-4 text-orange-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-orbitron font-semibold mb-2 text-white">Join Us</h3>
                <p className="text-sm text-gray-300 font-rajdhani">Create your account</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <div id="listing">
        <AiTeaserCards />
      </div>
      
      <div id="compare">
        <RoleSelectorCards />
      </div>
      
      {/* CTA Section */}
      <section id="ai-tools" className="py-16 px-4 bg-gradient-to-r from-ai-purple/20 to-ai-coral/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-orbitron font-bold text-white mb-4">
            Ready to Experience the Future of Real Estate?
          </h2>
          <p className="text-gray-200 mb-8 text-lg font-rajdhani">
            Join thousands of users who trust FreePropList's AI-powered platform for their property needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <button className="bg-gradient-to-r from-neon-blue to-neon-purple text-white font-orbitron font-bold 
                               py-4 px-8 rounded-xl shadow-xl 
                               hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] 
                               transition-all duration-300 ease-in-out transform hover:scale-105">
                Start AI Search
              </button>
            </Link>
            <Link to="/listing/create">
              <button className="bg-white/10 backdrop-blur-sm text-white font-rajdhani font-bold 
                               py-4 px-8 rounded-xl border border-white/30
                               hover:bg-white/20 hover:border-neon-lime/50 
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
