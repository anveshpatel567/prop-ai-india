
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { UserWalletBadge } from '@/components/common/UserWalletBadge';
import { LayoutDashboard, Brain, BarChart3, Settings, User, LogOut } from 'lucide-react';
import { useMountReady } from '@/hooks/useMountReady';

export const Navbar: React.FC = () => {
  const isReady = useMountReady();
  
  // Don't render anything until fully mounted and ready
  if (!isReady) {
    return null;
  }

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#fff7f0] shadow-[0_0_20px_rgba(255,102,0,0.25)] border-b border-[#ff4500] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] bg-clip-text text-transparent">
              FreePropList
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-2 text-[#ff4500] hover:text-[#2d0000] transition-colors hover:scale-105 duration-200">
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                
                <Link to="/ai" className="flex items-center space-x-2 text-[#ff4500] hover:text-[#2d0000] transition-colors hover:scale-105 duration-200">
                  <Brain className="h-5 w-5" />
                  <span className="hidden sm:inline">AI Tools</span>
                </Link>

                <Link to="/my-ai-usage" className="flex items-center space-x-2 text-[#ff4500] hover:text-[#2d0000] transition-colors hover:scale-105 duration-200">
                  <BarChart3 className="h-5 w-5" />
                  <span className="hidden sm:inline">Usage</span>
                </Link>

                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center space-x-2 text-[#ff4500] hover:text-[#2d0000] transition-colors hover:scale-105 duration-200">
                    <Settings className="h-5 w-5" />
                    <span className="hidden sm:inline">Admin</span>
                  </Link>
                )}

                <UserWalletBadge />

                <Link to="/profile" className="flex items-center space-x-2 text-[#ff4500] hover:text-[#2d0000] transition-colors hover:scale-105 duration-200">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

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
              <Link to="/login">
                <button className="bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-[#fff7f0] font-semibold px-6 py-2 rounded-xl shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 transform hover:scale-105 hover:from-[#ff3c00] hover:to-[#ff6a00]">
                  Start Now
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
