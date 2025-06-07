
import React from 'react';
import { Lock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BuyCreditsCta } from './BuyCreditsCta';

interface LockedToolCardProps {
  toolName: string;
  title: string;
  description: string;
  creditsRequired: number;
  onUnlock?: () => void;
}

export const LockedToolCard: React.FC<LockedToolCardProps> = ({
  toolName,
  title,
  description,
  creditsRequired,
  onUnlock
}) => {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10" />
      
      <CardHeader className="relative z-20">
        <CardTitle className="flex items-center gap-2 text-gray-600">
          <Lock className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-20 space-y-4">
        <p className="text-sm text-gray-600">{description}</p>
        
        <div className="flex items-center gap-2 text-sm font-medium text-amber-600">
          <Zap className="h-4 w-4" />
          {creditsRequired} credits required
        </div>
        
        <BuyCreditsCta 
          toolName={toolName}
          creditsNeeded={creditsRequired}
          variant="outline"
          className="w-full"
        />
      </CardContent>
    </Card>
  );
};
