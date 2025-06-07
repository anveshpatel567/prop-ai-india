
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="glass-card border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="text-accent-blue font-rajdhani font-bold text-lg">FreePropList</span>
            </div>
            <p className="text-text-muted text-sm font-dmsans">
              India's premier AI-enhanced real estate platform. Find your dream property with smart search and verified listings.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-rajdhani font-semibold text-text-primary">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/search" className="block text-text-muted hover:text-accent-blue text-sm font-dmsans">
                Search Properties
              </Link>
              <Link to="/list-property" className="block text-text-muted hover:text-accent-blue text-sm font-dmsans">
                List Property
              </Link>
              <Link to="/ai" className="block text-text-muted hover:text-accent-blue text-sm font-dmsans">
                AI Tools
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-rajdhani font-semibold text-text-primary">Services</h3>
            <div className="space-y-2">
              <span className="block text-text-muted text-sm font-dmsans">Property Valuation</span>
              <span className="block text-text-muted text-sm font-dmsans">Agent Matching</span>
              <span className="block text-text-muted text-sm font-dmsans">Legal Assistance</span>
              <span className="block text-text-muted text-sm font-dmsans">Home Loans</span>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-rajdhani font-semibold text-text-primary">Contact</h3>
            <div className="space-y-2">
              <p className="text-text-muted text-sm font-dmsans">Email: support@freeproplist.com</p>
              <p className="text-text-muted text-sm font-dmsans">Phone: +91 8888-999-000</p>
              <p className="text-text-muted text-sm font-dmsans">
                Address: Mumbai, Maharashtra, India
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-text-muted text-sm font-dmsans">
            © 2025 FreePropList. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};
