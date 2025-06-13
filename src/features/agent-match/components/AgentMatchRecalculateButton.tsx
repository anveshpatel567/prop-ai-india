
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Sparkles } from 'lucide-react';

export function AgentMatchRecalculateButton({ 
  onRecalculate,
  disabled = false,
  creditsRequired = 5 
}: { 
  onRecalculate: () => Promise<void>;
  disabled?: boolean;
  creditsRequired?: number;
}) {
  const [isRecalculating, setIsRecalculating] = useState<boolean>(false);

  const handleRecalculate = async () => {
    try {
      setIsRecalculating(true);
      await onRecalculate();
    } catch (error) {
      console.error('Recalculation failed:', error);
    } finally {
      setIsRecalculating(false);
    }
  };

  return (
    <Button
      onClick={handleRecalculate}
      disabled={disabled || isRecalculating}
      variant="outline"
      className="flex items-center gap-2"
    >
      {isRecalculating ? (
        <>
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Recalculating...</span>
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          <span>Re-match Agents ({creditsRequired} credits)</span>
        </>
      )}
    </Button>
  );
}
