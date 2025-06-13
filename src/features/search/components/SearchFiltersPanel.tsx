
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';

export function SearchFiltersPanel({ 
  onFiltersChange, 
  onClose 
}: { 
  onFiltersChange: (filters: {
    location: string;
    minPrice: number;
    maxPrice: number;
    propertyType: string;
    listingType: string;
    bedrooms: number;
    bathrooms: number;
  }) => void;
  onClose: () => void;
}) {
  const [location, setLocation] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000000]);
  const [propertyType, setPropertyType] = useState<string>('');
  const [listingType, setListingType] = useState<string>('');
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);

  const handleApplyFilters = () => {
    onFiltersChange({
      location,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      propertyType,
      listingType,
      bedrooms,
      bathrooms
    });
  };

  const handleClearFilters = () => {
    setLocation('');
    setPriceRange([0, 10000000]);
    setPropertyType('');
    setListingType('');
    setBedrooms(0);
    setBathrooms(0);
    onFiltersChange({
      location: '',
      minPrice: 0,
      maxPrice: 10000000,
      propertyType: '',
      listingType: '',
      bedrooms: 0,
      bathrooms: 0
    });
  };

  return (
    <Card className="w-80 h-fit">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Search Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input
            placeholder="Enter city or locality"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
          </label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={10000000}
            step={100000}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Property Type</label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="plot">Plot</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Listing Type</label>
          <Select value={listingType} onValueChange={setListingType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Bedrooms</label>
            <Input
              type="number"
              min="0"
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Bathrooms</label>
            <Input
              type="number"
              min="0"
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleApplyFilters} className="flex-1">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
