
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type FlatListingOffer = {
  id: string;
  listing_id: string;
  created_by: string;
  title: string;
  description: string | null;
  offer_type: 'discount' | 'perk' | 'limited-time' | 'custom';
  discount_amount: number | null;
  expiry_at: string | null;
  status: 'active' | 'expired' | 'disabled';
  created_at: string;
  updated_at: string;
};

export type CreateListingOfferInput = {
  listing_id: string;
  title: string;
  description?: string;
  offer_type: 'discount' | 'perk' | 'limited-time' | 'custom';
  discount_amount?: number;
  expiry_at?: string;
};

export type UpdateListingOfferInput = {
  id: string;
  title?: string;
  description?: string;
  offer_type?: 'discount' | 'perk' | 'limited-time' | 'custom';
  discount_amount?: number;
  expiry_at?: string;
  status?: 'active' | 'expired' | 'disabled';
};

export function useListingOffers() {
  return useQuery({
    queryKey: ['listing-offers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listing_offers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as FlatListingOffer[];
    }
  });
}

export function useOffersForListing(listingId: string) {
  return useQuery({
    queryKey: ['listing-offers', listingId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listing_offers')
        .select('*')
        .eq('listing_id', listingId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as FlatListingOffer[];
    }
  });
}

export function useCreateListingOffer() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: CreateListingOfferInput) => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('listing_offers')
        .insert([{ ...input, created_by: user.user.id }])
        .select()
        .single();
      
      if (error) throw error;
      return data as FlatListingOffer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-offers'] });
    }
  });
}

export function useUpdateListingOffer() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: UpdateListingOfferInput) => {
      const { id, ...updateData } = input;
      const { data, error } = await supabase
        .from('listing_offers')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as FlatListingOffer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-offers'] });
    }
  });
}

export function useDeleteListingOffer() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('listing_offers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-offers'] });
    }
  });
}
