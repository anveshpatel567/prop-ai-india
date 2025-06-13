
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

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    supabase
      .from('listings')
      .select('id, title, locality, price, photos, property_type, listing_type')
      .or(`title.ilike.%${query}%,locality.ilike.%${query}%`)
      .eq('status', 'active')
      .limit(20)
      .then(({ data, error }) => {
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
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setResults([]);
        setLoading(false);
      });
  }, [query]);

  return { results, loading, error };
}
