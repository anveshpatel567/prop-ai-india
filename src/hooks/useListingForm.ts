
import { useState } from 'react';
import { PropertyListing } from '@/types';

export function useListingForm() {
  const [isLoading, setIsLoading] = useState(false);

  const createListing = async (listing: Partial<PropertyListing>) => {
    setIsLoading(true);
    try {
      // TODO: Replace with Supabase insert logic
      console.log('Creating listing...', listing);
    } finally {
      setIsLoading(false);
    }
  };

  return { createListing, isLoading };
}
