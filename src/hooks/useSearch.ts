
import { useState, useEffect } from 'react';
import { SearchFilter, PropertyListing, PropertyMatchScore } from '../types';
import { supabase } from '@/integrations/supabase/client';

export const useSearch = () => {
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [matchScores, setMatchScores] = useState<PropertyMatchScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilter>({
    location: '',
    min_price: 0,
    max_price: 0,
    property_type: '',
    bedrooms: 0,
    bathrooms: 0
  });

  const searchListings = async (searchFilters: Partial<SearchFilter>) => {
    setLoading(true);
    try {
      let query = supabase.from('listings').select('*');

      if (searchFilters.location) {
        query = query.ilike('location', `%${searchFilters.location}%`);
      }
      if (searchFilters.min_price) {
        query = query.gte('price', searchFilters.min_price);
      }
      if (searchFilters.max_price) {
        query = query.lte('price', searchFilters.max_price);
      }
      if (searchFilters.property_type) {
        query = query.eq('property_type', searchFilters.property_type);
      }
      if (searchFilters.bedrooms) {
        query = query.eq('bedrooms', searchFilters.bedrooms);
      }
      if (searchFilters.bathrooms) {
        query = query.eq('bathrooms', searchFilters.bathrooms);
      }

      const { data, error } = await query;
      if (error) throw error;

      setListings(data || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    listings,
    matchScores,
    loading,
    filters,
    setFilters,
    searchListings
  };
};
