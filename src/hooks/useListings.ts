
import { useState, useEffect } from 'react';
import { PropertyListing } from '../types';
import { supabase } from '@/integrations/supabase/client';

export const useListings = () => {
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchListings = async (filters?: any) => {
    setLoading(true);
    try {
      let query = supabase.from('listings').select('*');

      if (filters) {
        if (filters.location) {
          query = query.ilike('location', `%${filters.location}%`);
        }
        if (filters.property_type && filters.property_type !== 'all') {
          query = query.eq('property_type', filters.property_type);
        }
        if (filters.listing_type && filters.listing_type !== 'all') {
          query = query.eq('listing_type', filters.listing_type);
        }
        if (filters.min_price) {
          query = query.gte('price', filters.min_price);
        }
        if (filters.max_price) {
          query = query.lte('price', filters.max_price);
        }
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const createListing = async (listingData: any) => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .insert(listingData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  };

  return {
    listings,
    loading,
    fetchListings,
    createListing
  };
};
