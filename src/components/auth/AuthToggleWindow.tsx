
import React, { useEffect } from 'react';
import { AuthFormCard } from './AuthFormCard';

interface AuthToggleWindowProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AuthToggleWindow: React.FC<AuthToggleWindowProps> = ({ 
  isOpen = true, 
  onClose 
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 warm-gradient"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-[420px] animate-scale-up">
        <AuthFormCard />
      </div>
    </div>
  );
};
