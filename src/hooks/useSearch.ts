
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type SearchResult = {
  id: string;
  title: string;
  location: string;
  price: number;
  image_url: string;
  property_type: string;
  listing_type: string;
};

export type SearchFilter = {
  location: string;
  min_price: number;
  max_price: number;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
};

export function useSearch() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const manualSearch = async (filters: Partial<SearchFilter>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('listings')
        .select('id, title, locality, price, photos, property_type, listing_type')
        .eq('status', 'active');

      if (filters.location) {
        query = query.ilike('locality', `%${filters.location}%`);
      }
      if (filters.min_price && filters.min_price > 0) {
        query = query.gte('price', filters.min_price);
      }
      if (filters.max_price && filters.max_price > 0) {
        query = query.lte('price', filters.max_price);
      }
      if (filters.property_type) {
        query = query.eq('property_type', filters.property_type);
      }
      if (filters.bedrooms && filters.bedrooms > 0) {
        query = query.eq('bedrooms', filters.bedrooms);
      }
      if (filters.bathrooms && filters.bathrooms > 0) {
        query = query.eq('bathrooms', filters.bathrooms);
      }

      const { data, error } = await query;

      if (error) throw error;

      const mapped = (data || []).map(item => ({
        id: item.id,
        title: item.title || 'Untitled Property',
        location: item.locality || 'Location not specified',
        price: item.price || 0,
        image_url: Array.isArray(item.photos) && item.photos.length > 0 ? item.photos[0] : '',
        property_type: item.property_type || 'residential',
        listing_type: item.listing_type || 'sale'
      }));

      setSearchResults(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const aiSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('id, title, locality, price, photos, property_type, listing_type')
        .eq('status', 'active')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,locality.ilike.%${query}%`);

      if (error) throw error;

      const mapped = (data || []).map(item => ({
        id: item.id,
        title: item.title || 'Untitled Property',
        location: item.locality || 'Location not specified',
        price: item.price || 0,
        image_url: Array.isArray(item.photos) && item.photos.length > 0 ? item.photos[0] : '',
        property_type: item.property_type || 'residential',
        listing_type: item.listing_type || 'sale'
      }));

      setSearchResults(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI search failed');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchResults,
    isLoading,
    error,
    manualSearch,
    aiSearch
  };
}
