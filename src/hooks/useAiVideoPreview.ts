
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AiVideoPreview {
  id: string;
  listing_id: string;
  video_url: string | null;
  preview_image_url: string | null;
  status: 'generating' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export const useAiVideoPreview = () => {
  const [previews, setPreviews] = useState<AiVideoPreview[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVideoPreview = async (listingId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_video_previews')
        .select('*')
        .eq('listing_id', listingId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching video preview:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createVideoPreview = async (listingId: string) => {
    try {
      const { data, error } = await supabase
        .from('ai_video_previews')
        .insert([{ listing_id: listingId, status: 'generating' }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating video preview:', error);
      throw error;
    }
  };

  const updateVideoPreview = async (id: string, updates: Partial<AiVideoPreview>) => {
    try {
      const { data, error } = await supabase
        .from('ai_video_previews')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating video preview:', error);
      throw error;
    }
  };

  return {
    previews,
    loading,
    fetchVideoPreview,
    createVideoPreview,
    updateVideoPreview
  };
};
