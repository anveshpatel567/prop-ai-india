
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, RotateCcw, Sparkles } from 'lucide-react';
import { AiSearchToggle } from './AiSearchToggle';

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 
  'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
  'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad'
];

interface SearchFilters {
  location: string;
  property_type: string;
  listing_type: string;
  min_price: string;
  max_price: string;
  bedrooms: string;
  amenities: string[];
}

interface ImprovedSearchInterfaceProps {
  onSearch: (filters: SearchFilters) => void;
  onAiSearch: (query: string) => void;
  searchResults: any[];
  loading: boolean;
}

export const ImprovedSearchInterface: React.FC<ImprovedSearchInterfaceProps> = ({
  onSearch,
  onAiSearch,
  searchResults,
  loading
}) => {
  const [searchMode, setSearchMode] = useState<'manual' | 'ai'>('manual');
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    property_type: '',
    listing_type: '',
    min_price: '',
    max_price: '',
    bedrooms: '',
    amenities: []
  });

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      property_type: '',
      listing_type: '',
      min_price: '',
      max_price: '',
      bedrooms: '',
      amenities: []
    });
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const addAmenityFilter = (amenity: string) => {
    if (!filters.amenities.includes(amenity)) {
      setFilters(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity]
      }));
    }
  };

  const removeAmenityFilter = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Property Search</span>
            <div className="flex gap-2">
              <Button
                variant={searchMode === 'manual' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSearchMode('manual')}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Manual
              </Button>
              <Button
                variant={searchMode === 'ai' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSearchMode('ai')}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                AI Search
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {searchMode === 'manual' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select
                    value={filters.location}
                    onValueChange={(value) => handleFilterChange('location', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Property Type</Label>
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
                  <Label>Listing Type</Label>
                  <Select
                    value={filters.listing_type}
                    onValueChange={(value) => handleFilterChange('listing_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Min Price (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Min price"
                    value={filters.min_price}
                    onChange={(e) => handleFilterChange('min_price', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Max Price (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Max price"
                    value={filters.max_price}
                    onChange={(e) => handleFilterChange('max_price', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bedrooms</Label>
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
                      <SelectItem value="4">4 BHK</SelectItem>
                      <SelectItem value="5+">5+ BHK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filters.amenities.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Amenities</Label>
                  <div className="flex flex-wrap gap-2">
                    {filters.amenities.map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeAmenityFilter(amenity)}
                      >
                        {amenity} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  {loading ? 'Searching...' : 'Search Properties'}
                </Button>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          ) : (
            <AiSearchToggle
              onSearchResults={() => {}}
              onAiSearch={onAiSearch}
            />
          )}
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Search Results ({searchResults.length})
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>Showing properties near you</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Found {searchResults.length} properties matching your criteria
          </div>
        </div>
      )}
    </div>
  );
};
