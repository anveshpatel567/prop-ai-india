
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Zap, Download, Loader2 } from 'lucide-react';
import { useMyResume } from '@/hooks/useMyResume';
import { ResumeGeneratorModal } from './ResumeGeneratorModal';

export const AiResumeCard: React.FC = () => {
  const { resume, loading } = useMyResume();
  const [showModal, setShowModal] = useState(false);

  const downloadResume = () => {
    if (resume?.resume_data?.content) {
      const blob = new Blob([resume.resume_data.content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ai-generated-resume.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!resume) {
    return (
      <>
        <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="flex items-center gap-2 justify-center">
              AI Resume Builder
              <Badge variant="secondary" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                100 credits
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Generate a professional real estate agent resume using AI
            </p>
            <Button onClick={() => setShowModal(true)} className="w-full">
              Generate Resume with AI
            </Button>
          </CardContent>
        </Card>

        <ResumeGeneratorModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
        />
      </>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            AI Generated Resume
            <Badge 
              variant={
                resume.status === 'ready' ? 'default' : 
                resume.status === 'generating' ? 'secondary' : 
                'destructive'
              }
            >
              {resume.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resume.status === 'generating' && (
            <div className="text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Generating your professional resume...
              </p>
            </div>
          )}

          {resume.status === 'ready' && (
            <>
              <p className="text-sm text-muted-foreground">
                Your AI-generated resume is ready for download
              </p>
              <Button onClick={downloadResume} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
            </>
          )}

          {resume.status === 'error' && (
            <div className="text-center">
              <p className="text-sm text-destructive mb-2">
                {resume.error_message || 'Failed to generate resume'}
              </p>
              <Button 
                variant="outline" 
                onClick={() => setShowModal(true)}
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          )}

          <div className="text-xs text-muted-foreground border-t pt-2">
            <p>Generated: {new Date(resume.created_at).toLocaleDateString()}</p>
            <p>Credits used: {resume.credits_used}</p>
          </div>
        </CardContent>
      </Card>

      <ResumeGeneratorModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};
