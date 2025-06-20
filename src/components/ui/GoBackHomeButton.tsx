
import React from 'react';
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
  
  const handleClick = () => {
    window.location.href = '/';
  };

  if (variant === 'primary') {
    return (
      <Button 
        onClick={handleClick}
        className={`bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 ${className}`}
      >
        <Home className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleClick}
      variant="outline"
      className={`border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 ${className}`}
    >
      <Home className="mr-2 h-4 w-4" />
      Back to Home
    </Button>
  );
};
