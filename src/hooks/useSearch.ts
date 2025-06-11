
import { useState } from 'react';
import { PropertyListing, PropertyMatchScore, SearchFilter } from '@/types';

export function useSearch() {
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilter>({
    location: '',
    min_price: 0,
    max_price: 0,
    property_type: '',
    bedrooms: 0,
    bathrooms: 0
  });
  const [matchScores, setMatchScores] = useState<PropertyMatchScore[]>([]);

  const searchListings = async (searchFilters?: Partial<SearchFilter>) => {
    setLoading(true);
    try {
      // TODO: Replace with actual search logic
      setListings([]);
      setMatchScores([]);
    } finally {
      setLoading(false);
    }
  };

  const manualSearch = async (filters: any) => {
    await searchListings(filters);
  };

  const aiSearch = async (query: string) => {
    console.log('AI search with query:', query);
    await searchListings();
  };

  return {
    listings,
    searchResults: listings,
    matchScores,
    loading,
    isLoading: loading,
    filters,
    setFilters,
    searchListings,
    manualSearch,
    aiSearch,
  };
}
