
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

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const manualSearch = async (filters: any) => {
    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('id, title, locality, price, photos, property_type, listing_type')
        .eq('status', 'active')
        .limit(20);
        
      if (error) {
        setError(error.message);
        setResults([]);
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
        setResults(mappedResults);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const aiSearch = async (query: string) => {
    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('id, title, locality, price, photos, property_type, listing_type')
        .or(`title.ilike.%${query}%,locality.ilike.%${query}%`)
        .eq('status', 'active')
        .limit(20);
        
      if (error) {
        setError(error.message);
        setResults([]);
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
        setResults(mappedResults);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { 
    searchResults: results, 
    isLoading: loading, 
    error, 
    manualSearch, 
    aiSearch 
  };
}
