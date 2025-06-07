
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Zap } from 'lucide-react';

export interface ToolAttemptRowProps {
  toolName: string;
  attemptedAt: string;
  wasAllowed: boolean;
  creditsRequired?: number | null;
  reason?: string | null;
  showUserId?: boolean;
  userId?: string;
}

export const ToolAttemptRow: React.FC<ToolAttemptRowProps> = ({
  toolName,
  attemptedAt,
  wasAllowed,
  creditsRequired,
  reason,
  showUserId = false,
  userId
}) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {wasAllowed ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
          <Badge variant="outline">
            {toolName.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="h-3 w-3" />
          {new Date(attemptedAt).toLocaleString()}
        </div>

        {showUserId && userId && (
          <div className="text-xs text-gray-400 font-mono">
            {userId.substring(0, 8)}...
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 text-sm">
        {wasAllowed && creditsRequired && (
          <div className="flex items-center gap-1 text-green-600">
            <Zap className="h-3 w-3" />
            {creditsRequired} credits
          </div>
        )}
        
        <Badge variant={wasAllowed ? "default" : "destructive"}>
          {wasAllowed ? 'Success' : 'Blocked'}
        </Badge>
        
        {reason && (
          <span className="text-gray-500 max-w-xs truncate">
            {reason}
          </span>
        )}
      </div>
    </div>
  );
};
