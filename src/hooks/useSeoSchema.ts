
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SeoSchemaData {
  id: string;
  listing_id: string;
  generated_by: string;
  jsonld: string;
  created_at: string;
}

export function useSeoSchema() {
  const [data, setData] = useState<SeoSchemaData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateSchema = async (listing_id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: result, error: functionError } = await supabase.functions.invoke('generateSeoSchema', {
        body: { listing_id }
      });

      if (functionError) throw functionError;
      
      setData(result);
      toast({
        title: "SEO Schema Generated",
        description: "JSON-LD schema has been created successfully!",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate SEO schema';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSchema = async (listing_id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: result, error } = await supabase
        .from('seo_schemas')
        .select('*')
        .eq('listing_id', listing_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch SEO schema';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { 
    data, 
    loading, 
    error, 
    generateSchema, 
    fetchSchema 
  };
}
