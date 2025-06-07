
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { AiResumeData } from '@/hooks/useAiResume';

interface AgentResumePreviewProps {
  resume: AiResumeData;
}

export default function AgentResumePreview({ resume }: AgentResumePreviewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-blue-500" />
              <CardTitle>{resume.name}</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              Generated {formatDate(resume.created_at)}
            </div>
          </div>
          <CardDescription className="flex gap-2">
            <Badge variant="outline">{resume.experience_years} years experience</Badge>
            <Badge variant="outline">{resume.city}</Badge>
            <Badge variant="outline">{resume.specialization}</Badge>
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Resume</CardTitle>
          <CardDescription>
            Professional resume created using AI based on your profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {resume.resume_markdown}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
