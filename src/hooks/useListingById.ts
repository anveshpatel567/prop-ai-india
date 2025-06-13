
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type ListingDetail = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image_url: string;
  user_id: string;
  property_type: string;
  listing_type: string;
  area_sqft: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
};

export function useListingById(listingId: string) {
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!listingId) {
      setLoading(false);
      return;
    }

    supabase
      .from('listings')
      .select('*')
      .eq('id', listingId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setListing(null);
        } else if (data) {
          setListing({
            id: data.id,
            title: data.title || 'Untitled Property',
            description: data.description || '',
            price: data.price || 0,
            location: data.locality || 'Location not specified',
            image_url: Array.isArray(data.photos) && data.photos.length > 0 ? data.photos[0] : '',
            user_id: data.user_id || '',
            property_type: data.property_type || 'residential',
            listing_type: data.listing_type || 'sale',
            area_sqft: data.area_sqft || 0,
            bedrooms: data.bedrooms || 0,
            bathrooms: data.bathrooms || 0,
            amenities: Array.isArray(data.amenities) ? data.amenities : []
          });
        }
        setLoading(false);
      });
  }, [listingId]);

  return { listing, loading, error };
}
