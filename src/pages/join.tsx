
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GoBackHomeButton } from '../components/ui/GoBackHomeButton';

const Join: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] to-[#ffe4d6]">
      <Navbar />
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-[#2d0000] mb-2 font-rajdhani">Join FreePropList</h1>
              <p className="text-[#8b4513] font-dmsans">Become part of India's most intelligent property platform</p>
            </div>
            <GoBackHomeButton />
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_0_30px_rgba(255,102,0,0.45)] p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] bg-clip-text text-transparent mb-4 font-rajdhani">
                Why Join FreePropList?
              </h2>
              <p className="text-[#8b4513] font-dmsans">
                Experience the future of real estate with AI-powered tools and verified listings
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-xs font-bold mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d0000] font-rajdhani">AI-Powered Search</h3>
                  <p className="text-[#8b4513] text-sm font-dmsans">Find properties with natural language queries</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-xs font-bold mt-1">
                  Z
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d0000] font-rajdhani">Smart Tools</h3>
                  <p className="text-[#8b4513] text-sm font-dmsans">Video generation, pricing, fraud detection & more</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-xs font-bold mt-1">
                  S
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d0000] font-rajdhani">Verified Listings</h3>
                  <p className="text-[#8b4513] text-sm font-dmsans">RERA verified properties with document checks</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white text-xs font-bold mt-1">
                  U
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d0000] font-rajdhani">Community</h3>
                  <p className="text-[#8b4513] text-sm font-dmsans">Connect with agents, builders, and buyers</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/login" className="block">
                <button className="w-full bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-white font-semibold py-3 px-6 rounded-xl shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 transform hover:scale-105 font-rajdhani">
                  Create Account
                </button>
              </Link>
              
              <Link to="/login" className="block">
                <button className="w-full border-2 border-[#ff4500] text-[#ff4500] font-semibold py-3 px-6 rounded-xl hover:bg-gradient-to-r hover:from-[#ff6a00] hover:to-[#ff0000] hover:text-white transition-all duration-300 font-rajdhani">
                  Sign In
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_0_30px_rgba(255,102,0,0.45)] p-6">
            <h3 className="text-xl font-bold text-[#2d0000] mb-4 font-rajdhani">Membership Benefits</h3>
            <div className="space-y-3 text-sm font-dmsans">
              <div className="flex justify-between">
                <span className="text-[#2d0000]">AI Search Credits</span>
                <span className="font-semibold text-[#ff4500]">100 Free Credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2d0000]">Property Listings</span>
                <span className="font-semibold text-[#ff4500]">Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2d0000]">AI Tools Access</span>
                <span className="font-semibold text-[#ff4500]">All 8 Tools</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2d0000]">Priority Support</span>
                <span className="font-semibold text-[#ff4500]">24/7 Chat</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Join;
