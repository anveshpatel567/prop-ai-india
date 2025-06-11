
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GoBackHomeButtonProps {
  className?: string;
  variant?: 'primary' | 'outline';
}

export const GoBackHomeButton: React.FC<GoBackHomeButtonProps> = ({
  className = '',
  variant = 'outline'
}) => {
  console.log('GoBackHomeButton rendering...');
  
  // Add safety check for router context
  let location;
  let hasRouterContext = true;
  
  try {
    location = useLocation();
    console.log('Current location:', location.pathname);
  } catch (error) {
    console.error('Router context not available:', error);
    hasRouterContext = false;
  }

  // If no router context, render fallback button
  if (!hasRouterContext) {
    console.log('Rendering fallback button without router context');
    
    if (variant === 'primary') {
      return (
        <Button 
          onClick={() => window.location.href = '/'}
          className={`bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 ${className}`}
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      );
    }

    return (
      <Button 
        onClick={() => window.location.href = '/'}
        variant="outline"
        className={`border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 ${className}`}
      >
        <Home className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
    );
  }

  // Render with router context
  if (variant === 'primary') {
    return (
      <Link to="/">
        <Button 
          className={`bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 ${className}`}
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    );
  }

  return (
    <Link to="/">
      <Button 
        variant="outline"
        className={`border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 ${className}`}
      >
        <Home className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
    </Link>
  );
};
