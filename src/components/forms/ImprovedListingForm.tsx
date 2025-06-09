
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Home, MapPin, DollarSign, Upload, CheckCircle } from 'lucide-react';

const listingSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  propertyType: z.string().min(1, 'Property type is required'),
  listingType: z.string().min(1, 'Listing type is required'),
  price: z.number().min(1, 'Price is required'),
  area: z.number().min(1, 'Area is required'),
  unit: z.string().min(1, 'Unit is required'),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  city: z.string().min(1, 'City is required'),
  locality: z.string().min(1, 'Locality is required'),
  address: z.string().min(10, 'Full address is required'),
  amenities: z.array(z.string()).optional(),
  isReraRegistered: z.boolean().optional(),
});

type ListingFormData = z.infer<typeof listingSchema>;

interface ImprovedListingFormProps {
  onReraToggle?: (show: boolean) => void;
}

export const ImprovedListingForm: React.FC<ImprovedListingFormProps> = ({ onReraToggle }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReraRegistered, setIsReraRegistered] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema)
  });

  const propertyType = watch('propertyType');
  const unit = watch('unit');

  const handleReraToggle = (checked: boolean) => {
    setIsReraRegistered(checked);
    setValue('isReraRegistered', checked);
    onReraToggle?.(checked);
  };

  const onSubmit = async (data: ListingFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Listing Data:', data);
      toast({
        title: "Listing Created",
        description: "Your property listing has been successfully created!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create listing. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderConditionalFields = () => {
    if (propertyType === 'residential') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              type="number"
              {...register('bedrooms', { valueAsNumber: true })}
              className="border-orange-200 focus:border-orange-500"
            />
          </div>
          <div>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              type="number"
              {...register('bathrooms', { valueAsNumber: true })}
              className="border-orange-200 focus:border-orange-500"
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <Home className="mr-2 h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Property Title *</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="e.g., Spacious 3BHK Apartment in Bandra West"
              className="border-orange-200 focus:border-orange-500"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe your property, amenities, and unique features..."
              rows={4}
              className="border-orange-200 focus:border-orange-500"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Property Type *</Label>
              <Select onValueChange={(value) => setValue('propertyType', value)}>
                <SelectTrigger className="border-orange-200 focus:border-orange-500">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="plot">Plot/Land</SelectItem>
                </SelectContent>
              </Select>
              {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType.message}</p>}
            </div>

            <div>
              <Label>Listing Type *</Label>
              <Select onValueChange={(value) => setValue('listingType', value)}>
                <SelectTrigger className="border-orange-200 focus:border-orange-500">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sell">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                  <SelectItem value="lease">Lease</SelectItem>
                </SelectContent>
              </Select>
              {errors.listingType && <p className="text-red-500 text-sm mt-1">{errors.listingType.message}</p>}
            </div>
          </div>

          {renderConditionalFields()}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="rera"
              checked={isReraRegistered}
              onCheckedChange={handleReraToggle}
            />
            <Label htmlFor="rera">RERA Registered Property</Label>
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Area */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <DollarSign className="mr-2 h-5 w-5" />
            Pricing & Area
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="price">Price (₹) *</Label>
            <Input
              id="price"
              type="number"
              {...register('price', { valueAsNumber: true })}
              placeholder="Enter price in rupees"
              className="border-orange-200 focus:border-orange-500"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="area">
                {isReraRegistered ? 'RERA Carpet Area *' : 'Area *'}
              </Label>
              <Input
                id="area"
                type="number"
                {...register('area', { valueAsNumber: true })}
                placeholder="Enter area"
                className="border-orange-200 focus:border-orange-500"
                disabled={isReraRegistered}
              />
              {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>}
            </div>

            <div>
              <Label>Unit *</Label>
              <Select onValueChange={(value) => setValue('unit', value)}>
                <SelectTrigger className="border-orange-200 focus:border-orange-500">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sq-ft">sq.ft</SelectItem>
                  <SelectItem value="sq-m">sq.m</SelectItem>
                  <SelectItem value="acres">acres</SelectItem>
                  <SelectItem value="gaj">gaj</SelectItem>
                  <SelectItem value="bigha">bigha</SelectItem>
                  <SelectItem value="hectare">hectare</SelectItem>
                  <SelectItem value="kanal">kanal</SelectItem>
                  <SelectItem value="marla">marla</SelectItem>
                </SelectContent>
              </Select>
              {errors.unit && <p className="text-red-500 text-sm mt-1">{errors.unit.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <MapPin className="mr-2 h-5 w-5" />
            Location Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                {...register('city')}
                placeholder="e.g., Mumbai"
                className="border-orange-200 focus:border-orange-500"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>

            <div>
              <Label htmlFor="locality">Locality *</Label>
              <Input
                id="locality"
                {...register('locality')}
                placeholder="e.g., Bandra West"
                className="border-orange-200 focus:border-orange-500"
              />
              {errors.locality && <p className="text-red-500 text-sm mt-1">{errors.locality.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="address">Full Address *</Label>
            <Textarea
              id="address"
              {...register('address')}
              placeholder="Enter complete address with landmarks"
              rows={3}
              className="border-orange-200 focus:border-orange-500"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          className="border-orange-300 text-orange-600 hover:bg-orange-50"
        >
          Save Draft
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isSubmitting ? (
            <>
              <Upload className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Create Listing
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
