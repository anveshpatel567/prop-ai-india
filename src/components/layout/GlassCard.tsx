
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
    <div className={`glass-card p-6 ${hover ? 'glow-hover' : ''} ${className} fade-in`}>
      {children}
    </div>
  );
};
