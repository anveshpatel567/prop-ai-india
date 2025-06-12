
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Sparkles, Filter, MapPin, Home, IndianRupee, Wand2 } from 'lucide-react';
import { AiToolGate } from '@/components/common/AiToolGate';
import { useAiSearch } from '@/hooks/useAiSearch';
import { useWallet } from '@/context/WalletContext';
import { useToast } from '@/hooks/use-toast';

interface SearchFilters {
  property_type: string;
  listing_type: string;
  city: string;
  locality: string;
  min_price: string;
  max_price: string;
  bedrooms: string;
  bathrooms: string;
}

interface EnhancedSearchInterfaceProps {
  onSearch: (filters: SearchFilters) => void;
  onAiSearch: (query: string) => void;
  searchResults: any[];
  loading: boolean;
}

export const EnhancedSearchInterface: React.FC<EnhancedSearchInterfaceProps> = ({
  onSearch,
  onAiSearch,
  searchResults,
  loading
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    property_type: '',
    listing_type: 'sale',
    city: '',
    locality: '',
    min_price: '',
    max_price: '',
    bedrooms: '',
    bathrooms: '',
  });

  const { searching, searchWithAi } = useAiSearch();
  const { balance, deductCredits } = useWallet();
  const { toast } = useToast();

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleManualSearch = () => {
    onSearch(filters);
  };

  const handleAiEnhanceSearch = async () => {
    const currentCredits = balance?.balance || 0;
    if (currentCredits < 10) {
      toast({
        title: "Insufficient Credits",
        description: "You need 10 credits to enhance search with AI",
        variant: "destructive"
      });
      return;
    }

    try {
      const success = await deductCredits(10, 'AI Search Enhancement');
      if (!success) {
        toast({
          title: "Payment Failed",
          description: "Could not deduct credits for AI enhancement",
          variant: "destructive"
        });
        return;
      }

      // Convert current filters to AI query
      const queryParts = [];
      if (filters.property_type) queryParts.push(filters.property_type);
      if (filters.bedrooms) queryParts.push(`${filters.bedrooms} bedroom`);
      if (filters.city) queryParts.push(`in ${filters.city}`);
      if (filters.min_price || filters.max_price) {
        queryParts.push(`budget ${filters.min_price || '0'} to ${filters.max_price || 'unlimited'}`);
      }
      
      const aiQuery = queryParts.join(' ') || 'property search';
      await searchWithAi(aiQuery);
      onAiSearch(aiQuery);
      
      toast({
        title: "AI Enhancement Complete",
        description: "Search enhanced with AI insights",
      });
    } catch (error) {
      console.error('AI enhancement failed:', error);
      toast({
        title: "Enhancement Failed",
        description: "Could not enhance search with AI",
        variant: "destructive"
      });
    }
  };

  const handleDirectAiSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      await searchWithAi(searchQuery);
      onAiSearch(searchQuery);
    } catch (error) {
      console.error('AI search failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Your Perfect Property
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Manual Search
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI Search
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="manual" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="property_type">Property Type</Label>
                  <Select
                    value={filters.property_type}
                    onValueChange={(value) => handleFilterChange('property_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Type</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="plot">Plot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="listing_type">For</Label>
                  <Select
                    value={filters.listing_type}
                    onValueChange={(value) => handleFilterChange('listing_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    placeholder="e.g., Mumbai"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locality">Locality</Label>
                  <Input
                    id="locality"
                    value={filters.locality}
                    onChange={(e) => handleFilterChange('locality', e.target.value)}
                    placeholder="e.g., Bandra West"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min_price">Min Price</Label>
                  <Input
                    id="min_price"
                    type="number"
                    value={filters.min_price}
                    onChange={(e) => handleFilterChange('min_price', e.target.value)}
                    placeholder="₹ Minimum"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max_price">Max Price</Label>
                  <Input
                    id="max_price"
                    type="number"
                    value={filters.max_price}
                    onChange={(e) => handleFilterChange('max_price', e.target.value)}
                    placeholder="₹ Maximum"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select
                    value={filters.bedrooms}
                    onValueChange={(value) => handleFilterChange('bedrooms', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="1">1 BHK</SelectItem>
                      <SelectItem value="2">2 BHK</SelectItem>
                      <SelectItem value="3">3 BHK</SelectItem>
                      <SelectItem value="4">4+ BHK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select
                    value={filters.bathrooms}
                    onValueChange={(value) => handleFilterChange('bathrooms', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleManualSearch}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {loading ? 'Searching...' : 'Search Properties'}
                </Button>
                
                <Button
                  onClick={handleAiEnhanceSearch}
                  disabled={loading || searching}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Wand2 className="h-4 w-4" />
                  Enhance with AI (10 Credits)
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="space-y-4">
              <AiToolGate
                toolName="ai_search"
                toolTitle="AI Property Search"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai_query">Describe what you're looking for</Label>
                    <Input
                      id="ai_query"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g., 3BHK apartment in Mumbai under 2 crores with parking"
                      className="text-base"
                    />
                  </div>

                  <Button
                    onClick={handleDirectAiSearch}
                    disabled={searching || !searchQuery.trim()}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {searching ? 'AI Searching...' : 'Search with AI (10 Credits)'}
                  </Button>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">AI Search Examples:</h4>
                    <ul className="text-sm text-purple-600 space-y-1">
                      <li>• "2BHK flat in Pune near IT parks under 80 lakhs"</li>
                      <li>• "Commercial space for rent in Bangalore with parking"</li>
                      <li>• "Villa in Goa with sea view and swimming pool"</li>
                      <li>• "Studio apartment in Delhi metro connectivity"</li>
                    </ul>
                  </div>
                </div>
              </AiToolGate>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <div className="text-sm text-gray-600">
          Found {searchResults.length} properties matching your criteria
        </div>
      )}
    </div>
  );
};
