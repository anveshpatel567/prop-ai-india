
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useWallet } from '@/context/WalletContext';
import { useToast } from '@/hooks/use-toast';

interface ImageEnhancementRequest {
  input_image_url: string;
  style: string;
  listing_id?: string;
}

interface ImageEnhancement {
  id: string;
  input_image_url: string;
  output_image_url: string | null;
  style: string;
  status: 'processing' | 'completed' | 'failed';
  credits_used: number;
  created_at: string;
}

export const useAiImageEnhancer = () => {
  const [loading, setLoading] = useState(false);
  const [enhancements, setEnhancements] = useState<ImageEnhancement[]>([]);
  const { user } = useAuth();
  const { deductCredits } = useWallet();
  const { toast } = useToast();

  const enhanceImage = async ({ input_image_url, style, listing_id }: ImageEnhancementRequest) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to enhance images",
        variant: "destructive"
      });
      return null;
    }

    const creditsRequired = 150;
    const canProceed = await deductCredits(creditsRequired, 'AI Image Enhancer');
    
    if (!canProceed) {
      toast({
        title: "Insufficient credits",
        description: `You need ${creditsRequired} credits to enhance images`,
        variant: "destructive"
      });
      return null;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generateEnhancedImage', {
        body: {
          input_image_url,
          style,
          listing_id,
          user_id: user.id
        }
      });

      if (error) throw error;

      toast({
        title: "Image enhancement started",
        description: "Your image is being processed. This may take a few minutes.",
      });

      await fetchEnhancements();
      return data;
    } catch (error) {
      console.error('Error enhancing image:', error);
      toast({
        title: "Enhancement failed",
        description: "Failed to enhance image. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchEnhancements = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ai_image_outputs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEnhancements(data || []);
    } catch (error) {
      console.error('Error fetching enhancements:', error);
    }
  };

  return {
    loading,
    enhancements,
    enhanceImage,
    fetchEnhancements
  };
};
