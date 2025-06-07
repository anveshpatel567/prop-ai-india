
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AiToolTogglePanel } from './AiToolTogglePanel';
import { AdminAiCreditsPanel } from './AdminAiCreditsPanel';
import { AdminAiAlertsPanel } from './AdminAiAlertsPanel';
import { Settings } from 'lucide-react';

export function AdminAiControlPanel() {
  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            AI System Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Manage AI tools, monitor credit usage, and handle system alerts.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1">
              <AiToolTogglePanel />
            </div>
            <div className="xl:col-span-2">
              <AdminAiCreditsPanel />
            </div>
          </div>
          
          <div className="mt-6">
            <AdminAiAlertsPanel />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
