
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAiVideoGeneration } from '@/hooks/useAiVideoGeneration';
import { Video, Sparkles } from 'lucide-react';

export const AiVideoGeneratorCard: React.FC = () => {
  const { isGenerating, generatedVideo, generateVideo } = useAiVideoGeneration();
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    property_type: 'residential',
    location: '',
    highlights: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateVideo(videoData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Video className="mr-2 h-5 w-5" />
          AI Video Generator
          <Badge className="ml-2">500 Credits</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Property Title</label>
            <Input
              value={videoData.title}
              onChange={(e) => setVideoData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Luxury 3BHK Apartment"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Input
              value={videoData.location}
              onChange={(e) => setVideoData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Bandra West, Mumbai"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Property Description</label>
            <Textarea
              value={videoData.description}
              onChange={(e) => setVideoData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your property features, amenities, and location benefits"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Key Highlights</label>
            <Textarea
              value={videoData.highlights}
              onChange={(e) => setVideoData(prev => ({ ...prev, highlights: e.target.value }))}
              placeholder="Sea view, Modern amenities, Prime location"
              rows={2}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isGenerating}>
            <Sparkles className="mr-2 h-4 w-4" />
            {isGenerating ? 'Generating Video...' : 'Generate AI Video Script'}
          </Button>
        </form>

        {generatedVideo && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Video Generated!</h3>
            <p className="text-sm text-green-700">
              Your property video script has been created. Video processing typically takes 3-5 minutes.
            </p>
            <Button variant="outline" className="mt-2" size="sm">
              View Video Script
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
