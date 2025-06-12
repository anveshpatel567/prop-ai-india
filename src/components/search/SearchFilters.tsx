
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Search, Zap } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (filters: SearchFilterData) => void;
  onAiSearch: (query: string) => void;
}

interface SearchFilterData {
  location: string;
  city: string;
  state: string;
  property_type: string;
  listing_type: string;
  min_price: number;
  max_price: number;
  bedrooms: number;
  bathrooms: number;
  min_area: number;
  max_area: number;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch, onAiSearch }) => {
  const [filters, setFilters] = useState<SearchFilterData>({
    location: '',
    city: '',
    state: '',
    property_type: '',
    listing_type: '',
    min_price: 0,
    max_price: 10000000,
    bedrooms: 0,
    bathrooms: 0,
    min_area: 0,
    max_area: 5000,
  });

  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [areaRange, setAreaRange] = useState([0, 5000]);
  const [aiQuery, setAiQuery] = useState('');
  const [useAiSearch, setUseAiSearch] = useState(false);

  const handleFilterChange = (key: keyof SearchFilterData, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    setFilters(prev => ({ 
      ...prev, 
      min_price: values[0], 
      max_price: values[1] 
    }));
  };

  const handleAreaChange = (values: number[]) => {
    setAreaRange(values);
    setFilters(prev => ({ 
      ...prev, 
      min_area: values[0], 
      max_area: values[1] 
    }));
  };

  const handleSearch = () => {
    if (useAiSearch && aiQuery.trim()) {
      onAiSearch(aiQuery);
    } else {
      onSearch(filters);
    }
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      city: '',
      state: '',
      property_type: '',
      listing_type: '',
      min_price: 0,
      max_price: 10000000,
      bedrooms: 0,
      bathrooms: 0,
      min_area: 0,
      max_area: 5000,
    });
    setPriceRange([0, 10000000]);
    setAreaRange([0, 5000]);
    setAiQuery('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Property Search</span>
          <div className="flex items-center space-x-2">
            <Label htmlFor="ai-mode" className="text-sm">Smart Match AI</Label>
            <Switch
              id="ai-mode"
              checked={useAiSearch}
              onCheckedChange={setUseAiSearch}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {useAiSearch ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ai-query">Describe your ideal property</Label>
              <Input
                id="ai-query"
                placeholder="e.g., 3BHK apartment near IT parks in Bangalore under 80 lakhs"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Location Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Select onValueChange={(value) => handleFilterChange('city', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Select onValueChange={(value) => handleFilterChange('state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="telangana">Telangana</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Property Type and Listing Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="property-type">Property Type</Label>
                <Select onValueChange={(value) => handleFilterChange('property_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="plot">Plot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="listing-type">Listing Type</Label>
                <Select onValueChange={(value) => handleFilterChange('listing_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <Label>Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}</Label>
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                max={10000000}
                min={0}
                step={100000}
                className="mt-2"
              />
            </div>

            {/* Bedrooms and Bathrooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select onValueChange={(value) => handleFilterChange('bedrooms', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Select onValueChange={(value) => handleFilterChange('bathrooms', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Area Range */}
            <div>
              <Label>Area Range: {areaRange[0]} - {areaRange[1]} sq ft</Label>
              <Slider
                value={areaRange}
                onValueChange={handleAreaChange}
                max={5000}
                min={0}
                step={100}
                className="mt-2"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button 
            onClick={handleSearch}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-600"
          >
            {useAiSearch ? (
              <>
                <Zap className="h-4 w-4 mr-2" />
                AI Search
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search
              </>
            )}
          </Button>
          
          <Button 
            onClick={clearFilters}
            variant="outline"
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
