
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAiRuleViolations } from '@/hooks/useAiRuleViolations';
import { Loader2, AlertTriangle } from 'lucide-react';

export function AiRuleViolationsPanel() {
  const { violations, loading } = useAiRuleViolations();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          AI Rule Violations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {violations.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No rule violations recorded.
              </p>
            ) : (
              violations.map((violation) => (
                <div key={violation.id} className="p-4 border rounded-lg bg-red-50 border-red-200">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-red-900">
                        {violation.ai_enforcement_rules?.rule_name || 'Unknown Rule'}
                      </h3>
                      <Badge variant={violation.auto_action_taken ? "destructive" : "secondary"}>
                        {violation.auto_action_taken ? "Auto-Actioned" : "Logged Only"}
                      </Badge>
                    </div>
                    <p className="text-sm text-red-700">
                      Module: {violation.ai_enforcement_rules?.target_module || 'Unknown'}
                    </p>
                    <p className="text-sm text-red-700">
                      Offending Value: {violation.offending_value.length > 100 
                        ? `${violation.offending_value.substring(0, 100)}...`
                        : violation.offending_value
                      }
                    </p>
                    <p className="text-xs text-red-600">
                      Detected: {new Date(violation.detected_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
