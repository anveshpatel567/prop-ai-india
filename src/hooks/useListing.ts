
import { useState, useEffect } from 'react';
import { PropertyListing } from '../types';
import { supabase } from '@/integrations/supabase/client';

export const useListing = (listingId?: string) => {
  const [listing, setListing] = useState<PropertyListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (listingId) {
      const fetchListing = async () => {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from('listings')
            .select('*')
            .eq('id', listingId)
            .single();

          if (error) throw error;
          setListing(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch listing');
        } finally {
          setLoading(false);
        }
      };

      fetchListing();
    } else {
      setLoading(false);
    }
  }, [listingId]);

  const createListing = async (data: any) => {
    try {
      const { error } = await supabase
        .from('listings')
        .insert(data);
      
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create listing');
      throw err;
    }
  };

  return { 
    listing, 
    loading, 
    error, 
    createListing,
    isLoading: loading
  };
};
