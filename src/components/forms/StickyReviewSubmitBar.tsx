
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

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
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-orange-200 p-3 sm:p-4 shadow-lg z-50 sm:hidden ${className}`}>
      <div className="flex gap-2 max-w-md mx-auto">
        <button
          onClick={onReview}
          className="flex-1 border border-orange-500 text-orange-500 bg-white font-semibold rounded-xl px-4 py-2 hover:bg-orange-50 transition duration-300 flex items-center justify-center"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Review
        </button>
        
        <button
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl px-4 py-2 hover:brightness-110 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            'Submitting...'
          ) : (
            <>
              Submit
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
