
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X, Wallet, User } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

export const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { balance } = useWallet();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  const navigateTo = (path: string) => {
    window.location.href = path;
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigateTo('/')}>
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              FreePropList
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" onClick={() => navigateTo('/search')}>
              Search
            </Button>
            <Button variant="ghost" onClick={() => navigateTo('/list-property')}>
              List Property
            </Button>
            <Button variant="ghost" onClick={() => navigateTo('/ai')}>
              AI Tools
            </Button>
            
            {/* Wallet Balance */}
            {balance && (
              <div className="flex items-center space-x-2 bg-orange-100 px-3 py-1 rounded-full">
                <Wallet className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">
                  {balance.balance} credits
                </span>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-gray-600 hover:text-orange-600"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Auth Buttons */}
            <Button variant="outline" onClick={() => navigateTo('/auth')}>
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-200">
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start" onClick={() => navigateTo('/search')}>
                Search Properties
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => navigateTo('/list-property')}>
                List Property
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => navigateTo('/ai')}>
                AI Tools
              </Button>
              
              {balance && (
                <div className="flex items-center justify-between py-2 px-4 bg-orange-50 rounded-lg">
                  <span className="text-sm font-medium text-orange-700">Credits</span>
                  <span className="text-sm font-bold text-orange-600">{balance.balance}</span>
                </div>
              )}

              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Dark Mode</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>

              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600" onClick={() => navigateTo('/auth')}>
                Login / Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
