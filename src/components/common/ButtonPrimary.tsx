
import React from 'react';

interface ButtonPrimaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`fire-gradient text-white font-rajdhani font-medium py-3 px-8 rounded-xl 
        glow-hover fire-glow transition-all duration-300 disabled:opacity-50 
        disabled:cursor-not-allowed border border-orange-400/30 ${className}`}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Processing...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
