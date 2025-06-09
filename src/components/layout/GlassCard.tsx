
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = true 
}) => {
  return (
    <div className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6 ${hover ? 'hover:bg-white/20 transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
};
