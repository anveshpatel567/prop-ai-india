
import React from 'react';

interface StickyReviewSubmitBarProps {
  onReview: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  canSubmit: boolean;
  className?: string;
}

export const StickyReviewSubmitBar: React.FC<StickyReviewSubmitBarProps> = ({
  onReview,
  onSubmit,
  isSubmitting,
  canSubmit,
  className = ''
}) => {
  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-[#fff7f0] border-t border-[#ff4500] p-3 sm:p-4 shadow-[0_0_30px_rgba(255,102,0,0.45)] z-50 sm:hidden ${className}`}>
      <div className="flex gap-2 max-w-md mx-auto">
        <button
          onClick={onReview}
          className="flex-1 border border-[#ff4500] text-[#ff4500] bg-[#fff7f0] font-semibold rounded-xl px-4 py-2 hover:bg-gradient-to-r hover:from-[#ff3c00] hover:to-[#ff6a00] hover:text-white transition duration-300 flex items-center justify-center"
        >
          ✓ Review
        </button>
        
        <button
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          className="flex-1 bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-white font-semibold rounded-xl px-4 py-2 hover:from-[#ff3c00] hover:to-[#ff6a00] transition duration-300 shadow-[0_0_30px_rgba(255,102,0,0.45)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            'Submitting...'
          ) : (
            <>
              Submit →
            </>
          )}
        </button>
      </div>
    </div>
  );
};
