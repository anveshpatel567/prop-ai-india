
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PropertyMatch {
  id: string;
  seeker_id: string;
  listing_id: string;
  match_score: number;
  explanation: string;
  created_at: string;
  listing?: any;
}

export interface SeekerProfile {
  budget?: number;
  propertyType?: string;
  location?: string;
  bedrooms?: number;
  notes?: string;
}

export const usePropertyMatches = () => {
  const [matches, setMatches] = useState<PropertyMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchMatches = async (seekerId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_property_matches')
        .select(`
          *,
          listing:listings(*)
        `)
        .order('match_score', { ascending: false });

      if (seekerId) {
        query = query.eq('seeker_id', seekerId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setMatches(data || []);
    } catch (error) {
      console.error('Error fetching property matches:', error);
      toast({
        title: "Error",
        description: "Failed to fetch property matches",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateMatches = async (seekerId: string, seekerProfile: SeekerProfile) => {
    try {
      setLoading(true);

      // First, fetch available listings
      const { data: listings, error: listingsError } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'active')
        .limit(20);

      if (listingsError) throw listingsError;

      if (!listings || listings.length === 0) {
        toast({
          title: "No Properties",
          description: "No active properties found to match",
          variant: "destructive",
        });
        return;
      }

      // Call the edge function to generate matches
      const { data, error } = await supabase.functions.invoke('ai/smartPropertyMatch', {
        body: {
          seekerId,
          listings,
          seekerProfile
        }
      });

      if (error) throw error;

      if (data.success) {
        setMatches(data.matches);
        toast({
          title: "Success",
          description: `Generated ${data.matches.length} property matches`,
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error generating property matches:', error);
      toast({
        title: "Error",
        description: "Failed to generate property matches",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    matches,
    loading,
    fetchMatches,
    generateMatches,
  };
};
