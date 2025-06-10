
import React from 'react';
import { Button } from '@/components/ui/button';

interface BrochureModeSelectorProps {
  mode: 'manual' | 'ai';
  onModeChange: (mode: 'manual' | 'ai') => void;
}

export const BrochureModeSelector: React.FC<BrochureModeSelectorProps> = ({
  mode,
  onModeChange
}) => {
  return (
    <div className="flex gap-4">
      <Button
        variant={mode === 'manual' ? 'default' : 'outline'}
        onClick={() => onModeChange('manual')}
      >
        Manual Upload Only
      </Button>
      <Button
        variant={mode === 'ai' ? 'default' : 'outline'}
        onClick={() => onModeChange('ai')}
      >
        AI Parse & Extract
      </Button>
    </div>
  );
};
