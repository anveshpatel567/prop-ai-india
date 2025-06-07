
import React from 'react';

interface ButtonGradientProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ButtonGradient: React.FC<ButtonGradientProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-300 glow-hover';
  
  const variantClasses = {
    primary: 'fire-gradient text-white',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800',
    outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'
  };
  
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};
