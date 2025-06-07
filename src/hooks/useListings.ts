
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/types/supabase-db';

type PropertyListing = Database['public']['Tables']['property_listings']['Row'];
type PropertyListingInsert = Database['public']['Tables']['property_listings']['Insert'];

export const useListings = () => {
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = async (filters?: {
    location?: string;
    property_type?: string;
    listing_type?: string;
    min_price?: number;
    max_price?: number;
  }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('property_listings')
        .select('*')
        .eq('status', 'active');

      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      if (filters?.property_type) {
        query = query.eq('property_type', filters.property_type);
      }
      if (filters?.listing_type) {
        query = query.eq('listing_type', filters.listing_type);
      }
      if (filters?.min_price) {
        query = query.gte('price', filters.min_price);
      }
      if (filters?.max_price) {
        query = query.lte('price', filters.max_price);
      }

      const { data, error: fetchError } = await query.order('created_at', { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        return [];
      }

      setListings(data || []);
      return data || [];
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Failed to fetch listings');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createListing = async (listingData: PropertyListingInsert) => {
    try {
      setLoading(true);
      const { data, error: createError } = await supabase
        .from('property_listings')
        .insert(listingData)
        .select()
        .single();

      if (createError) {
        setError(createError.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error creating listing:', err);
      setError('Failed to create listing');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUserListings = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('property_listings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error('Error fetching user listings:', err);
      setError('Failed to fetch user listings');
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return {
    listings,
    loading,
    error,
    fetchListings,
    createListing,
    getUserListings
  };
};
