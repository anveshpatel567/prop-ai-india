
import React from 'react';
import { Link } from 'react-router-dom';
import { GlowButton } from '@/components/common/GlowButton';
import { GoBackHomeButton } from '@/components/ui/GoBackHomeButton';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text">
            404
          </h1>
          <div className="text-2xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </div>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="space-y-4">
          <GoBackHomeButton variant="primary" className="w-full sm:w-auto" />
          
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <Link to="/search">
              <GlowButton variant="outline" className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none hover:shadow-lg hover:shadow-orange-500/30">
                Search Properties
              </GlowButton>
            </Link>
            <Link to="/listing/all">
              <GlowButton variant="outline" className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                Explore Properties
              </GlowButton>
            </Link>
            <Link to="/login">
              <GlowButton variant="outline" className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                Login / Register
              </GlowButton>
            </Link>
          </div>
        </div>
        
        <div className="mt-12 animate-pulse">
          <div className="text-6xl mb-4">🏠</div>
          <p className="text-gray-500 text-sm">
            Looking for properties? Try our search instead!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
