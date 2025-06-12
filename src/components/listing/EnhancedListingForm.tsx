
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Wand2, FileText, Video, DollarSign } from 'lucide-react';
import { AiToolGate } from '@/components/common/AiToolGate';
import { useWallet } from '@/context/WalletContext';
import { useToast } from '@/hooks/use-toast';

interface ListingData {
  title: string;
  description: string;
  property_type: string;
  listing_type: string;
  price: string;
  city: string;
  locality: string;
  bedrooms: string;
  bathrooms: string;
  area_sqft: string;
}

export const EnhancedListingForm: React.FC = () => {
  const [listingData, setListingData] = useState<ListingData>({
    title: '',
    description: '',
    property_type: '',
    listing_type: 'sale',
    price: '',
    city: '',
    locality: '',
    bedrooms: '',
    bathrooms: '',
    area_sqft: ''
  });

  const { balance, deductCredits } = useWallet();
  const { toast } = useToast();
  const [enhancing, setEnhancing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setListingData(prev => ({ ...prev, [field]: value }));
  };

  const enhanceTitle = async () => {
    const currentCredits = balance?.balance || 0;
    if (currentCredits < 5) {
      toast({
        title: "Insufficient Credits",
        description: "You need 5 credits to enhance title with AI",
        variant: "destructive"
      });
      return;
    }

    setEnhancing(true);
    try {
      const success = await deductCredits(5, 'AI Title Enhancement');
      if (!success) {
        toast({
          title: "Payment Failed",
          description: "Could not deduct credits for AI enhancement",
          variant: "destructive"
        });
        return;
      }

      // Mock AI enhancement
      const enhancedTitle = `Luxurious ${listingData.bedrooms || '3'}BHK ${listingData.property_type || 'Apartment'} in Prime ${listingData.locality || listingData.city || 'Location'} - Ready to Move`;
      handleInputChange('title', enhancedTitle);
      
      toast({
        title: "Title Enhanced",
        description: "AI has enhanced your property title",
      });
    } catch (error) {
      console.error('Title enhancement failed:', error);
      toast({
        title: "Enhancement Failed",
        description: "Could not enhance title with AI",
        variant: "destructive"
      });
    } finally {
      setEnhancing(false);
    }
  };

  const enhanceDescription = async () => {
    const currentCredits = balance?.balance || 0;
    if (currentCredits < 15) {
      toast({
        title: "Insufficient Credits",
        description: "You need 15 credits to enhance description with AI",
        variant: "destructive"
      });
      return;
    }

    setEnhancing(true);
    try {
      const success = await deductCredits(15, 'AI Description Enhancement');
      if (!success) {
        toast({
          title: "Payment Failed",
          description: "Could not deduct credits for AI enhancement",
          variant: "destructive"
        });
        return;
      }

      // Mock AI enhancement
      const enhancedDescription = `${listingData.description || 'Beautiful property'}\n\nThis stunning ${listingData.property_type || 'property'} offers ${listingData.bedrooms || '3'} spacious bedrooms and ${listingData.bathrooms || '2'} modern bathrooms. Located in the prestigious ${listingData.locality || listingData.city || 'area'}, this property combines luxury with convenience.\n\nKey Features:\n• Prime location with excellent connectivity\n• Modern amenities and facilities\n• Well-ventilated and naturally lit spaces\n• Close to schools, hospitals, and shopping centers\n• Perfect for families and professionals`;
      
      handleInputChange('description', enhancedDescription);
      
      toast({
        title: "Description Enhanced",
        description: "AI has enhanced your property description",
      });
    } catch (error) {
      console.error('Description enhancement failed:', error);
      toast({
        title: "Enhancement Failed",
        description: "Could not enhance description with AI",
        variant: "destructive"
      });
    } finally {
      setEnhancing(false);
    }
  };

  const generatePricing = async () => {
    const currentCredits = balance?.balance || 0;
    if (currentCredits < 25) {
      toast({
        title: "Insufficient Credits",
        description: "You need 25 credits for AI pricing suggestions",
        variant: "destructive"
      });
      return;
    }

    setEnhancing(true);
    try {
      const success = await deductCredits(25, 'AI Pricing Analysis');
      if (!success) {
        toast({
          title: "Payment Failed",
          description: "Could not deduct credits for AI pricing",
          variant: "destructive"
        });
        return;
      }

      // Mock AI pricing
      const basePricePerSqft = listingData.city.toLowerCase().includes('mumbai') ? 15000 : 8000;
      const area = parseInt(listingData.area_sqft) || 1000;
      const suggestedPrice = basePricePerSqft * area;
      
      handleInputChange('price', suggestedPrice.toString());
      
      toast({
        title: "AI Pricing Complete",
        description: `Suggested price: ₹${suggestedPrice.toLocaleString()} based on market analysis`,
      });
    } catch (error) {
      console.error('Pricing generation failed:', error);
      toast({
        title: "Pricing Failed",
        description: "Could not generate AI pricing",
        variant: "destructive"
      });
    } finally {
      setEnhancing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Property Listing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Property Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="property_type">Property Type</Label>
              <Select
                value={listingData.property_type}
                onValueChange={(value) => handleInputChange('property_type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
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
                value={listingData.listing_type}
                onValueChange={(value) => handleInputChange('listing_type', value)}
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
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={listingData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Enter city"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="locality">Locality</Label>
              <Input
                id="locality"
                value={listingData.locality}
                onChange={(e) => handleInputChange('locality', e.target.value)}
                placeholder="Enter locality"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select
                value={listingData.bedrooms}
                onValueChange={(value) => handleInputChange('bedrooms', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 BHK</SelectItem>
                  <SelectItem value="2">2 BHK</SelectItem>
                  <SelectItem value="3">3 BHK</SelectItem>
                  <SelectItem value="4">4+ BHK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select
                value={listingData.bathrooms}
                onValueChange={(value) => handleInputChange('bathrooms', value)}
              >
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

            <div className="space-y-2">
              <Label htmlFor="area_sqft">Area (sq ft)</Label>
              <Input
                id="area_sqft"
                type="number"
                value={listingData.area_sqft}
                onChange={(e) => handleInputChange('area_sqft', e.target.value)}
                placeholder="Enter area in sq ft"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="price">Price (₹)</Label>
                <Button
                  onClick={generatePricing}
                  disabled={enhancing}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <DollarSign className="h-4 w-4" />
                  AI Price (25 Credits)
                </Button>
              </div>
              <Input
                id="price"
                type="number"
                value={listingData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Enter price"
              />
            </div>
          </div>

          {/* Title with AI Enhancement */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="title">Property Title</Label>
              <Button
                onClick={enhanceTitle}
                disabled={enhancing}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Enhance Title (5 Credits)
              </Button>
            </div>
            <Input
              id="title"
              value={listingData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter property title"
            />
          </div>

          {/* Description with AI Enhancement */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Property Description</Label>
              <Button
                onClick={enhanceDescription}
                disabled={enhancing}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Wand2 className="h-4 w-4" />
                Enhance Description (15 Credits)
              </Button>
            </div>
            <Textarea
              id="description"
              value={listingData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your property..."
              rows={6}
            />
          </div>

          {/* AI Tools Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">AI-Powered Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AiToolGate
                toolName="video_generator"
                toolTitle="AI Video Generator"
              >
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Generate Video (100 Credits)
                </Button>
              </AiToolGate>

              <AiToolGate
                toolName="brochure_parser"
                toolTitle="Brochure Parser"
              >
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Parse Brochure (50 Credits)
                </Button>
              </AiToolGate>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white"
            disabled={!listingData.title || !listingData.description || !listingData.price}
          >
            Create Listing
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
