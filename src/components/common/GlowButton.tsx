
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'ai' | 'manual' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  onClick,
  variant = 'ai',
  size = 'md',
  className,
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = "transition-all duration-300 font-medium rounded-lg shadow-lg hover:shadow-xl";
  
  const variantClasses = {
    ai: "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:brightness-110 hover:shadow-orange-500/25",
    manual: "bg-orange-100 text-orange-600 border border-orange-300 hover:bg-orange-50 hover:shadow-orange-500/25",
    outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-orange-500/25"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </Button>
  );
};
