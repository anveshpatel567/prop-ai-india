
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SavedProperty {
  id: string;
  user_id: string;
  listing_id: string;
  notes: string | null;
  created_at: string;
  listing?: {
    title: string;
    price: number;
    city: string;
    property_type: string;
    listing_type: string;
  };
}

export const useSavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSavedProperties = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_properties')
        .select(`
          *,
          listing:listings (
            title,
            price,
            city,
            property_type,
            listing_type
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedProperties(data || []);
    } catch (error) {
      console.error('Error fetching saved properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProperty = async (listingId: string, notes?: string) => {
    try {
      const { data, error } = await supabase
        .from('saved_properties')
        .insert([{
          listing_id: listingId,
          notes: notes || null
        }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchSavedProperties();
      return data;
    } catch (error) {
      console.error('Error saving property:', error);
      throw error;
    }
  };

  const unsaveProperty = async (listingId: string) => {
    try {
      const { error } = await supabase
        .from('saved_properties')
        .delete()
        .eq('listing_id', listingId);

      if (error) throw error;
      
      await fetchSavedProperties();
    } catch (error) {
      console.error('Error unsaving property:', error);
      throw error;
    }
  };

  const isPropertySaved = (listingId: string) => {
    return savedProperties.some(saved => saved.listing_id === listingId);
  };

  return {
    savedProperties,
    loading,
    fetchSavedProperties,
    saveProperty,
    unsaveProperty,
    isPropertySaved
  };
};
