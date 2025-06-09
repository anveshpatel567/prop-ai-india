
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
    <div className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_0_30px_rgba(255,102,0,0.45)] p-6 ${hover ? 'hover:bg-white/20 hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 transform hover:scale-105' : ''} ${className}`}>
      {children}
    </div>
  );
};
