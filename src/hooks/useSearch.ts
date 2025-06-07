
import { useState } from 'react';
import { SearchFilter, PropertyListing, PropertyMatchScore } from '../types';

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<PropertyListing[]>([]);
  const [matchScores, setMatchScores] = useState<PropertyMatchScore[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const manualSearch = async (filters: SearchFilter) => {
    setIsLoading(true);
    try {
      // Mock search results
      const mockResults: PropertyListing[] = [
        {
          id: '1',
          user_id: '1',
          title: 'Luxury 3BHK in Bandra West',
          description: 'Beautiful apartment with sea view',
          property_type: 'residential',
          listing_type: 'sale',
          price: 25000000,
          area_sqft: 1200,
          bedrooms: 3,
          bathrooms: 2,
          city: 'Mumbai',
          locality: 'Bandra West',
          google_maps_pin: 'https://maps.google.com/123',
          rera_number: null,
          is_rera_verified: false,
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      
      setSearchResults(mockResults);
      return mockResults;
    } finally {
      setIsLoading(false);
    }
  };

  const aiSearch = async (query: string) => {
    setIsLoading(true);
    try {
      // Mock AI search with match scores
      const mockResults: PropertyListing[] = [
        {
          id: '1',
          user_id: '1',
          title: 'Luxury 3BHK in Bandra West',
          description: 'Beautiful apartment with sea view',
          property_type: 'residential',
          listing_type: 'sale',
          price: 25000000,
          area_sqft: 1200,
          bedrooms: 3,
          bathrooms: 2,
          city: 'Mumbai',
          locality: 'Bandra West',
          google_maps_pin: 'https://maps.google.com/123',
          rera_number: null,
          is_rera_verified: false,
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      const mockScores: PropertyMatchScore[] = [
        {
          property_id: '1',
          match_percentage: 92,
          match_reasons: ['Exact bedroom match', 'Location preference', 'Budget compatible']
        }
      ];
      
      setSearchResults(mockResults);
      setMatchScores(mockScores);
      return { results: mockResults, scores: mockScores };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchResults,
    matchScores,
    isLoading,
    manualSearch,
    aiSearch
  };
};
