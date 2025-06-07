
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { UserWalletBadge } from '@/components/common/UserWalletBadge';
import { LogOut, Home, User, Zap, BarChart3, Settings } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-orange-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FreePropList
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                
                <Link to="/ai" className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors">
                  <Zap className="h-4 w-4" />
                  <span>AI Tools</span>
                </Link>

                <Link to="/my-ai-usage" className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors">
                  <BarChart3 className="h-4 w-4" />
                  <span>Usage</span>
                </Link>

                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors">
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}

                <UserWalletBadge />

                <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1 border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
