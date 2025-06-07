
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PropertyInquiry {
  id: string;
  listing_id: string;
  inquirer_id: string;
  message: string;
  phone: string | null;
  email: string | null;
  preferred_contact_time: string | null;
  status: 'new' | 'responded' | 'closed';
  response: string | null;
  responded_at: string | null;
  created_at: string;
  listing?: {
    title: string;
    city: string;
  };
  inquirer?: {
    full_name: string;
    email: string;
  };
}

export const usePropertyInquiries = () => {
  const [inquiries, setInquiries] = useState<PropertyInquiry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInquiries = async (listingId?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('property_inquiries')
        .select(`
          *,
          listing:listings (title, city),
          inquirer:users (full_name, email)
        `)
        .order('created_at', { ascending: false });

      if (listingId) {
        query = query.eq('listing_id', listingId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const createInquiry = async (inquiry: Omit<PropertyInquiry, 'id' | 'created_at' | 'status' | 'response' | 'responded_at'>) => {
    try {
      const { data, error } = await supabase
        .from('property_inquiries')
        .insert([inquiry])
        .select()
        .single();

      if (error) throw error;
      
      await fetchInquiries();
      return data;
    } catch (error) {
      console.error('Error creating inquiry:', error);
      throw error;
    }
  };

  const respondToInquiry = async (id: string, response: string) => {
    try {
      const { data, error } = await supabase
        .from('property_inquiries')
        .update({
          response,
          status: 'responded',
          responded_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchInquiries();
      return data;
    } catch (error) {
      console.error('Error responding to inquiry:', error);
      throw error;
    }
  };

  return {
    inquiries,
    loading,
    fetchInquiries,
    createInquiry,
    respondToInquiry
  };
};
