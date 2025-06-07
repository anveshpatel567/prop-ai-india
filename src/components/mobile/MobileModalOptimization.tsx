
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface MobileOptimizedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const MobileOptimizedModal: React.FC<MobileOptimizedModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "w-[95vw] max-w-md mx-auto",
          "max-h-[90vh] overflow-y-auto",
          "p-4 md:p-6",
          "rounded-lg",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// HOC for making existing modals mobile-optimized
export function withMobileOptimization<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function MobileOptimizedComponent(props: T) {
    return (
      <div className="mobile-modal-container">
        <style>
          {`
            .mobile-modal-container .DialogContent {
              width: 95vw !important;
              max-width: 28rem !important;
              margin: auto !important;
              max-height: 90vh !important;
              overflow-y: auto !important;
            }
            
            @media (min-width: 768px) {
              .mobile-modal-container .DialogContent {
                width: auto !important;
                max-width: 32rem !important;
              }
            }
          `}
        </style>
        <WrappedComponent {...props} />
      </div>
    );
  };
}
