
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Zap } from 'lucide-react';
import { BuyCreditsCta } from './BuyCreditsCta';

interface LockedToolCardProps {
  toolName: string;
  title: string;
  description: string;
  creditsRequired: number;
  onAttempt?: () => void;
}

export const LockedToolCard: React.FC<LockedToolCardProps> = ({
  toolName,
  title,
  description,
  creditsRequired,
  onAttempt
}) => {
  return (
    <Card className="border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors" onClick={onAttempt}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-600">
          <Lock className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{description}</p>
        
        {creditsRequired > 0 && (
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              {creditsRequired} Credits
            </Badge>
          </div>
        )}
        
        <BuyCreditsCta 
          toolName={toolName}
          creditsNeeded={creditsRequired}
          className="w-full"
          size="sm"
        />
      </CardContent>
    </Card>
  );
};
