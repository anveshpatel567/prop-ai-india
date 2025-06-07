
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAdminAlerts } from '@/hooks/useAdminAlerts';
import { AlertTriangle, Bell, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export function AdminAiAlertsPanel() {
  const { alerts, loading, acknowledgeAlert, unacknowledgedCount } = useAdminAlerts();

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default: return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive' as const;
      case 'warning': return 'secondary' as const;
      default: return 'default' as const;
    }
  };

  const handleAcknowledge = async (alertId: string) => {
    try {
      await acknowledgeAlert(alertId);
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Admin Alerts
          </div>
          {unacknowledgedCount > 0 && (
            <Badge variant="destructive">{unacknowledgedCount} new</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading alerts...</p>
        ) : alerts.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No alerts found</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-3 border rounded-lg ${alert.acknowledged ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 flex-1">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{alert.type}</span>
                        <Badge variant={getSeverityVariant(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        {alert.related_tool && (
                          <Badge variant="outline">{alert.related_tool}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(alert.created_at), 'PPp')}
                      </p>
                    </div>
                  </div>
                  {!alert.acknowledged && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAcknowledge(alert.id)}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Ack
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
