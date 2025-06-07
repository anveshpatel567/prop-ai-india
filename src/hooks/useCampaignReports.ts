
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CampaignReport {
  id: string;
  offer_id: string;
  views: number;
  clicks: number;
  ctr: number;
  last_interaction_at: string | null;
  created_at: string;
}

export interface CampaignReportsHookReturn {
  data: CampaignReport[];
  loading: boolean;
  error: string | null;
}

export function useCampaignReports(listingId?: string): CampaignReportsHookReturn {
  const [data, setData] = useState<CampaignReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      if (!listingId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // First get the offer IDs for this listing
        const { data: offers, error: offersError } = await supabase
          .from('listing_offers')
          .select('id')
          .eq('listing_id', listingId);

        if (offersError) throw offersError;

        if (!offers || offers.length === 0) {
          setData([]);
          setLoading(false);
          return;
        }

        const offerIds = offers.map(offer => offer.id);

        // Then get the campaign reports for those offers
        const { data: reports, error: reportsError } = await supabase
          .from('campaign_reports')
          .select('*')
          .in('offer_id', offerIds)
          .order('created_at', { ascending: false });

        if (reportsError) throw reportsError;

        setData(reports || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch campaign reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [listingId]);

  return { data, loading, error };
}

export function useAllCampaignReports(): CampaignReportsHookReturn {
  const [data, setData] = useState<CampaignReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllReports = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: reports, error: reportsError } = await supabase
          .from('campaign_reports')
          .select('*')
          .order('created_at', { ascending: false });

        if (reportsError) throw reportsError;

        setData(reports || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch all campaign reports');
      } finally {
        setLoading(false);
      }
    };

    fetchAllReports();
  }, []);

  return { data, loading, error };
}
