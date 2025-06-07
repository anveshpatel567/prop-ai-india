
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface FraudFlag {
  id: string;
  user_id: string;
  listing_id: string;
  flagged_by: string;
  fraud_indicators: any;
  confidence_score: number;
  status: string;
  admin_reviewed: boolean;
  created_at: string;
}

export function useFraudFlagging() {
  const { user } = useAuth();
  const [flags, setFlags] = useState<FraudFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchFlags();
    }
  }, [user?.id]);

  const fetchFlags = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_fraud_flags')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFlags(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch fraud flags');
    } finally {
      setLoading(false);
    }
  };

  const flagListing = async (listing_id: string, indicators: any) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('flagFraudulentListing', {
        body: { listing_id, indicators }
      });

      if (error) throw error;
      await fetchFlags();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to flag listing');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    flags,
    loading,
    error,
    flagListing,
    refetch: fetchFlags
  };
}
