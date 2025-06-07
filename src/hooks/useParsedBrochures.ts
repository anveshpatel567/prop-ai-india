
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ParsedBrochure {
  id: string;
  user_id: string;
  listing_id: string;
  original_file_url: string;
  parsed_data: any;
  confidence_score: number | null;
  status: 'processing' | 'completed' | 'failed';
  ai_model_used: string | null;
  processing_time_ms: number | null;
  credits_used: number;
  error_message: string | null;
  created_at: string;
}

export const useParsedBrochures = () => {
  const [brochures, setBrochures] = useState<ParsedBrochure[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBrochures = async (userId?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('parsed_brochures')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setBrochures(data || []);
    } catch (error) {
      console.error('Error fetching parsed brochures:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBrochureRecord = async (brochure: Omit<ParsedBrochure, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('parsed_brochures')
        .insert([brochure])
        .select()
        .single();

      if (error) throw error;
      
      await fetchBrochures();
      return data;
    } catch (error) {
      console.error('Error creating brochure record:', error);
      throw error;
    }
  };

  const updateBrochureStatus = async (id: string, updates: Partial<ParsedBrochure>) => {
    try {
      const { data, error } = await supabase
        .from('parsed_brochures')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchBrochures();
      return data;
    } catch (error) {
      console.error('Error updating brochure:', error);
      throw error;
    }
  };

  return {
    brochures,
    loading,
    fetchBrochures,
    createBrochureRecord,
    updateBrochureStatus
  };
};
