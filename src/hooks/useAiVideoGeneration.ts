
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useWallet } from '@/context/WalletContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useAiVideoGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<any>(null);
  const { user } = useAuth();
  const { deductCredits } = useWallet();
  const { toast } = useToast();

  const generateVideo = async (videoData: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to generate videos",
        variant: "destructive"
      });
      return;
    }

    const creditsRequired = 100;
    const canAfford = await deductCredits(creditsRequired, 'AI Video Generator');
    
    if (!canAfford) {
      toast({
        title: "Insufficient Credits",
        description: "You need 100 credits for AI video generation",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Mock video generation - in real implementation, this would call an AI service
      const mockVideo = {
        id: Date.now().toString(),
        video_url: '/placeholder-video.mp4',
        thumbnail_url: '/placeholder.svg',
        status: 'completed',
        credits_used: creditsRequired
      };

      // Store in database
      const { data, error } = await supabase
        .from('ai_listing_videos')
        .insert({
          user_id: user.id,
          listing_id: videoData.listing_id || null,
          status: 'generating',
          credits_used: creditsRequired
        })
        .select()
        .single();

      if (error) throw error;

      // Simulate processing time
      setTimeout(async () => {
        await supabase
          .from('ai_listing_videos')
          .update({
            status: 'completed',
            video_url: mockVideo.video_url,
            thumbnail_url: mockVideo.thumbnail_url
          })
          .eq('id', data.id);

        setGeneratedVideo(mockVideo);
        toast({
          title: "Video Generated",
          description: "Your property video has been created successfully!"
        });
      }, 3000);

      return data;
    } catch (error) {
      console.error('Error generating video:', error);
      toast({
        title: "Video Generation Failed",
        description: "Unable to generate video. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generatedVideo,
    generateVideo,
    resetVideo: () => setGeneratedVideo(null)
  };
};
