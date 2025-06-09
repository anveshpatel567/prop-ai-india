
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { AiTeaserCards } from '../components/home/AiTeaserCards';
import { RoleSelectorCards } from '../components/home/RoleSelectorCards';
import { SeoMetaHead } from '../components/seo/SeoMetaHead';
import { JsonLdSchema } from '../components/seo/JsonLdSchema';
import { useSeoOverride } from '../hooks/useSeoOverride';
import { MobileCardGrid, MobileCardSpacing } from '../components/mobile/MobileCardSpacingFix';
import { SearchIcon, Building2, FileText, Users } from 'lucide-react';

const Index: React.FC = () => {
  const { seoData } = useSeoOverride({
    path: '/',
    fallbackTitle: 'FreePropList - AI-Powered Property Platform | Smart Real Estate Solutions',
    fallbackDescription: 'Discover properties with AI-powered search, fraud detection, pricing optimization and more. India\'s most intelligent real estate platform with verified listings and smart matching.'
  });

  const organizationData = {
    name: 'FreePropList',
    description: 'AI-Powered Property Platform for India',
    url: 'https://freeproplist.com',
    logo: 'https://freeproplist.com/logo.png'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <SeoMetaHead
        title={seoData.title || 'FreePropList - AI-Powered Property Platform'}
        description={seoData.description || 'Discover properties with AI-powered search and smart matching'}
        keywords={seoData.keywords}
        canonicalUrl="https://freeproplist.com/"
      />
      <JsonLdSchema type="organization" data={organizationData} />
      
      <Navbar />
      <HeroSection />
      
      {/* Quick Actions Section */}
      <section id="search" className="py-8 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-sm sm:text-base text-gray-600">
              Get started with our most popular features
            </p>
          </div>
          
          <MobileCardGrid>
            <Link to="/search">
              <div className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl hover:shadow-orange-200/30 transition-all duration-300 cursor-pointer group border border-orange-100 min-h-[120px] sm:min-h-[140px] flex flex-col justify-center">
                <SearchIcon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-orange-500 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2 text-gray-900 text-sm sm:text-base">Search Properties</h3>
                <p className="text-xs sm:text-sm text-gray-600">AI-powered property discovery</p>
              </div>
            </Link>
            
            <Link to="/list-property">
              <div className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl hover:shadow-red-200/30 transition-all duration-300 cursor-pointer group border border-red-100 min-h-[120px] sm:min-h-[140px] flex flex-col justify-center">
                <Building2 className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-red-500 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2 text-gray-900 text-sm sm:text-base">List Property</h3>
                <p className="text-xs sm:text-sm text-gray-600">Sell or rent your property</p>
              </div>
            </Link>
            
            <Link to="/listing/all">
              <div className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl hover:shadow-yellow-200/30 transition-all duration-300 cursor-pointer group border border-yellow-100 min-h-[120px] sm:min-h-[140px] flex flex-col justify-center">
                <FileText className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-yellow-600 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2 text-gray-900 text-sm sm:text-base">Browse All</h3>
                <p className="text-xs sm:text-sm text-gray-600">Explore all listings</p>
              </div>
            </Link>
            
            <Link to="/login">
              <div className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl hover:shadow-orange-200/30 transition-all duration-300 cursor-pointer group border border-orange-100 min-h-[120px] sm:min-h-[140px] flex flex-col justify-center">
                <Users className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-orange-500 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2 text-gray-900 text-sm sm:text-base">Join Us</h3>
                <p className="text-xs sm:text-sm text-gray-600">Create your account</p>
              </div>
            </Link>
          </MobileCardGrid>
        </div>
      </section>

      <div id="listing" className="bg-gradient-to-br from-red-50 to-orange-50">
        <AiTeaserCards />
      </div>
      
      <div id="compare" className="bg-white">
        <RoleSelectorCards />
      </div>
      
      {/* CTA Section */}
      <section id="ai-tools" className="bg-gradient-to-r from-orange-500 to-red-600 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Experience the Future of Real Estate?
          </h2>
          <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-lg">
            Join thousands of users who trust FreePropList's AI-powered platform for their property needs
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/search">
              <button className="w-full sm:w-auto bg-white text-orange-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 ease-in-out transform hover:scale-105 min-h-[44px] text-sm sm:text-base">
                Start AI Search
              </button>
            </Link>
            <Link to="/list-property">
              <button className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl border border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-300 ease-in-out min-h-[44px] text-sm sm:text-base">
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
