
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const majorCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 
  'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
  'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad'
];

interface LocationStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({ data, onDataChange, onNext }) => {
  const [mapQuery, setMapQuery] = useState('');

  const handleChange = (field: string, value: string) => {
    onDataChange({ [field]: value });
  };

  const searchGoogleMaps = () => {
    if (mapQuery.trim()) {
      const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(mapQuery)}`;
      window.open(mapsUrl, '_blank');
    }
  };

  const canProceed = data.city && data.google_maps_pin;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Property Location & Map Pin</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Select
            value={data.city || ''}
            onValueChange={(value) => handleChange('city', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {majorCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="locality">Locality/Area</Label>
          <Input
            id="locality"
            value={data.locality || ''}
            onChange={(e) => handleChange('locality', e.target.value)}
            placeholder="e.g., Bandra West, CP"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Find Location on Google Maps</Label>
        <div className="flex gap-2">
          <Input
            value={mapQuery}
            onChange={(e) => setMapQuery(e.target.value)}
            placeholder="Search for your property location"
            className="flex-1"
          />
          <Button onClick={searchGoogleMaps} size="sm" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Maps
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Search for your property, then copy the Google Maps link and paste it below
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="google_maps_pin">Google Maps Link/Pin *</Label>
        <Textarea
          id="google_maps_pin"
          value={data.google_maps_pin || ''}
          onChange={(e) => handleChange('google_maps_pin', e.target.value)}
          placeholder="Paste Google Maps link or complete address with pin code"
          rows={3}
          required
        />
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>This helps buyers find your property easily</span>
        </div>
      </div>

      {!canProceed && (
        <p className="text-sm text-red-600">
          Please select a city and provide Google Maps location
        </p>
      )}
    </div>
  );
};
