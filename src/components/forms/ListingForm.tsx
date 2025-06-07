import React, { useState } from 'react';
import { GlowButton } from '@/components/common/GlowButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useListings } from '@/hooks/useListings';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const ListingForm: React.FC = () => {
  const { createListing, loading } = useListings();
  const { user } = useSupabaseUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: '',
    listing_type: 'sale' as 'sale' | 'rent',
    price: 0,
    area_sqft: 0,
    bedrooms: 0,
    bathrooms: 0,
    city: '',
    locality: '',
    google_maps_pin: '',
    amenities: [] as string[],
  });

  const [amenityInput, setAmenityInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a listing",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    // Validate required fields
    if (!formData.city.trim()) {
      toast({
        title: "City required",
        description: "Please enter a city",
        variant: "destructive"
      });
      return;
    }

    if (!formData.google_maps_pin.trim()) {
      toast({
        title: "Location required",
        description: "Please enter a Google Maps location or address",
        variant: "destructive"
      });
      return;
    }

    const listing = await createListing({
      user_id: user.id,
      title: formData.title,
      description: formData.description,
      property_type: formData.property_type as 'residential' | 'commercial' | 'plot',
      listing_type: formData.listing_type,
      price: formData.price,
      area_sqft: formData.area_sqft || null,
      bedrooms: formData.bedrooms || null,
      bathrooms: formData.bathrooms || null,
      city: formData.city,
      locality: formData.locality || null,
      google_maps_pin: formData.google_maps_pin,
      amenities: formData.amenities,
      photos: ['/placeholder.svg']
    });

    if (listing) {
      toast({
        title: "Listing created successfully!",
        description: "Your property has been listed and is now live",
        variant: "default"
      });
      navigate('/listing/all');
    } else {
      toast({
        title: "Failed to create listing",
        description: "Please check your data and try again",
        variant: "destructive"
      });
    }
  };

  const addAmenity = () => {
    if (amenityInput.trim() && !formData.amenities.includes(amenityInput.trim())) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenityInput.trim()]
      });
      setAmenityInput('');
    }
  };

  const removeAmenity = (amenity: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter(a => a !== amenity)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Property Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="e.g., Luxury 3BHK Apartment"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
            placeholder="e.g., Mumbai, Delhi"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="locality">Locality/Area</Label>
        <Input
          id="locality"
          value={formData.locality}
          onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
          placeholder="e.g., Bandra West, CP"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your property..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="property_type">Property Type</Label>
          <Select
            value={formData.property_type}
            onValueChange={(value) => setFormData({ ...formData, property_type: value })}
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
          <Label htmlFor="listing_type">Listing Type</Label>
          <Select
            value={formData.listing_type}
            onValueChange={(value) => setFormData({ ...formData, listing_type: value as 'sale' | 'rent' })}
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
          <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price || ''}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="area_sqft">Area (sq ft)</Label>
          <Input
            id="area_sqft"
            type="number"
            value={formData.area_sqft || ''}
            onChange={(e) => setFormData({ ...formData, area_sqft: Number(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            value={formData.bedrooms || ''}
            onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            type="number"
            value={formData.bathrooms || ''}
            onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="google_maps_pin">Address/Google Maps Location</Label>
        <Textarea
          id="google_maps_pin"
          value={formData.google_maps_pin}
          onChange={(e) => setFormData({ ...formData, google_maps_pin: e.target.value })}
          placeholder="Complete address or Google Maps link/coordinates"
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Amenities</Label>
        <div className="flex gap-2">
          <Input
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            placeholder="Add amenity"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
          />
          <GlowButton type="button" onClick={addAmenity} size="sm">
            Add
          </GlowButton>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.amenities.map((amenity, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {amenity}
              <button
                type="button"
                onClick={() => removeAmenity(amenity)}
                className="text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <GlowButton type="submit" className="w-full" disabled={loading} size="lg">
        {loading ? 'Creating...' : 'Create Listing'}
      </GlowButton>
    </form>
  );
};
