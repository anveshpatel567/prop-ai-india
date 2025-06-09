
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Brain, FileText, DollarSign, Video, Shield, MapPin, HelpCircle, FileCheck, Cookie, Phone, Mail, MapPin as Location } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleMissingLink = (path: string) => {
    console.log(`Missing page: ${path} - routing to /#coming-soon`);
    window.location.href = '/#coming-soon';
  };

  return (
    <footer className="bg-gradient-to-t from-[#ffe4d6] to-[#fff7f0] border-t border-[#ff4500] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] bg-clip-text text-transparent">
                FreePropList
              </span>
            </div>
            <div className="space-y-4">
              <p className="text-[#8b4513] text-sm leading-relaxed">
                India's premier AI-enhanced real estate platform. Find your dream property with smart search and verified listings.
              </p>
              <div className="space-y-2 text-sm text-[#8b4513]">
                <div className="flex items-center space-x-2 hover:scale-105 transition-all duration-200">
                  <Mail className="h-4 w-4" />
                  <span>info@freeproplist.com</span>
                </div>
                <div className="flex items-center space-x-2 hover:scale-105 transition-all duration-200">
                  <Phone className="h-4 w-4" />
                  <span>+91 9512901356</span>
                </div>
                <div className="flex items-center space-x-2 hover:scale-105 transition-all duration-200">
                  <Location className="h-4 w-4" />
                  <span>Ahmedabad, Gujarat, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[#ff4500] font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/search" className="flex items-center space-x-2 text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors duration-200 hover:scale-105">
                  <Search className="h-4 w-4" />
                  <span>Search Properties</span>
                </Link>
              </li>
              <li>
                <Link to="/list-property" className="flex items-center space-x-2 text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors duration-200 hover:scale-105">
                  <Plus className="h-4 w-4" />
                  <span>List Property</span>
                </Link>
              </li>
              <li>
                <Link to="/ai" className="flex items-center space-x-2 text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors duration-200 hover:scale-105">
                  <Brain className="h-4 w-4" />
                  <span>AI Tools</span>
                </Link>
              </li>
              <li>
                <Link to="/agent/resume" className="flex items-center space-x-2 text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors duration-200 hover:scale-105">
                  <FileText className="h-4 w-4" />
                  <span>Agent Resume</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* AI Services */}
          <div className="space-y-4">
            <h4 className="text-[#ff4500] font-semibold text-base mb-4">AI Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/tools/ai-pricing" className="flex items-center space-x-2 text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors duration-200 hover:scale-105">
                  <DollarSign className="h-4 w-4" />
                  <span>Smart Pricing</span>
                </Link>
              </li>
              <li>
                <Link to="/tools/ai-video" className="flex items-center space-x-2 text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors duration-200 hover:scale-105">
                  <Video className="h-4 w-4" />
                  <span>Video Generation</span>
                </Link>
              </li>
              <li>
                <Link to="/tools/ai-fraud-detection" className="flex items-center space-x-2 text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors duration-200 hover:scale-105">
                  <Shield className="h-4 w-4" />
                  <span>Fraud Detection</span>
                </Link>
              </li>
              <li>
                <Link to="/tools/locality-report" className="flex items-center space-x-2 text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors duration-200 hover:scale-105">
                  <MapPin className="h-4 w-4" />
                  <span>Locality Reports</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h4 className="text-[#ff4500] font-semibold text-base mb-4">Legal & Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/legal/privacy" className="flex items-center space-x-2 text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors duration-200 hover:scale-105">
                  <Shield className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="flex items-center space-x-2 text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors duration-200 hover:scale-105">
                  <FileCheck className="h-4 w-4" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link to="/legal/cookies" className="flex items-center space-x-2 text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors duration-200 hover:scale-105">
                  <Cookie className="h-4 w-4" />
                  <span>Cookie Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/support/help" className="flex items-center space-x-2 text-[#8b4513] hover:text-[#ff4500] text-sm transition-colors duration-200 hover:scale-105">
                  <HelpCircle className="h-4 w-4" />
                  <span>Help Center</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#ff4500] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-[#2d0000]/80">
              © 2025 FreePropList. All rights reserved. Made with ❤️ in India.
            </p>
            <div className="flex space-x-6">
              <button className="text-[#8b4513] hover:text-[#ff4500] transition-colors hover:scale-105 duration-200">
                <span className="sr-only">Twitter</span>
                <div className="h-5 w-5 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded"></div>
              </button>
              <button className="text-[#8b4513] hover:text-[#ff4500] transition-colors hover:scale-105 duration-200">
                <span className="sr-only">LinkedIn</span>
                <div className="h-5 w-5 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded"></div>
              </button>
              <button className="text-[#8b4513] hover:text-[#ff4500] transition-colors hover:scale-105 duration-200">
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
