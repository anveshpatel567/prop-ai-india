
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

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
            placeholder="Built-up area"
          />
        </div>

        {data.property_type === 'residential' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select
                value={data.bedrooms?.toString() || ''}
                onValueChange={(value) => handleChange('bedrooms', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 BHK</SelectItem>
                  <SelectItem value="2">2 BHK</SelectItem>
                  <SelectItem value="3">3 BHK</SelectItem>
                  <SelectItem value="4">4 BHK</SelectItem>
                  <SelectItem value="5">5+ BHK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select
                value={data.bathrooms?.toString() || ''}
                onValueChange={(value) => handleChange('bathrooms', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="description">Property Description</Label>
          <Textarea
            id="description"
            value={data.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Describe your property features, amenities, and highlights..."
            rows={4}
          />
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg">
        <h4 className="font-medium text-orange-800 mb-2">Quick Tips:</h4>
        <ul className="text-sm text-orange-600 space-y-1">
          <li>• Use a clear, descriptive title that highlights key features</li>
          <li>• Accurate property type helps in better categorization</li>
          <li>• Competitive pricing attracts more genuine inquiries</li>
          <li>• Detailed description increases buyer interest</li>
        </ul>
      </div>
    </div>
  );
};
