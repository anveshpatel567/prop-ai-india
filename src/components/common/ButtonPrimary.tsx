
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
      className={`bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl px-4 py-2 hover:brightness-110 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
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
