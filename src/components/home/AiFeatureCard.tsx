
import React from 'react';

interface AiFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

export const AiFeatureCard: React.FC<AiFeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  href 
}) => {
  const handleClick = () => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative w-32 h-32 sm:w-40 sm:h-40 cursor-pointer animate-float-slow"
    >
      {/* Base glassmorphic card with improved opacity */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl 
                     opacity-60 group-hover:opacity-100
                     transition-all duration-500 ease-out
                     group-hover:ring-2 group-hover:ring-orange-400 
                     group-hover:shadow-[0_0_12px_#ff6a00]
                     group-hover:bg-white/30">
        
        {/* Icon - always visible with improved positioning */}
        <div className="absolute inset-0 flex items-center justify-center text-4xl text-fire-primary
                       transition-all duration-300 group-hover:scale-110 drop-shadow-sm">
          {icon}
        </div>
        
        {/* Content overlay - visible on hover with improved styling */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                       transition-all duration-500 ease-out
                       bg-gradient-to-br from-white/95 via-white/85 to-orange-50/95 
                       backdrop-blur-md rounded-2xl p-4 flex flex-col justify-center">
          
          <h3 className="font-orbitron text-lg font-bold text-gray-800 text-center mb-2 
                        transform translate-y-4 group-hover:translate-y-0 
                        transition-transform duration-300 delay-100 drop-shadow-sm">
            {title}
          </h3>
          
          <p className="font-rajdhani text-sm text-gray-700 text-center leading-tight
                       transform translate-y-4 group-hover:translate-y-0 
                       transition-transform duration-300 delay-200">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
