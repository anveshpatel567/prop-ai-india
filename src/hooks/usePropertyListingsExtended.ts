
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PropertyListingExtended {
  id: string;
  listing_id: string;
  user_id: string;
  possession_date: string | null;
  carpet_area: number | null;
  builtup_area: number | null;
  furnishing: 'unfurnished' | 'semi-furnished' | 'furnished' | null;
  balconies: number;
  parking: number;
  brochure_url: string | null;
  created_at: string;
  updated_at: string;
}

export const usePropertyListingsExtended = () => {
  const [extendedListings, setExtendedListings] = useState<PropertyListingExtended[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchExtendedListing = async (listingId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('property_listings_extended')
        .select('*')
        .eq('listing_id', listingId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching extended listing:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createExtendedListing = async (listingData: Omit<PropertyListingExtended, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('property_listings_extended')
        .insert([listingData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating extended listing:', error);
      throw error;
    }
  };

  const updateExtendedListing = async (id: string, updates: Partial<PropertyListingExtended>) => {
    try {
      const { data, error } = await supabase
        .from('property_listings_extended')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating extended listing:', error);
      throw error;
    }
  };

  return {
    extendedListings,
    loading,
    fetchExtendedListing,
    createExtendedListing,
    updateExtendedListing
  };
};
