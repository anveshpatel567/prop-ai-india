
import React from 'react';

// All auth icons replaced with styled text placeholders
export const MailPlaceholder: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <div className={`${className} bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded flex items-center justify-center text-white font-bold text-xs`}>
    @
  </div>
);

export const LockPlaceholder: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <div className={`${className} bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded flex items-center justify-center text-white font-bold text-xs`}>
    L
  </div>
);

export const EyePlaceholder: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <div className={`${className} bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded flex items-center justify-center text-white font-bold text-xs`}>
    👁
  </div>
);

export const EyeOffPlaceholder: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <div className={`${className} bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded flex items-center justify-center text-white font-bold text-xs`}>
    X
  </div>
);

export const FirePlaceholder: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <div className={`${className} bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded flex items-center justify-center text-white font-bold text-xs`}>
    F
  </div>
);
