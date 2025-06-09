
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
      className={`bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-[#fff7f0] font-semibold rounded-xl px-4 py-2 hover:from-[#ff3c00] hover:to-[#ff6a00] transition-all duration-300 shadow-[0_0_30px_rgba(255,102,0,0.45)] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transform hover:scale-105 ${className}`}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-[#fff7f0] border-t-transparent rounded-full animate-spin"></div>
          <span>Processing...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
