
import React, { useEffect } from 'react';
import { ButtonVariant, getValidVariantWithConfig } from '../../utils/buttonVariants';
import { useButtonControl, logButtonUsage } from '../../hooks/useButtonControl';

interface ButtonGradientProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  page?: string;
}

export const ButtonGradient: React.FC<ButtonGradientProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  page = 'default'
}) => {
  const { data: buttonConfig } = useButtonControl(page);
  
  const validVariant = buttonConfig 
    ? getValidVariantWithConfig(variant, buttonConfig.allowed_variants, buttonConfig.fallback_variant)
    : variant;

  const baseClasses = 'font-rajdhani font-medium rounded-xl transition-all duration-300 glow-hover border';
  
  const variantClasses = {
    primary: 'fire-gradient text-white border-orange-400/30 fire-glow',
    secondary: 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200 hover:shadow-md',
    glass: 'glass-button text-fire-primary border-fire-gold hover:bg-white/30 hover:shadow-lg'
  };
  
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };

  const handleClick = () => {
    // Log button usage
    logButtonUsage(page, validVariant);
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[validVariant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};
