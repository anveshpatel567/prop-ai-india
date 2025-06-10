
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

const commonAmenities = [
  'Swimming Pool', 'Gym/Fitness Center', 'Parking', 'Security', 'Elevator',
  'Garden/Landscaping', 'Clubhouse', 'Children\'s Play Area', 'Power Backup',
  'Water Supply', 'CCTV Surveillance', 'Intercom', 'Fire Safety', 'Balcony',
  'Air Conditioning', 'Modular Kitchen', 'Servant Room', 'Study Room',
  'Pooja Room', 'Terrace', 'Maintenance Staff', 'Visitor Parking'
];

interface AmenitiesStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
}

export const AmenitiesStep: React.FC<AmenitiesStepProps> = ({ data, onDataChange, onNext }) => {
  const [customAmenity, setCustomAmenity] = React.useState('');
  const selectedAmenities = data.amenities || [];

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a: string) => a !== amenity)
      : [...selectedAmenities, amenity];
    
    onDataChange({ amenities: currentAmenities });
  };

  const addCustomAmenity = () => {
    if (customAmenity.trim() && !selectedAmenities.includes(customAmenity.trim())) {
      onDataChange({ amenities: [...selectedAmenities, customAmenity.trim()] });
      setCustomAmenity('');
    }
  };

  const removeAmenity = (amenity: string) => {
    onDataChange({ amenities: selectedAmenities.filter((a: string) => a !== amenity) });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Property Amenities</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {commonAmenities.map((amenity) => (
          <div key={amenity} className="flex items-center space-x-2">
            <Checkbox
              id={amenity}
              checked={selectedAmenities.includes(amenity)}
              onCheckedChange={() => toggleAmenity(amenity)}
            />
            <Label htmlFor={amenity} className="text-sm">
              {amenity}
            </Label>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <Label>Add Custom Amenity</Label>
        <div className="flex gap-2">
          <Input
            value={customAmenity}
            onChange={(e) => setCustomAmenity(e.target.value)}
            placeholder="Enter custom amenity"
            onKeyPress={(e) => e.key === 'Enter' && addCustomAmenity()}
          />
          <Button onClick={addCustomAmenity} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {selectedAmenities.length > 0 && (
        <div className="space-y-2">
          <Label>Selected Amenities ({selectedAmenities.length})</Label>
          <div className="flex flex-wrap gap-2">
            {selectedAmenities.map((amenity: string) => (
              <span
                key={amenity}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {amenity}
                <button
                  onClick={() => removeAmenity(amenity)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
