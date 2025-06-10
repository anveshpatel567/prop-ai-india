
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useWallet } from '@/context/WalletContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useAiSearch = () => {
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { user } = useAuth();
  const { deductCredits } = useWallet();
  const { toast } = useToast();

  const searchWithAi = async (query: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to use AI search",
        variant: "destructive"
      });
      return;
    }

    const creditsRequired = 10;
    const canAfford = await deductCredits(creditsRequired, 'AI Property Search');
    
    if (!canAfford) {
      toast({
        title: "Insufficient Credits",
        description: "You need 10 credits for AI search",
        variant: "destructive"
      });
      return;
    }

    setSearching(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai/search-match', {
        body: {
          search_query: query,
          user_id: user.id
        }
      });

      if (error) throw error;

      // Mock results for now
      const mockResults = [
        {
          id: '1',
          title: 'Luxury 3BHK in Bandra West',
          price: 25000000,
          location: 'Bandra West, Mumbai',
          match_score: 95,
          match_reasons: ['Exact bedroom match', 'Location preference', 'Budget compatible']
        }
      ];

      setSearchResults(mockResults);
      toast({
        title: "AI Search Complete",
        description: `Found ${mockResults.length} matching properties`
      });
      
      return mockResults;
    } catch (error) {
      console.error('Error with AI search:', error);
      toast({
        title: "Search Failed",
        description: "Unable to complete AI search. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setSearching(false);
    }
  };

  return {
    searching,
    searchResults,
    searchWithAi,
    resetResults: () => setSearchResults([])
  };
};
