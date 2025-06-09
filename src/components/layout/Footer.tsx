
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const handleMissingLink = (path: string) => {
    console.log(`Missing page: ${path} - routing to /#coming-soon`);
    window.location.href = '/#coming-soon';
  };

  return (
    <footer className="bg-gradient-to-t from-[#ffe4d6] to-[#fff7f0] border-t border-[#ff4500] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] bg-clip-text text-transparent">
                FreePropList
              </span>
            </div>
            <p className="text-[#8b4513] text-sm leading-relaxed">
              India's premier AI-enhanced real estate platform. Find your dream property with smart search and verified listings.
            </p>
            <div className="text-sm text-[#8b4513]">
              <p>📧 info@freeproplist.com</p>
              <p>📞 +91 9512901356</p>
              <p>📍 Ahmedabad, Gujarat, India</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[#ff4500] font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                  Search Properties
                </Link>
              </li>
              <li>
                <Link to="/list-property" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                  List Property
                </Link>
              </li>
              <li>
                <Link to="/ai" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                  AI Tools
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => handleMissingLink('/agent/resume')}
                  className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors text-left"
                >
                  Agent Resume
                </button>
              </li>
            </ul>
          </div>

          {/* AI Services */}
          <div className="space-y-4">
            <h4 className="text-[#ff4500] font-semibold mb-2">AI Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/tools/ai-pricing" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                  Smart Pricing
                </Link>
              </li>
              <li>
                <Link to="/tools/ai-video" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                  Video Generation
                </Link>
              </li>
              <li>
                <Link to="/tools/ai-fraud-detection" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                  Fraud Detection
                </Link>
              </li>
              <li>
                <Link to="/tools/locality-report" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                  Locality Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h4 className="text-[#ff4500] font-semibold mb-2">Legal & Support</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleMissingLink('/legal/privacy')}
                  className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleMissingLink('/legal/terms')}
                  className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleMissingLink('/legal/cookies')}
                  className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors text-left"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleMissingLink('/support/help')}
                  className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors text-left"
                >
                  Help Center
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#ff4500] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-[#2d0000]/80">
              © 2025 FreePropList. All rights reserved. Made with ❤️ in India.
            </p>
            <div className="flex space-x-6">
              <button className="text-[#8b4513] hover:text-[#ff4500] transition-colors">
                <span className="sr-only">Twitter</span>
                <div className="h-5 w-5 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded"></div>
              </button>
              <button className="text-[#8b4513] hover:text-[#ff4500] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <div className="h-5 w-5 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded"></div>
              </button>
              <button className="text-[#8b4513] hover:text-[#ff4500] transition-colors">
                <span className="sr-only">Instagram</span>
                <div className="h-5 w-5 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
