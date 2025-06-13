
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Info, MessageCircle } from 'lucide-react';

export function ToolBetaBanner({ 
  toolName,
  onFeedback,
  onDismiss,
  isDismissible = true 
}: { 
  toolName: string;
  onFeedback?: () => void;
  onDismiss?: () => void;
  isDismissible?: boolean;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  BETA
                </Badge>
                <span className="font-medium text-blue-900">{toolName} is in Beta</span>
              </div>
              <p className="text-sm text-blue-700">
                This tool is currently in beta testing. Features may change and you might encounter occasional issues. 
                Your feedback helps us improve!
              </p>
              {onFeedback && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onFeedback}
                  className="text-blue-700 border-blue-300 hover:bg-blue-100"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Share Feedback
                </Button>
              )}
            </div>
          </div>
          
          {isDismissible && onDismiss && (
            <button
              onClick={handleDismiss}
              className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-full p-1 transition-colors"
              aria-label="Dismiss beta notice"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
