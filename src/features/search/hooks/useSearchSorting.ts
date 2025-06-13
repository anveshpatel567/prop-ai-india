
import { useState, useCallback, useMemo } from 'react';

export function useSearchSorting() {
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [sortOrder, setSortOrder] = useState<string>('desc');

  const sortOptions = useMemo(() => [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price', label: 'Price' },
    { value: 'date', label: 'Date Added' },
    { value: 'area', label: 'Area' },
    { value: 'location', label: 'Location' }
  ], []);

  const orderOptions = useMemo(() => [
    { value: 'asc', label: 'Low to High' },
    { value: 'desc', label: 'High to Low' }
  ], []);

  const updateSort = useCallback((field: string, order: string) => {
    setSortBy(field);
    setSortOrder(order);
  }, []);

  const getSortQuery = useCallback(() => {
    return {
      sortBy,
      sortOrder
    };
  }, [sortBy, sortOrder]);

  const getSortLabel = useCallback(() => {
    const sortOption = sortOptions.find(opt => opt.value === sortBy);
    const orderOption = orderOptions.find(opt => opt.value === sortOrder);
    
    if (sortBy === 'relevance') {
      return 'Relevance';
    }
    
    return `${sortOption?.label} (${orderOption?.label})`;
  }, [sortBy, sortOrder, sortOptions, orderOptions]);

  const applySorting = useCallback((results: Array<{
    id: string;
    title: string;
    location: string;
    price: number;
    createdAt: string;
    areaSqft: number;
  }>) => {
    return [...results].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'area':
          comparison = a.areaSqft - b.areaSqft;
          break;
        case 'location':
          comparison = a.location.localeCompare(b.location);
          break;
        case 'relevance':
        default:
          return 0; // Keep original order for relevance
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [sortBy, sortOrder]);

  return {
    sortBy,
    sortOrder,
    sortOptions,
    orderOptions,
    updateSort,
    sortQuery: getSortQuery(),
    sortLabel: getSortLabel(),
    applySorting
  };
}
