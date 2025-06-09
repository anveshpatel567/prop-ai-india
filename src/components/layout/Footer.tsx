
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-[#ffe4d6] to-[#fff7f0] border-t border-[#ff4500] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
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
            <h3 className="font-semibold text-[#2d0000]">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/search" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                Search Properties
              </Link>
              <Link to="/list-property" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                List Property
              </Link>
              <Link to="/ai" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                AI Tools
              </Link>
              <Link to="/agent/resume" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                Agent Resume
              </Link>
            </div>
          </div>

          {/* AI Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2d0000]">AI Services</h3>
            <div className="space-y-2">
              <Link to="/tools/ai-pricing" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                Smart Pricing
              </Link>
              <Link to="/tools/ai-video" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                Video Generation
              </Link>
              <Link to="/tools/ai-fraud-detection" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                Fraud Detection
              </Link>
              <Link to="/tools/locality-report" className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors">
                Locality Reports
              </Link>
            </div>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2d0000]">Legal & Support</h3>
            <div className="space-y-2">
              <button className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors text-left">
                Privacy Policy
              </button>
              <button className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors text-left">
                Terms of Service
              </button>
              <button className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors text-left">
                Cookie Policy
              </button>
              <button className="block text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors text-left">
                Help Center
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#ff4500] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#8b4513] text-sm">
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
