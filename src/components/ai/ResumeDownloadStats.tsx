
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Calendar } from 'lucide-react';
import { useResumeLogs } from '@/hooks/useResumeLogs';

export const ResumeDownloadStats: React.FC = () => {
  const { logs, loading } = useResumeLogs();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">Loading resume statistics...</div>
        </CardContent>
      </Card>
    );
  }

  const totalDownloads = logs.length;
  const recentDownloads = logs.filter(log => 
    new Date(log.downloaded_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <div className="space-y-4">
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <FileText className="mr-2 h-5 w-5" />
            Resume Download Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{totalDownloads}</div>
              <div className="text-sm text-gray-600">Total Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{recentDownloads}</div>
              <div className="text-sm text-gray-600">This Week</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-gray-700">Recent Downloads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Download className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">{log.resume_type}</span>
                  <Badge variant="outline">{log.resume_type}</Badge>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(log.downloaded_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
