
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

export function SchemaFieldWarnings({ 
  warnings 
}: { 
  warnings: Array<{
    field: string;
    type: string;
    message: string;
    severity: string;
  }>;
}) {
  if (warnings.length === 0) return null;

  const getIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getBorderColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const groupedWarnings = warnings.reduce((acc, warning) => {
    if (!acc[warning.severity]) {
      acc[warning.severity] = [];
    }
    acc[warning.severity].push(warning);
    return acc;
  }, {} as Record<string, typeof warnings>);

  return (
    <div className="space-y-3">
      {Object.entries(groupedWarnings).map(([severity, severityWarnings]) => (
        <Card key={severity} className={getBorderColor(severity)}>
          <CardContent className="p-4">
            <div className="space-y-3">
              {severityWarnings.map((warning, index) => (
                <div key={index} className="flex items-start gap-3">
                  {getIcon(warning.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm capitalize">
                        {warning.severity}
                      </span>
                      <span className="text-xs text-gray-500">
                        {warning.field}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{warning.message}</p>
                    {warning.type && (
                      <div className="mt-1">
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">
                          {warning.type}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
