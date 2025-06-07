
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ListingOfferLog {
  id: string;
  listing_id: string;
  offered_by: string;
  offer_amount: number;
  offer_status: 'pending' | 'accepted' | 'rejected' | 'expired';
  expires_at: string | null;
  response_message: string | null;
  created_at: string;
  updated_at: string;
}

export const useListingOfferLogs = () => {
  const [offers, setOffers] = useState<ListingOfferLog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOffers = async (listingId?: string, userId?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('listing_offer_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (listingId) {
        query = query.eq('listing_id', listingId);
      }

      if (userId) {
        query = query.eq('offered_by', userId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOffer = async (offerData: Omit<ListingOfferLog, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('listing_offer_logs')
        .insert([offerData])
        .select()
        .single();

      if (error) throw error;
      
      await fetchOffers(); // Refresh offers
      return data;
    } catch (error) {
      console.error('Error creating offer:', error);
      throw error;
    }
  };

  const updateOfferStatus = async (offerId: string, status: ListingOfferLog['offer_status'], responseMessage?: string) => {
    try {
      const { data, error } = await supabase
        .from('listing_offer_logs')
        .update({ 
          offer_status: status,
          response_message: responseMessage 
        })
        .eq('id', offerId)
        .select()
        .single();

      if (error) throw error;
      
      await fetchOffers(); // Refresh offers
      return data;
    } catch (error) {
      console.error('Error updating offer status:', error);
      throw error;
    }
  };

  const getPendingOffers = () => {
    return offers.filter(offer => offer.offer_status === 'pending');
  };

  const getHighestOffer = () => {
    if (offers.length === 0) return null;
    return offers.reduce((highest, current) => 
      current.offer_amount > highest.offer_amount ? current : highest
    );
  };

  return {
    offers,
    loading,
    fetchOffers,
    createOffer,
    updateOfferStatus,
    getPendingOffers,
    getHighestOffer
  };
};
