
import React from 'react';

interface ButtonGradientProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const ButtonGradient: React.FC<ButtonGradientProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  variant = 'primary'
}) => {
  const baseClasses = "font-semibold rounded-xl px-4 py-2 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = variant === 'primary' 
    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:brightness-110"
    : "border border-orange-500 text-orange-500 bg-white hover:bg-orange-50";

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
