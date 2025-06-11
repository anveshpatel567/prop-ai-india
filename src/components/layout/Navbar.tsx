
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { UserWalletBadge } from '@/components/common/UserWalletBadge';
import { LayoutDashboard, Brain, BarChart3, Settings, User, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  
  // Add safety check for router context
  let navigate;
  try {
    navigate = useNavigate();
  } catch (error) {
    console.error('Router context not available in Navbar:', error);
    // Fallback navigation function
    navigate = (path: string) => {
      window.location.href = path;
    };
  }

  const handleLogout = async () => {
    await logout();
    if (typeof navigate === 'function') {
      navigate('/');
    } else {
      window.location.href = '/';
    }
  };

  const NavLink: React.FC<{ to: string; children: React.ReactNode; className?: string }> = ({ to, children, className }) => {
    try {
      return (
        <Link to={to} className={className}>
          {children}
        </Link>
      );
    } catch (error) {
      console.error('Link component error:', error);
      return (
        <a href={to} className={className}>
          {children}
        </a>
      );
    }
  };

  return (
    <nav className="bg-[#fff7f0] shadow-[0_0_20px_rgba(255,102,0,0.25)] border-b border-[#ff4500] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] bg-clip-text text-transparent">
              FreePropList
            </div>
          </NavLink>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <NavLink to="/dashboard" className="flex items-center space-x-2 text-[#ff4500] hover:text-[#2d0000] transition-colors hover:scale-105 duration-200">
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </NavLink>
                
                <NavLink to="/ai" className="flex items-center space-x-2 text-[#ff4500] hover:text-[#2d0000] transition-colors hover:scale-105 duration-200">
                  <Brain className="h-5 w-5" />
                  <span className="hidden sm:inline">AI Tools</span>
                </NavLink>

                <NavLink to="/my-ai-usage" className="flex items-center space-x-2 text-[#ff4500] hover:text-[#2d0000] transition-colors hover:scale-105 duration-200">
                  <BarChart3 className="h-5 w-5" />
                  <span className="hidden sm:inline">Usage</span>
                </NavLink>

                {user.user_metadata?.role === 'admin' && (
                  <NavLink to="/admin" className="flex items-center space-x-2 text-[#ff4500] hover:text-[#2d0000] transition-colors hover:scale-105 duration-200">
                    <Settings className="h-5 w-5" />
                    <span className="hidden sm:inline">Admin</span>
                  </NavLink>
                )}

                <UserWalletBadge />

                <NavLink to="/profile" className="flex items-center space-x-2 text-[#ff4500] hover:text-[#2d0000] transition-colors hover:scale-105 duration-200">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">Profile</span>
                </NavLink>

                <Button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-[#fff7f0] hover:from-[#ff3c00] hover:to-[#ff6a00] shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 transform hover:scale-105"
                  size="sm"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">Exit</span>
                </Button>
              </>
            ) : (
              <NavLink to="/login">
                <button className="bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-[#fff7f0] font-semibold px-6 py-2 rounded-xl shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 transform hover:scale-105 hover:from-[#ff3c00] hover:to-[#ff6a00]">
                  Start Now
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
