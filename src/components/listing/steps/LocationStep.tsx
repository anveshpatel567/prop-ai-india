
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Navigation } from 'lucide-react';

interface LocationStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({ data, onDataChange, onNext }) => {
  const [locating, setLocating] = useState(false);

  const handleChange = (field: string, value: any) => {
    onDataChange({ [field]: value });
  };

  const getCurrentLocation = () => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleChange('google_maps_pin', `${latitude},${longitude}`);
          setLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocating(false);
        }
      );
    }
  };

  const canProceed = data.city && data.locality && data.google_maps_pin;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Property Location</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={data.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="e.g., Mumbai"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="locality">Locality/Area *</Label>
          <Input
            id="locality"
            value={data.locality || ''}
            onChange={(e) => handleChange('locality', e.target.value)}
            placeholder="e.g., Bandra West"
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="address">Complete Address</Label>
          <Textarea
            id="address"
            value={data.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Enter complete address with landmarks"
            rows={3}
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="google_maps_pin">Google Maps Location *</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={getCurrentLocation}
              disabled={locating}
              className="flex items-center gap-2"
            >
              <Navigation className="h-4 w-4" />
              {locating ? 'Getting Location...' : 'Use Current Location'}
            </Button>
          </div>
          <Input
            id="google_maps_pin"
            value={data.google_maps_pin || ''}
            onChange={(e) => handleChange('google_maps_pin', e.target.value)}
            placeholder="Paste Google Maps link or coordinates"
            required
          />
          <p className="text-xs text-gray-500">
            Copy the Google Maps link of your property or use current location
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Location Tips:</h4>
        <ul className="text-sm text-blue-600 space-y-1">
          <li>• Provide exact locality for better visibility</li>
          <li>• Mention nearby landmarks in address</li>
          <li>• Accurate location helps buyers find your property easily</li>
          <li>• Use Google Maps link for precise location</li>
        </ul>
      </div>

      <Button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full bg-gradient-to-r from-orange-500 to-red-600"
      >
        Continue to Pricing
      </Button>
    </div>
  );
};
