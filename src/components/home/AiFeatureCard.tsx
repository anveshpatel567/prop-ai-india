
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
        return 'from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500';
      case 'verification':
        return 'from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500';
      case 'automation':
        return 'from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500';
      case 'intelligence':
        return 'from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500';
      default:
        return 'from-gray-500 to-gray-600 hover:from-gray-400 hover:to-gray-500';
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative w-full max-w-sm cursor-pointer transition-all duration-300"
    >
      <div className={`relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 
                     transition-all duration-500 ease-out
                     hover:bg-white/20 hover:border-neon-cyan/50
                     hover:shadow-[0_0_30px_rgba(138,35,135,0.4)]
                     group-hover:animate-radial-glow`}>
        
        {/* Icon with gradient background */}
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getCategoryColors()} 
                        flex items-center justify-center text-white text-2xl mb-4
                        group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        
        {/* Content */}
        <h3 className="font-orbitron text-lg font-bold text-white mb-2 
                      group-hover:text-neon-cyan transition-colors duration-300">
          {title}
        </h3>
        
        <p className="font-rajdhani text-sm text-gray-300 leading-relaxed
                     group-hover:text-gray-200 transition-colors duration-300">
          {description}
        </p>

        {/* AI scan line effect on hover */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent 
                       opacity-0 group-hover:opacity-100 group-hover:animate-ai-scan"></div>
      </div>
    </div>
  );
};
