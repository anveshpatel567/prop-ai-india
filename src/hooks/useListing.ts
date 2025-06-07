
import { useState, useEffect } from 'react';
import { PropertyListing } from '../types';

export const useListing = () => {
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createListing = async (listingData: Partial<PropertyListing>) => {
    setIsLoading(true);
    try {
      // Mock API call
      const newListing: PropertyListing = {
        id: Date.now().toString(),
        user_id: '1',
        title: listingData.title || '',
        description: listingData.description || '',
        property_type: listingData.property_type || 'residential',
        listing_type: listingData.listing_type || 'sale',
        price: listingData.price || 0,
        area_sqft: listingData.area_sqft || 0,
        bedrooms: listingData.bedrooms || 0,
        bathrooms: listingData.bathrooms || 0,
        city: listingData.city || '',
        locality: listingData.locality || '',
        google_maps_pin: listingData.google_maps_pin || '',
        rera_number: listingData.rera_number || null,
        is_rera_verified: false,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setListings(prev => [newListing, ...prev]);
      return newListing;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    listings,
    isLoading,
    createListing
  };
};
