
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-orange-50 to-white border-t border-orange-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                FreePropList
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              India's premier AI-enhanced real estate platform. Find your dream property with smart search and verified listings.
            </p>
            <div className="text-sm text-gray-500">
              <p>📧 info@freeproplist.com</p>
              <p>📞 +91 9512901356</p>
              <p>📍 Ahmedabad, Gujarat, India</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/search" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">
                Search Properties
              </Link>
              <Link to="/list-property" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">
                List Property
              </Link>
              <Link to="/ai" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">
                AI Tools
              </Link>
              <Link to="/agent/resume" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">
                Agent Resume
              </Link>
            </div>
          </div>

          {/* AI Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">AI Services</h3>
            <div className="space-y-2">
              <Link to="/tools/ai-pricing" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">
                Smart Pricing
              </Link>
              <Link to="/tools/ai-video" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">
                Video Generation
              </Link>
              <Link to="/tools/ai-fraud-detection" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">
                Fraud Detection
              </Link>
              <Link to="/tools/locality-report" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">
                Locality Reports
              </Link>
            </div>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Legal & Support</h3>
            <div className="space-y-2">
              <button className="block text-gray-600 hover:text-orange-600 text-sm transition-colors text-left">
                Privacy Policy
              </button>
              <button className="block text-gray-600 hover:text-orange-600 text-sm transition-colors text-left">
                Terms of Service
              </button>
              <button className="block text-gray-600 hover:text-orange-600 text-sm transition-colors text-left">
                Cookie Policy
              </button>
              <button className="block text-gray-600 hover:text-orange-600 text-sm transition-colors text-left">
                Help Center
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2025 FreePropList. All rights reserved. Made with ❤️ in India.
            </p>
            <div className="flex space-x-6">
              <button className="text-gray-400 hover:text-orange-500 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button className="text-gray-400 hover:text-orange-500 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              <button className="text-gray-400 hover:text-orange-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.926 3.5 13.49 3.5 11.987s.698-2.939 1.626-3.704c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.765 1.626 2.201 1.626 3.704s-.698 2.939-1.626 3.704c-.875.807-2.026 1.297-3.323 1.297z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
