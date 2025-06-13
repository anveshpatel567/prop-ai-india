
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export type UserListing = {
  id: string;
  title: string;
  location: string;
  price: number;
  status: string;
  created_at: string;
};

export function useUserListings(userId: string) {
  const [listings, setListings] = useState<UserListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    supabase
      .from('listings')
      .select('id, title, locality, price, status, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
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
            status: item.status || 'draft',
            created_at: item.created_at || new Date().toISOString()
          }));
          setListings(mapped);
        }
        setLoading(false);
      });
  }, [userId]);

  return { listings, loading, error };
}
