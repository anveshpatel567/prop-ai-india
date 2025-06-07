
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GoBackHomeButton } from '../components/ui/GoBackHomeButton';
import { CheckCircle, Users, Zap, Shield } from 'lucide-react';

const Join: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Join FreePropList</h1>
              <p className="text-gray-600">Become part of India's most intelligent property platform</p>
            </div>
            <GoBackHomeButton />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                Why Join FreePropList?
              </h2>
              <p className="text-gray-600">
                Experience the future of real estate with AI-powered tools and verified listings
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">AI-Powered Search</h3>
                  <p className="text-gray-600 text-sm">Find properties with natural language queries</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Zap className="h-6 w-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Smart Tools</h3>
                  <p className="text-gray-600 text-sm">Video generation, pricing, fraud detection & more</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Verified Listings</h3>
                  <p className="text-gray-600 text-sm">RERA verified properties with document checks</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="h-6 w-6 text-purple-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Community</h3>
                  <p className="text-gray-600 text-sm">Connect with agents, builders, and buyers</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/login" className="block">
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105">
                  Create Account
                </button>
              </Link>
              
              <Link to="/login" className="block">
                <button className="w-full border-2 border-orange-500 text-orange-500 font-semibold py-3 px-6 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300">
                  Sign In
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Membership Benefits</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>AI Search Credits</span>
                <span className="font-semibold text-green-600">100 Free Credits</span>
              </div>
              <div className="flex justify-between">
                <span>Property Listings</span>
                <span className="font-semibold text-green-600">Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span>AI Tools Access</span>
                <span className="font-semibold text-green-600">All 8 Tools</span>
              </div>
              <div className="flex justify-between">
                <span>Priority Support</span>
                <span className="font-semibold text-green-600">24/7 Chat</span>
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
