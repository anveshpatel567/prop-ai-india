
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type PublicListing = {
  id: string;
  title: string;
  location: string;
  price: number;
  image_url: string;
  property_type: string;
  listing_type: string;
  status: string;
};

export function usePublicListings() {
  const [listings, setListings] = useState<PublicListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('listings')
      .select('id, title, locality, price, photos, property_type, listing_type, status')
      .eq('status', 'active')
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setListings([]);
        } else {
          const mapped = (data || []).map(item => ({
            id: item.id,
            title: item.title || 'Untitled Property',
            location: item.locality || 'Location not specified',
            price: item.price || 0,
            image_url: Array.isArray(item.photos) && item.photos.length > 0 ? item.photos[0] : '',
            property_type: item.property_type || 'residential',
            listing_type: item.listing_type || 'sale',
            status: item.status || 'active'
          }));
          setListings(mapped);
        }
        setLoading(false);
      });
  }, []);

  return { listings, loading, error };
}
