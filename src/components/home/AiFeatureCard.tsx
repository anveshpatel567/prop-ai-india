
import React from 'react';

interface AiFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: 'analysis' | 'verification' | 'automation' | 'intelligence';
  href: string;
}

export const AiFeatureCard: React.FC<AiFeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  category,
  href 
}) => {
  const handleClick = () => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategoryColors = () => {
    switch (category) {
      case 'analysis':
        return 'from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500';
      case 'verification':
        return 'from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500';
      case 'automation':
        return 'from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400';
      case 'intelligence':
        return 'from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400';
      default:
        return 'from-gray-500 to-gray-600 hover:from-gray-400 hover:to-gray-500';
    }
  };

  const getCategoryGlow = () => {
    switch (category) {
      case 'analysis':
        return 'hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]';
      case 'verification':
        return 'hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]';
      case 'automation':
        return 'hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]';
      case 'intelligence':
        return 'hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]';
      default:
        return 'hover:shadow-[0_0_20px_rgba(107,114,128,0.3)]';
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative w-full max-w-sm cursor-pointer transition-all duration-300"
    >
      <div className={`glass-card-light rounded-2xl p-6 
                     transition-all duration-500 ease-out
                     hover:glass-card-subtle
                     ${getCategoryGlow()}
                     group-hover:scale-105`}>
        
        {/* Icon with gradient background */}
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getCategoryColors()} 
                        flex items-center justify-center text-white text-2xl mb-4
                        group-hover:scale-110 transition-transform duration-300 shadow-card`}>
          {icon}
        </div>
        
        {/* Content */}
        <h3 className="font-orbitron text-lg font-bold text-text-primary mb-2 
                      group-hover:text-accent-blue transition-colors duration-300">
          {title}
        </h3>
        
        <p className="font-rajdhani text-sm text-text-secondary leading-relaxed
                     group-hover:text-text-primary transition-colors duration-300">
          {description}
        </p>

        {/* Hover scan line effect */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-blue to-transparent 
                       opacity-0 group-hover:opacity-100 group-hover:animate-ai-scan"></div>
      </div>
    </div>
  );
};
