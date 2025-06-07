
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LocalityReportData } from '@/hooks/useLocalityReport';
import { MapPin } from 'lucide-react';

interface LocalityReportPreviewProps {
  report: LocalityReportData;
}

export default function LocalityReportPreview({ report }: LocalityReportPreviewProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            <CardTitle>{report.locality}, {report.city}</CardTitle>
          </div>
          <Badge variant="secondary">
            {new Date(report.created_at).toLocaleDateString()}
          </Badge>
        </div>
        <CardDescription>
          AI-generated locality analysis and report
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <div 
            className="space-y-4"
            dangerouslySetInnerHTML={{
              __html: report.report_markdown
                .replace(/^# /gm, '<h1 class="text-2xl font-bold mt-6 mb-4">')
                .replace(/^## /gm, '<h2 class="text-xl font-semibold mt-5 mb-3">')
                .replace(/^### /gm, '<h3 class="text-lg font-medium mt-4 mb-2">')
                .replace(/^\- /gm, '<li class="ml-4">• ')
                .replace(/\n\n/g, '</p><p class="mb-4">')
                .replace(/^(?!<)/gm, '<p class="mb-4">')
                .replace(/<p class="mb-4">(<h[1-3])/g, '$1')
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
