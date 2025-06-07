
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AiListingHeatmap {
  id: string;
  listing_id: string;
  views_count: number;
  interest_score: number;
  engagement_rate: number;
  last_calculated: string | null;
  created_at: string;
  updated_at: string;
}

export const useAiListingHeatmaps = () => {
  const [heatmaps, setHeatmaps] = useState<AiListingHeatmap[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchListingHeatmaps = async (listingIds?: string[]) => {
    setLoading(true);
    try {
      let query = supabase
        .from('ai_listing_heatmaps')
        .select('*')
        .order('engagement_rate', { ascending: false });

      if (listingIds) {
        query = query.in('listing_id', listingIds);
      }

      const { data, error } = await query;

      if (error) throw error;
      setHeatmaps(data || []);
    } catch (error) {
      console.error('Error fetching listing heatmaps:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateHeatmapData = async (listingId: string, updates: Partial<AiListingHeatmap>) => {
    try {
      const { data, error } = await supabase
        .from('ai_listing_heatmaps')
        .upsert([{
          listing_id: listingId,
          ...updates,
          last_calculated: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchListingHeatmaps(); // Refresh data
      return data;
    } catch (error) {
      console.error('Error updating heatmap data:', error);
      throw error;
    }
  };

  const getHeatmapByListingId = (listingId: string) => {
    return heatmaps.find(heatmap => heatmap.listing_id === listingId);
  };

  const getTopPerformingListings = (limit: number = 10) => {
    return heatmaps
      .sort((a, b) => b.engagement_rate - a.engagement_rate)
      .slice(0, limit);
  };

  return {
    heatmaps,
    loading,
    fetchListingHeatmaps,
    updateHeatmapData,
    getHeatmapByListingId,
    getTopPerformingListings
  };
};
