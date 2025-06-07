import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { Building2 } from 'lucide-react';
import { UserWalletBadge } from '@/components/common/UserWalletBadge';

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
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-accent-cyan rounded-xl flex items-center justify-center 
                           shadow-card group-hover:shadow-glow-blue group-hover:scale-105 transition-all duration-300">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <span className="font-rajdhani font-bold text-2xl bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">
              FreePropList
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/search" className="text-text-secondary hover:text-accent-blue transition-colors font-dmsans font-medium">
              Search
            </Link>
            <Link to="/list-property" className="text-text-secondary hover:text-accent-blue transition-colors font-dmsans font-medium">
              List Property
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className="text-text-secondary hover:text-accent-blue transition-colors font-dmsans font-medium">
                  Dashboard
                </Link>
                <Link to="/ai" className="text-text-secondary hover:text-accent-blue transition-colors font-dmsans font-medium">
                  AI Tools
                </Link>
              </>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <UserWalletBadge />
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-cyan rounded-full flex items-center justify-center shadow-card">
                      <span className="text-white text-sm font-rajdhani font-bold">
                        {user.full_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="hidden md:block font-dmsans font-medium">{user.full_name}</span>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 glass-card-light border border-gray-200 rounded-xl z-50 shadow-card">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-3 text-sm text-text-secondary hover:bg-gray-50 hover:text-accent-blue rounded-xl font-dmsans"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/ai"
                        className="block px-4 py-3 text-sm text-text-secondary hover:bg-gray-50 hover:text-accent-blue rounded-xl font-dmsans"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        AI Tools
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-xl font-dmsans"
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
                  <button className="glass-card-subtle text-text-primary font-dmsans font-medium 
                                   py-2 px-6 rounded-xl border border-gray-200
                                   hover:bg-gray-50 hover:border-accent-blue/50 transition-all duration-300">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn-primary">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
