
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

interface QAResult {
  test: string;
  status: 'passed' | 'failed' | 'warning' | 'running';
  message?: string;
  timestamp: string;
  details?: any;
}

interface QAStatusCardProps {
  title: string;
  results: QAResult[];
  onRunTest?: () => void;
}

export const QAStatusCard: React.FC<QAStatusCardProps> = ({
  title,
  results,
  onRunTest
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'default';
      case 'failed':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'running':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const overallStatus = results.length === 0 ? 'pending' :
    results.some(r => r.status === 'failed') ? 'failed' :
    results.some(r => r.status === 'warning') ? 'warning' :
    results.every(r => r.status === 'passed') ? 'passed' : 'mixed';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(overallStatus)}
            {title}
          </div>
          {onRunTest && (
            <button
              onClick={onRunTest}
              className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Run Test
            </button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground">No tests run yet</p>
          ) : (
            results.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  {getStatusIcon(result.status)}
                  <span className="text-sm font-medium">{result.test}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(result.status)}>
                    {result.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        
        {results.some(r => r.message) && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium">Details:</h4>
            {results.filter(r => r.message).map((result, index) => (
              <div key={index} className="text-xs p-2 bg-muted rounded">
                <strong>{result.test}:</strong> {result.message}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
