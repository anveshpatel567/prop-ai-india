
import { useState, useEffect } from 'react';
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

export function useSearch() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const manualSearch = async (filters: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('id, title, locality, price, photos, property_type, listing_type')
        .eq('status', 'active')
        .limit(20);
        
      if (error) {
        setError(error.message);
        setSearchResults([]);
      } else {
        const mappedResults = (data || []).map(item => ({
          id: item.id,
          title: item.title || 'Untitled Property',
          location: item.locality || 'Location not specified',
          price: item.price || 0,
          image_url: Array.isArray(item.photos) && item.photos.length > 0 ? item.photos[0] : '',
          property_type: item.property_type || 'residential',
          listing_type: item.listing_type || 'sale'
        }));
        setSearchResults(mappedResults);
      }
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
        .or(`title.ilike.%${query}%,locality.ilike.%${query}%`)
        .eq('status', 'active')
        .limit(20);
        
      if (error) {
        setError(error.message);
        setSearchResults([]);
      } else {
        const mappedResults = (data || []).map(item => ({
          id: item.id,
          title: item.title || 'Untitled Property',
          location: item.locality || 'Location not specified',
          price: item.price || 0,
          image_url: Array.isArray(item.photos) && item.photos.length > 0 ? item.photos[0] : '',
          property_type: item.property_type || 'residential',
          listing_type: item.listing_type || 'sale'
        }));
        setSearchResults(mappedResults);
      }
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
    error: error || '', 
    manualSearch, 
    aiSearch 
  };
}
