
import React from 'react';
import { Button } from '@/components/ui/button';
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
        <Button
          onClick={onReview}
          variant="outline"
          className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Review
        </Button>
        
        <Button
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
        >
          {isSubmitting ? (
            'Submitting...'
          ) : (
            <>
              Submit
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
