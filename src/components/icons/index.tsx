
import React from 'react';

// All icons removed - using text-based indicators only
export const BuildingPlaceholder: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <div className={`${className} bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold`}>
    B
  </div>
);

export const SearchPlaceholder: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <div className={`${className} bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold`}>
    S
  </div>
);

export const DocumentPlaceholder: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <div className={`${className} bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold`}>
    D
  </div>
);

export const ShieldPlaceholder: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <div className={`${className} bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold`}>
    P
  </div>
);

export const ZapPlaceholder: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <div className={`${className} bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold`}>
    Z
  </div>
);

export const BrainPlaceholder: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <div className={`${className} bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold`}>
    AI
  </div>
);

export const ScanPlaceholder: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <div className={`${className} bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold`}>
    SC
  </div>
);

export const UsersPlaceholder: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <div className={`${className} bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold`}>
    U
  </div>
);
