
import React from 'react';
import { AiVideoGeneratorCard } from '@/components/ai/AiVideoGeneratorCard';
import { useAiVideoJobs } from '@/hooks/useAiVideoJobs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Video, Download, ExternalLink } from 'lucide-react';

export default function AiVideoPage() {
  const { jobs, loading } = useAiVideoJobs();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Video Generator</h1>
          <p className="text-gray-600">
            Create professional promotional videos for your property listings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AiVideoGeneratorCard />
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 h-5 w-5" />
                  Your Video Library
                </CardTitle>
                <CardDescription>
                  Generated videos and current processing jobs
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading videos...</div>
                ) : jobs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No videos yet. Generate your first one!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <Card key={job.id} className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Video className="h-4 w-4 mr-2 text-blue-600" />
                            <span className="font-medium">Video Job #{job.id.slice(-8)}</span>
                          </div>
                          <Badge 
                            variant={job.status === 'completed' ? 'default' : 'secondary'}
                          >
                            {job.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">
                          Created: {new Date(job.created_at).toLocaleDateString()}
                        </p>

                        {job.status === 'completed' && job.video_url && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Video
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        )}

                        {job.status === 'processing' && (
                          <div className="bg-blue-50 p-3 rounded text-sm text-blue-700">
                            Your video is being generated. This usually takes 2-5 minutes.
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
