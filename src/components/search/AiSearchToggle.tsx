
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Search } from 'lucide-react';
import { useCreditGate } from '@/context/CreditGateContext';
import { useWallet } from '@/context/WalletContext';
import { supabase } from '@/integrations/supabase/client';

interface AiSearchToggleProps {
  onSearchResults: (results: any[]) => void;
  onAiSearch: (query: string) => void;
}

export const AiSearchToggle: React.FC<AiSearchToggleProps> = ({
  onSearchResults,
  onAiSearch
}) => {
  const [searchMode, setSearchMode] = useState<'manual' | 'ai'>('manual');
  const [aiQuery, setAiQuery] = useState('');
  const [manualFilters, setManualFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { checkToolAccess, logToolAttempt } = useCreditGate();
  const { deductCredits } = useWallet();

  const handleAiSearch = async () => {
    if (!aiQuery.trim()) return;

    const access = checkToolAccess('ai_search');
    await logToolAttempt('ai_search', access.canAccess);

    if (!access.canAccess) {
      alert(access.reason);
      return;
    }

    setLoading(true);
    try {
      // Deduct credits first
      const success = await deductCredits(access.creditsRequired, 'AI Search');
      if (!success) {
        throw new Error('Failed to deduct credits');
      }

      // Call AI search function
      const { data, error } = await supabase.functions.invoke('ai/search-query', {
        body: { search_query: aiQuery }
      });

      if (error) throw error;

      // Log the search
      await supabase.from('ai_search_logs').insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        search_query: aiQuery,
        ai_interpretation: data.interpretation,
        results_count: data.results?.length || 0,
        credits_used: access.creditsRequired
      });

      onAiSearch(aiQuery);
      onSearchResults(data.results || []);
    } catch (error) {
      console.error('AI search failed:', error);
      alert('AI search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = () => {
    // Basic manual search logic
    console.log('Manual search with filters:', manualFilters);
    onSearchResults([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={searchMode === 'manual' ? 'default' : 'outline'}
          onClick={() => setSearchMode('manual')}
          className="flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          Manual Search
        </Button>
        <Button
          variant={searchMode === 'ai' ? 'default' : 'outline'}
          onClick={() => setSearchMode('ai')}
          className="flex items-center gap-2"
        >
          <Brain className="h-4 w-4" />
          AI Search (10 Credits)
        </Button>
      </div>

      {searchMode === 'manual' ? (
        <div className="grid gap-3">
          <Input
            placeholder="Location (e.g., Mumbai, Bangalore)"
            value={manualFilters.location}
            onChange={(e) => setManualFilters(prev => ({ ...prev, location: e.target.value }))}
          />
          <Input
            placeholder="Property Type (e.g., Apartment, Villa)"
            value={manualFilters.propertyType}
            onChange={(e) => setManualFilters(prev => ({ ...prev, propertyType: e.target.value }))}
          />
          <Input
            placeholder="Price Range (e.g., 50L-1Cr)"
            value={manualFilters.priceRange}
            onChange={(e) => setManualFilters(prev => ({ ...prev, priceRange: e.target.value }))}
          />
          <Button onClick={handleManualSearch}>
            Search Properties
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <Textarea
            placeholder="Describe what you're looking for... e.g., '3BHK apartment near metro in Mumbai under 2 crores with parking'"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            onClick={handleAiSearch}
            disabled={loading || !aiQuery.trim()}
            className="w-full"
          >
            {loading ? 'Searching...' : 'Search with AI'}
          </Button>
        </div>
      )}
    </div>
  );
};
