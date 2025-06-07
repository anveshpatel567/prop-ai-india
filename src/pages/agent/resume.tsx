
import React, { useEffect } from 'react';
import { useAiResume } from '@/hooks/useAiResume';
import AgentResumeBuilder from '@/components/agent/AgentResumeBuilder';
import AgentResumePreview from '@/components/agent/AgentResumePreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AgentResumePage() {
  const { data, fetchUserResume } = useAiResume();

  useEffect(() => {
    fetchUserResume();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            🤖 AI Resume Builder
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create a professional real estate agent resume powered by AI. Stand out to potential clients with a resume that highlights your expertise and achievements.
          </p>
        </div>

        <Tabs defaultValue={data ? "preview" : "builder"} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="builder">Create Resume</TabsTrigger>
            <TabsTrigger value="preview" disabled={!data}>Preview Resume</TabsTrigger>
          </TabsList>
          
          <TabsContent value="builder" className="mt-8">
            <AgentResumeBuilder />
          </TabsContent>
          
          <TabsContent value="preview" className="mt-8">
            {data ? (
              <AgentResumePreview resume={data} />
            ) : (
              <div className="text-center text-gray-500">
                No resume found. Create one using the builder tab.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
