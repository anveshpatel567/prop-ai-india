
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAiVideoJobs } from '@/hooks/useAiVideoJobs';
import { useToast } from '@/components/ui/use-toast';
import { Video, Play, Loader2 } from 'lucide-react';

interface AiVideoGeneratorCardProps {
  listingId?: string;
}

export const AiVideoGeneratorCard: React.FC<AiVideoGeneratorCardProps> = ({ listingId }) => {
  const { generateVideo, loading } = useAiVideoJobs();
  const { toast } = useToast();

  const handleGenerateVideo = async () => {
    if (!listingId) {
      toast({
        title: "Error",
        description: "Please select a listing first",
        variant: "destructive",
      });
      return;
    }

    try {
      await generateVideo(listingId);
      toast({
        title: "Video Generation Started",
        description: "Your promotional video is being created. Check back in a few minutes!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start video generation",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-2">
          <Video className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-red-600">AI Video Generator</CardTitle>
        <CardDescription>Create stunning promotional videos for your listings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-red-100 p-4 rounded-lg">
          <h4 className="font-semibold text-red-700 mb-2">What you'll get:</h4>
          <ul className="text-sm text-red-600 space-y-1">
            <li>• Professional property showcase video</li>
            <li>• AI-generated voiceover narration</li>
            <li>• Optimized for social media sharing</li>
            <li>• HD quality with branded elements</li>
          </ul>
        </div>

        <Button 
          onClick={handleGenerateVideo}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
          disabled={loading || !listingId}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Video...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Generate Video (15 credits)
            </>
          )}
        </Button>

        <div className="text-xs text-gray-500 text-center">
          Video generation typically takes 2-5 minutes
        </div>
      </CardContent>
    </Card>
  );
};
