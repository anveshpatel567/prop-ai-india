
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { ButtonGradient } from '../common/ButtonGradient';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { balance } = useWallet();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-navbar sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 fire-gradient rounded-xl flex items-center justify-center fire-glow group-hover:scale-105 transition-transform">
              <span className="text-white font-rajdhani font-bold text-xl">F</span>
            </div>
            <span className="fire-gradient-text font-rajdhani font-bold text-2xl">FreePropList</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/search" className="text-gray-700 hover:text-fire-primary transition-colors font-inter font-medium">
              Search
            </Link>
            <Link to="/list-property" className="text-gray-700 hover:text-fire-primary transition-colors font-inter font-medium">
              List Property
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-fire-primary transition-colors font-inter font-medium">
                  Dashboard
                </Link>
                <Link to="/ai" className="text-gray-700 hover:text-fire-primary transition-colors font-inter font-medium">
                  AI Tools
                </Link>
              </>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {balance && (
                  <div className="glass-card px-4 py-2 text-sm">
                    <span className="fire-gradient-text font-rajdhani font-semibold">{balance.balance} Credits</span>
                  </div>
                )}
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-fire-primary transition-colors"
                  >
                    <div className="w-10 h-10 fire-gradient rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-rajdhani font-medium">
                        {user.full_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="hidden md:block font-inter font-medium">{user.full_name}</span>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 glass-card border border-white/30 z-50">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 rounded-lg font-inter"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/ai"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 rounded-lg font-inter"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        AI Tools
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg font-inter"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <ButtonGradient variant="glass" size="sm" page="Navbar">
                    Login
                  </ButtonGradient>
                </Link>
                <Link to="/register">
                  <ButtonGradient variant="primary" size="sm" page="Navbar">
                    Register
                  </ButtonGradient>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
