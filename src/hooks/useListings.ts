
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/types/supabase-db';

type Listing = Database['public']['Tables']['listings']['Row'];
type ListingInsert = Database['public']['Tables']['listings']['Insert'];

export const useListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
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
        .from('listings')
        .select('*')
        .eq('status', 'active');

      if (filters?.location) {
        query = query.or(`city.ilike.%${filters.location}%,locality.ilike.%${filters.location}%`);
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

  const createListing = async (listingData: ListingInsert) => {
    try {
      setLoading(true);
      const { data, error: createError } = await supabase
        .from('listings')
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
        .from('listings')
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

  const updateListing = async (id: string, updates: Partial<ListingInsert>) => {
    try {
      setLoading(true);
      const { data, error: updateError } = await supabase
        .from('listings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        setError(updateError.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error updating listing:', err);
      setError('Failed to update listing');
      return null;
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
    getUserListings,
    updateListing
  };
};
