
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { useAiResume } from '@/hooks/useAiResume';

export const AdminResumeAuditPanel: React.FC = () => {
  const { data: resumes, loading, fetchUserResume } = useAiResume();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'default';
      case 'generating': return 'secondary';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  const mockResumes = [
    {
      id: '1',
      user_id: 'user1',
      status: 'ready',
      credits_used: 100,
      created_at: new Date().toISOString(),
      resume_data: { content: 'Sample resume content' }
    },
    {
      id: '2',
      user_id: 'user2',
      status: 'generating',
      credits_used: 100,
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      user_id: 'user3',
      status: 'error',
      credits_used: 100,
      created_at: new Date().toISOString(),
      error_message: 'OpenAI API error'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resume Generation Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {loading ? (
                <div className="text-center text-muted-foreground">Loading...</div>
              ) : (
                <div className="space-y-3">
                  {mockResumes.map((resume) => (
                    <div key={resume.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          Resume #{resume.id}
                        </span>
                        <Badge variant={getStatusColor(resume.status)}>
                          {resume.status}
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>User: {resume.user_id}</p>
                        <p>Credits: {resume.credits_used}</p>
                        <p>Created: {new Date(resume.created_at).toLocaleDateString()}</p>
                      </div>

                      {resume.status === 'error' && (
                        <div className="text-xs text-destructive bg-destructive/10 p-2 rounded">
                          Error: {(resume as any).error_message}
                        </div>
                      )}

                      <div className="flex gap-2">
                        {resume.status === 'ready' && (
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        )}
                        {resume.status === 'error' && (
                          <Button size="sm" variant="outline">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Retry
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Resume Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Generated</span>
                <Badge variant="outline">{mockResumes.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Success Rate</span>
                <Badge variant="default">
                  {Math.round((mockResumes.filter(r => r.status === 'ready').length / mockResumes.length) * 100)}%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Failed</span>
                <Badge variant="destructive">
                  {mockResumes.filter(r => r.status === 'error').length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {mockResumes.filter(r => r.status === 'error').length > 0 && (
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>{mockResumes.filter(r => r.status === 'error').length} failed generations</span>
                </div>
              )}
              {mockResumes.filter(r => r.status === 'generating').length > 0 && (
                <div className="flex items-center gap-2 text-orange-600">
                  <RefreshCw className="h-4 w-4" />
                  <span>{mockResumes.filter(r => r.status === 'generating').length} in progress</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
