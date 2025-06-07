
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
    <nav className="glass-card sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 fire-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-fire font-bold text-xl">FreePropList</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/search" className="text-gray-700 hover:text-orange-500 transition-colors">
              Search
            </Link>
            <Link to="/list-property" className="text-gray-700 hover:text-orange-500 transition-colors">
              List Property
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-orange-500 transition-colors">
                  Dashboard
                </Link>
                <Link to="/ai" className="text-gray-700 hover:text-orange-500 transition-colors">
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
                  <div className="glass-card px-3 py-1 text-sm">
                    <span className="text-fire font-medium">{balance.balance} Credits</span>
                  </div>
                )}
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-orange-500"
                  >
                    <div className="w-8 h-8 fire-gradient rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.full_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="hidden md:block">{user.full_name}</span>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 glass-card border border-white/10">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/ai"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        AI Tools
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <ButtonGradient variant="outline" size="sm">
                    Login
                  </ButtonGradient>
                </Link>
                <Link to="/register">
                  <ButtonGradient size="sm">
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
