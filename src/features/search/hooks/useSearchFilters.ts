
import { useState, useCallback } from 'react';

export function useSearchFilters() {
  const [filters, setFilters] = useState<{
    location: string;
    minPrice: number;
    maxPrice: number;
    propertyType: string;
    listingType: string;
    bedrooms: number;
    bathrooms: number;
    sortBy: string;
    sortOrder: string;
  }>({
    location: '',
    minPrice: 0,
    maxPrice: 10000000,
    propertyType: '',
    listingType: '',
    bedrooms: 0,
    bathrooms: 0,
    sortBy: 'price',
    sortOrder: 'asc'
  });

  const updateFilter = useCallback((key: string, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const updateFilters = useCallback((newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      location: '',
      minPrice: 0,
      maxPrice: 10000000,
      propertyType: '',
      listingType: '',
      bedrooms: 0,
      bathrooms: 0,
      sortBy: 'price',
      sortOrder: 'asc'
    });
  }, []);

  const hasActiveFilters = useCallback(() => {
    return (
      filters.location !== '' ||
      filters.minPrice > 0 ||
      filters.maxPrice < 10000000 ||
      filters.propertyType !== '' ||
      filters.listingType !== '' ||
      filters.bedrooms > 0 ||
      filters.bathrooms > 0
    );
  }, [filters]);

  const getFilterQuery = useCallback(() => {
    const query: Record<string, string | number> = {};
    
    if (filters.location) query.location = filters.location;
    if (filters.minPrice > 0) query.minPrice = filters.minPrice;
    if (filters.maxPrice < 10000000) query.maxPrice = filters.maxPrice;
    if (filters.propertyType) query.propertyType = filters.propertyType;
    if (filters.listingType) query.listingType = filters.listingType;
    if (filters.bedrooms > 0) query.bedrooms = filters.bedrooms;
    if (filters.bathrooms > 0) query.bathrooms = filters.bathrooms;
    
    return query;
  }, [filters]);

  return {
    filters,
    updateFilter,
    updateFilters,
    clearFilters,
    hasActiveFilters: hasActiveFilters(),
    filterQuery: getFilterQuery()
  };
}
