
import { useState, useEffect } from 'react';
import { ListingCategory, ListingCondition } from '../types';

export const useListingCategoryConditions = () => {
  const [categories, setCategories] = useState<ListingCategory[]>([]);
  const [conditions, setConditions] = useState<ListingCondition[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      // Mock data for now - will be replaced with Supabase calls
      const mockCategories: ListingCategory[] = [
        { id: '1', slug: 'residential-apartment', label: 'Residential Apartment', parent_id: null, is_active: true },
        { id: '2', slug: 'residential-villa', label: 'Residential Villa', parent_id: null, is_active: true },
        { id: '3', slug: 'commercial-office', label: 'Commercial Office', parent_id: null, is_active: true },
        { id: '4', slug: 'commercial-retail', label: 'Commercial Retail', parent_id: null, is_active: true },
        { id: '5', slug: 'land-plot', label: 'Land Plot', parent_id: null, is_active: true }
      ];
      setCategories(mockCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchConditionsForCategory = async (categoryId: string) => {
    setIsLoading(true);
    try {
      // Mock data for now - will be replaced with Supabase calls
      const mockConditions: ListingCondition[] = [
        {
          id: '1',
          label: 'Number of Bedrooms',
          applies_to_category_id: categoryId,
          input_type: 'dropdown',
          options: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'],
          is_required: true
        },
        {
          id: '2',
          label: 'Furnishing Status',
          applies_to_category_id: categoryId,
          input_type: 'dropdown',
          options: ['Fully Furnished', 'Semi Furnished', 'Unfurnished'],
          is_required: false
        },
        {
          id: '3',
          label: 'Parking Available',
          applies_to_category_id: categoryId,
          input_type: 'checkbox',
          options: null,
          is_required: false
        },
        {
          id: '4',
          label: 'Built-up Area (sq ft)',
          applies_to_category_id: categoryId,
          input_type: 'number',
          options: null,
          is_required: true
        }
      ];
      setConditions(mockConditions);
    } catch (error) {
      console.error('Error fetching conditions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    conditions,
    isLoading,
    fetchConditionsForCategory
  };
};
