
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <HeroSection />
      
      {/* Quick Actions Section */}
      <section id="search" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-gray-600">
              Get started with our most popular features
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Link to="/search">
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:shadow-orange-200/30 transition-all duration-300 cursor-pointer group border border-orange-100">
                <SearchIcon className="w-12 h-12 mx-auto mb-4 text-orange-500 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2 text-gray-900">Search Properties</h3>
                <p className="text-sm text-gray-600">AI-powered property discovery</p>
              </div>
            </Link>
            
            <Link to="/list-property">
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:shadow-red-200/30 transition-all duration-300 cursor-pointer group border border-red-100">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-red-500 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2 text-gray-900">List Property</h3>
                <p className="text-sm text-gray-600">Sell or rent your property</p>
              </div>
            </Link>
            
            <Link to="/listing/all">
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:shadow-yellow-200/30 transition-all duration-300 cursor-pointer group border border-yellow-100">
                <FileText className="w-12 h-12 mx-auto mb-4 text-yellow-600 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2 text-gray-900">Browse All</h3>
                <p className="text-sm text-gray-600">Explore all listings</p>
              </div>
            </Link>
            
            <Link to="/login">
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:shadow-orange-200/30 transition-all duration-300 cursor-pointer group border border-orange-100">
                <Users className="w-12 h-12 mx-auto mb-4 text-orange-500 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2 text-gray-900">Join Us</h3>
                <p className="text-sm text-gray-600">Create your account</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <div id="listing" className="bg-gradient-to-br from-red-50 to-orange-50">
        <AiTeaserCards />
      </div>
      
      <div id="compare" className="bg-white">
        <RoleSelectorCards />
      </div>
      
      {/* CTA Section */}
      <section id="ai-tools" className="bg-gradient-to-r from-orange-500 to-red-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience the Future of Real Estate?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Join thousands of users who trust FreePropList's AI-powered platform for their property needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <button className="bg-white text-orange-600 font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 ease-in-out transform hover:scale-105">
                Start AI Search
              </button>
            </Link>
            <Link to="/list-property">
              <button className="bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl border border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-300 ease-in-out">
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
