
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Zap } from 'lucide-react';

export const ImprovedListingForm: React.FC = () => {
  const [propertyType, setPropertyType] = useState('');
  const [listingType, setListingType] = useState('');
  const [areaUnit, setAreaUnit] = useState('sqft');
  const [reraListed, setReraListed] = useState(false);

  const propertyTypes = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'plot', label: 'Plot/Land' }
  ];

  const areaUnits = [
    { value: 'sqft', label: 'sq.ft' },
    { value: 'sqm', label: 'sq.m' },
    { value: 'acres', label: 'Acres' },
    { value: 'gaj', label: 'Gaj' },
    { value: 'bigha', label: 'Bigha' },
    { value: 'hectare', label: 'Hectare' },
    { value: 'kanal', label: 'Kanal' },
    { value: 'marla', label: 'Marla' }
  ];

  const renderResidentialFields = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select bedrooms" />
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select bathrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Balcony</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select balcony" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">No Balcony</SelectItem>
            <SelectItem value="1">1 Balcony</SelectItem>
            <SelectItem value="2">2 Balcony</SelectItem>
            <SelectItem value="3">3+ Balcony</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderCommercialFields = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Parking Spaces</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select parking" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">No Parking</SelectItem>
            <SelectItem value="1">1 Space</SelectItem>
            <SelectItem value="2">2 Spaces</SelectItem>
            <SelectItem value="3">3+ Spaces</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Brochure Upload Section */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <Upload className="mr-2 h-5 w-5" />
            Upload Property Brochure (AI Parsing - 10 Credits)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
            <FileText className="mx-auto h-12 w-12 text-orange-400 mb-4" />
            <p className="text-gray-600 mb-4">
              Drop your property brochure here or click to browse
            </p>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30">
              <Zap className="mr-2 h-4 w-4" />
              Parse with AI (10₹)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Manual Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type</label>
              <Select value={listingType} onValueChange={setListingType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select listing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
            <Input placeholder="Enter property title" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <Input placeholder="Enter complete address" />
          </div>

          {/* Property Type Specific Fields */}
          {propertyType === 'residential' && renderResidentialFields()}
          {propertyType === 'commercial' && renderCommercialFields()}

          {/* Area Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rera-listed"
                checked={reraListed}
                onChange={(e) => setReraListed(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="rera-listed" className="text-sm font-medium text-gray-700">
                RERA Listed Property
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit</label>
                <Select value={areaUnit} onValueChange={setAreaUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {areaUnits.map(unit => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {propertyType !== 'plot' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Carpet Area</label>
                  <Input 
                    type="number" 
                    placeholder={`Enter area in ${areaUnit}`}
                    disabled={reraListed}
                  />
                  {reraListed && (
                    <p className="text-xs text-orange-600 mt-1">Auto-filled from RERA data</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Built-up Area</label>
                  <Input type="number" placeholder={`Enter area in ${areaUnit}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Super Built-up Area</label>
                  <Input type="number" placeholder={`Enter area in ${areaUnit}`} />
                </div>
              </div>
            )}

            {propertyType === 'plot' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plot Area</label>
                <Input type="number" placeholder={`Enter area in ${areaUnit}`} />
              </div>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
            <Input type="number" placeholder="Enter price in Indian Rupees" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <Textarea 
              placeholder="Describe your property..." 
              className="h-32"
            />
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105">
            Create Listing
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
