
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminAiSummaryCards } from '@/components/admin/AdminAiSummaryCards';
import { AdminToolAnalyticsPanel } from '@/components/admin/AdminToolAnalyticsPanel';
import { ToolAttemptLogPanel } from '@/components/admin/ToolAttemptLogPanel';
import { ToolMisusePanel } from '@/components/admin/ToolMisusePanel';
import { AdminNegotiationAuditPanel } from '@/components/admin/AdminNegotiationAuditPanel';
import { AdminResumeAuditPanel } from '@/components/admin/AdminResumeAuditPanel';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { TestTube } from 'lucide-react';

export default function AiOversightPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Oversight Dashboard</h1>
            <p className="text-gray-600">
              Monitor AI tool usage, detect misuse, and analyze performance metrics
            </p>
          </div>
          <Button
            onClick={() => navigate('/admin/qa-tools')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <TestTube className="h-4 w-4" />
            QA Tools
          </Button>
        </div>

        <AdminAiSummaryCards />

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="attempts">Tool Attempts</TabsTrigger>
            <TabsTrigger value="misuse">Misuse Detection</TabsTrigger>
            <TabsTrigger value="negotiations">Negotiations</TabsTrigger>
            <TabsTrigger value="resumes">Resumes</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <AdminToolAnalyticsPanel />
          </TabsContent>

          <TabsContent value="attempts" className="space-y-6">
            <ToolAttemptLogPanel />
          </TabsContent>

          <TabsContent value="misuse" className="space-y-6">
            <ToolMisusePanel />
          </TabsContent>

          <TabsContent value="negotiations" className="space-y-6">
            <AdminNegotiationAuditPanel />
          </TabsContent>

          <TabsContent value="resumes" className="space-y-6">
            <AdminResumeAuditPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
