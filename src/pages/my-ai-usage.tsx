
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserAiToolUsagePanel } from '@/components/user/UserAiToolUsagePanel';
import { AiUsageSummaryCard } from '@/components/user/AiUsageSummaryCard';
import { AiResumeCard } from '@/components/resume/AiResumeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, FileText, Zap } from 'lucide-react';
import { useNegotiationThreads } from '@/hooks/useNegotiationThreads';
import { useMyResume } from '@/hooks/useMyResume';

export default function MyAiUsagePage() {
  const { threads } = useNegotiationThreads();
  const { resume } = useMyResume();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': case 'ready': return 'default';
      case 'rejected': case 'error': return 'destructive';
      case 'countered': case 'generating': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My AI Tool Usage</h1>
          <p className="text-gray-600">
            View your AI tool usage history, negotiations, and generated content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AiUsageSummaryCard />
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="negotiations">Negotiations</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <UserAiToolUsagePanel />
              </TabsContent>

              <TabsContent value="negotiations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      My Negotiations
                      <Badge variant="secondary">{threads.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      {threads.length === 0 ? (
                        <div className="text-center text-muted-foreground py-8">
                          No negotiations started yet
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {threads.map((thread) => (
                            <div key={thread.id} className="p-3 border rounded-lg space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-sm">
                                  Listing {thread.listing_id.slice(0, 8)}...
                                </span>
                                <Badge variant={getStatusColor(thread.status)}>
                                  {thread.status}
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <p>Started: {new Date(thread.created_at).toLocaleDateString()}</p>
                                <p>Updated: {new Date(thread.updated_at).toLocaleDateString()}</p>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Zap className="h-3 w-3" />
                                <span>50 credits used</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resume" className="space-y-4">
                <AiResumeCard />
                
                {resume && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Resume Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Status:</span>
                          <Badge variant={getStatusColor(resume.status)} className="ml-2">
                            {resume.status}
                          </Badge>
                        </div>
                        <div>
                          <span className="font-medium">Credits Used:</span>
                          <span className="ml-2">{resume.credits_used}</span>
                        </div>
                        <div>
                          <span className="font-medium">Created:</span>
                          <span className="ml-2">{new Date(resume.created_at).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-medium">Updated:</span>
                          <span className="ml-2">{new Date(resume.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      {resume.resume_data && (
                        <div className="border-t pt-3">
                          <span className="font-medium text-sm">Resume Data:</span>
                          <div className="mt-2 text-xs text-muted-foreground space-y-1">
                            <p>Experience: {resume.resume_data.experience_years} years</p>
                            <p>Regions: {resume.resume_data.regions_covered}</p>
                            <p>RERA ID: {resume.resume_data.rera_id}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <UserAiToolUsagePanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
