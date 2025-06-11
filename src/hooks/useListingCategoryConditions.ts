
import { useState, useEffect } from 'react';
import { ListingCategory, ListingCondition } from '../types';
import { supabase } from '@/integrations/supabase/client';

export const useListingCategoryConditions = () => {
  const [categories, setCategories] = useState<ListingCategory[]>([]);
  const [conditions, setConditions] = useState<ListingCondition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, conditionsRes] = await Promise.all([
          supabase.from('listing_categories').select('*'),
          supabase.from('listing_conditions').select('*')
        ]);

        if (categoriesRes.error) throw categoriesRes.error;
        if (conditionsRes.error) throw conditionsRes.error;

        setCategories(categoriesRes.data || []);
        setConditions(conditionsRes.data || []);
      } catch (error) {
        console.error('Error fetching listing data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getConditionsForCategory = (categoryId: string): ListingCondition[] => {
    return conditions.filter(condition => condition.category_id === categoryId);
  };

  return {
    categories,
    conditions,
    loading,
    getConditionsForCategory
  };
};
