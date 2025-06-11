
import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { AiTeaserCards } from '../components/home/AiTeaserCards';
import { RoleSelectorCards } from '../components/home/RoleSelectorCards';
import { MobileCardGrid, MobileCardSpacing } from '../components/mobile/MobileCardSpacingFix';

// Simple fallback loading component
const PageLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] to-[#ffe4d6] flex items-center justify-center">
    <div className="text-center">
      <div className="text-2xl font-bold bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] bg-clip-text text-transparent mb-4">
        FreePropList
      </div>
      <div className="text-[#8b4513]">Loading...</div>
    </div>
  </div>
);

const Index: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set document title directly
    document.title = 'FreePropList - AI-Powered Property Platform | Smart Real Estate Solutions';
    
    // Set meta description directly
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Discover properties with AI-powered search, fraud detection, pricing optimization and more. India\'s most intelligent real estate platform with verified listings and smart matching.');

    // Wait a bit to ensure all contexts are initialized
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen until contexts are ready
  if (!isReady) {
    return <PageLoading />;
  }

  // Safe link component that handles potential router context issues
  const SafeLink: React.FC<{ to: string; children: React.ReactNode; className?: string }> = ({ to, children, className }) => {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      window.location.href = to;
    };

    return (
      <a href={to} onClick={handleClick} className={className}>
        {children}
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] to-[#ffe4d6]">
      <Navbar />
      <HeroSection />
      
      {/* Quick Actions Section */}
      <section id="search" className="py-8 sm:py-16 bg-[#fff7f0]">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2d0000] mb-4">Quick Actions</h2>
            <p className="text-sm sm:text-base text-[#8b4513]">
              Get started with our most popular features
            </p>
          </div>
          
          <MobileCardGrid>
            <SafeLink to="/search">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 cursor-pointer group border border-[#ff4500] min-h-[120px] sm:min-h-[140px] flex flex-col justify-center transform hover:scale-105">
                <div className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">🔍</div>
                <h3 className="font-semibold mb-2 text-[#2d0000] text-sm sm:text-base">Search Properties</h3>
                <p className="text-xs sm:text-sm text-[#8b4513]">AI-powered property discovery</p>
              </div>
            </SafeLink>
            
            <SafeLink to="/list-property">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 cursor-pointer group border border-[#ff4500] min-h-[120px] sm:min-h-[140px] flex flex-col justify-center transform hover:scale-105">
                <div className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">🏠</div>
                <h3 className="font-semibold mb-2 text-[#2d0000] text-sm sm:text-base">List Property</h3>
                <p className="text-xs sm:text-sm text-[#8b4513]">Sell or rent your property</p>
              </div>
            </SafeLink>
            
            <SafeLink to="/listing/all">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 cursor-pointer group border border-[#ff4500] min-h-[120px] sm:min-h-[140px] flex flex-col justify-center transform hover:scale-105">
                <div className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">📄</div>
                <h3 className="font-semibold mb-2 text-[#2d0000] text-sm sm:text-base">Browse All</h3>
                <p className="text-xs sm:text-sm text-[#8b4513]">Explore all listings</p>
              </div>
            </SafeLink>
            
            <SafeLink to="/login">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 cursor-pointer group border border-[#ff4500] min-h-[120px] sm:min-h-[140px] flex flex-col justify-center transform hover:scale-105">
                <div className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">👤</div>
                <h3 className="font-semibold mb-2 text-[#2d0000] text-sm sm:text-base">Join Us</h3>
                <p className="text-xs sm:text-sm text-[#8b4513]">Create your account</p>
              </div>
            </SafeLink>
          </MobileCardGrid>
        </div>
      </section>

      <div id="listing" className="section-alt">
        <AiTeaserCards />
      </div>
      
      <div id="compare" className="bg-[#fff7f0]">
        <RoleSelectorCards />
      </div>
      
      {/* CTA Section */}
      <section id="ai-tools" className="section-cta py-8 sm:py-16">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Experience the Future of Real Estate?
          </h2>
          <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-lg">
            Join thousands of users who trust FreePropList's AI-powered platform for their property needs
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <SafeLink to="/search">
              <button className="w-full sm:w-auto bg-[#fff7f0] text-[#ff4500] font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] hover:bg-white transition-all duration-300 ease-in-out transform hover:scale-105 min-h-[44px] text-sm sm:text-base">
                Start AI Search
              </button>
            </SafeLink>
            <SafeLink to="/list-property">
              <button className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl border border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-300 ease-in-out min-h-[44px] text-sm sm:text-base">
                List Your Property
              </button>
            </SafeLink>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
