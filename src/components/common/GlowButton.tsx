
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
  const baseClasses = "transition-all duration-300 font-medium rounded-lg shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transform hover:scale-105";
  
  const variantClasses = {
    ai: "bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-white hover:from-[#ff3c00] hover:to-[#ff6a00]",
    manual: "bg-[#fff7f0] text-[#ff4500] border border-[#ff4500] hover:bg-gradient-to-r hover:from-[#ff3c00] hover:to-[#ff6a00] hover:text-white hover:border-transparent",
    outline: "border-2 border-[#ff4500] text-[#ff4500] hover:bg-gradient-to-r hover:from-[#ff3c00] hover:to-[#ff6a00] hover:text-white hover:border-transparent"
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
