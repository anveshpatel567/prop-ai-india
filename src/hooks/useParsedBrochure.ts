
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { useNavigate } from 'react-router-dom';

interface ParsedData {
  title: string;
  property_type: 'residential' | 'commercial' | 'plot';
  listing_type: 'sale' | 'rent';
  price: number;
  area_sqft?: number;
  bedrooms?: number;
  bathrooms?: number;
  city: string;
  locality?: string;
  amenities: string[];
  description: string;
}

export const useParsedBrochure = () => {
  const [parsing, setParsing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const { user } = useSupabaseUser();
  const navigate = useNavigate();

  const parseBrochure = async (brochureText: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setParsing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai/brochure-parser', {
        body: {
          brochure_text: brochureText,
          user_id: user.id
        }
      });

      if (error) throw error;

      if (data?.success && data?.parsed_data) {
        setParsedData(data.parsed_data);
        return data.parsed_data;
      } else {
        throw new Error('Failed to parse brochure');
      }
    } catch (error) {
      console.error('Error parsing brochure:', error);
      throw error;
    } finally {
      setParsing(false);
    }
  };

  const submitParsedListing = async (data: ParsedData) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setSubmitting(true);
    try {
      const { data: listing, error } = await supabase
        .from('listings')
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description,
          property_type: data.property_type,
          listing_type: data.listing_type,
          price: data.price,
          area_sqft: data.area_sqft || null,
          bedrooms: data.bedrooms || null,
          bathrooms: data.bathrooms || null,
          city: data.city,
          locality: data.locality || null,
          google_maps_pin: data.city, // fallback to city if no specific pin
          amenities: data.amenities,
          photos: ['/placeholder.svg'],
          ai_generated_title: true,
          ai_parsed_data: data
        })
        .select()
        .single();

      if (error) throw error;

      // Navigate to all listings page
      navigate('/listing/all');
      return true;
    } catch (error) {
      console.error('Error creating listing:', error);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    parsing,
    submitting,
    parsedData,
    parseBrochure,
    submitParsedListing
  };
};
