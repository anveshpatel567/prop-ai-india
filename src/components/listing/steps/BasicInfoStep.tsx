
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BasicInfoStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, onDataChange, onNext }) => {
  const handleChange = (field: string, value: any) => {
    onDataChange({ [field]: value });
  };

  const canProceed = data.title && data.property_type && data.listing_type && data.price > 0;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Basic Property Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Property Title *</Label>
          <Input
            id="title"
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., Luxury 3BHK Apartment"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="property_type">Property Type *</Label>
          <Select
            value={data.property_type || ''}
            onValueChange={(value) => handleChange('property_type', value)}
          >
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

        <div className="space-y-2">
          <Label htmlFor="listing_type">Listing Type *</Label>
          <Select
            value={data.listing_type || 'sale'}
            onValueChange={(value) => handleChange('listing_type', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            type="number"
            value={data.price || ''}
            onChange={(e) => handleChange('price', Number(e.target.value))}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="area_sqft">Area (sq ft)</Label>
          <Input
            id="area_sqft"
            type="number"
            value={data.area_sqft || ''}
            onChange={(e) => handleChange('area_sqft', Number(e.target.value))}
            placeholder="Enter area"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            value={data.bedrooms || ''}
            onChange={(e) => handleChange('bedrooms', Number(e.target.value))}
            placeholder="Number of bedrooms"
          />
        </div>
      </div>

      {!canProceed && (
        <p className="text-sm text-red-600">
          Please fill in all required fields marked with *
        </p>
      )}
    </div>
  );
};
