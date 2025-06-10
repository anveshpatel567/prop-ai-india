
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
    }
  }, []);

  // Don't render Link until mounted to prevent router context crashes
  if (!mounted) {
    return (
      <Button 
        className={`border-2 border-orange-500 text-orange-500 ${className}`}
        disabled
      >
        <Home className="mr-2 h-4 w-4" />
        Loading...
      </Button>
    );
  }

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
