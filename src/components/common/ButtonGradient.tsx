
import React from 'react';

interface ButtonGradientProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  variant?: 'ai' | 'manual';
}

export const ButtonGradient: React.FC<ButtonGradientProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  variant = 'ai'
}) => {
  const baseClasses = "font-semibold rounded-xl px-6 py-3 transition-all duration-300 shadow-[0_0_30px_rgba(255,102,0,0.45)] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transform hover:scale-105";
  
  const variantClasses = variant === 'ai' 
    ? "bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-white hover:from-[#ff3c00] hover:to-[#ff6a00]"
    : "bg-[#fff7f0] border border-[#ff4500] text-[#ff4500] hover:bg-gradient-to-r hover:from-[#ff3c00] hover:to-[#ff6a00] hover:text-white hover:border-transparent";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          <span>Processing...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
