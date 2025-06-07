
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { AlertTriangle, Zap } from 'lucide-react';
import { BuyCreditsCta } from './BuyCreditsCta';
import { useWallet } from '@/context/WalletContext';

interface InsufficientCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  toolTitle: string;
  creditsRequired: number;
}

export const InsufficientCreditsModal: React.FC<InsufficientCreditsModalProps> = ({
  isOpen,
  onClose,
  toolName,
  toolTitle,
  creditsRequired
}) => {
  const { balance } = useWallet();
  const currentCredits = balance?.balance || 0;
  const creditsNeeded = creditsRequired - currentCredits;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Insufficient Credits
          </DialogTitle>
          <DialogDescription>
            You need more credits to use this AI feature.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium">{toolTitle}</h4>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Credits required:</span>
              <span className="font-medium flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {creditsRequired}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Your current balance:</span>
              <span className="font-medium flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {currentCredits}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm border-t pt-2">
              <span className="text-gray-600">Credits needed:</span>
              <span className="font-medium text-red-600 flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {creditsNeeded}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <BuyCreditsCta 
              toolName={toolName}
              creditsNeeded={creditsNeeded}
              className="flex-1"
            />
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
