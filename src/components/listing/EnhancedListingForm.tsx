
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Wand2, FileText, Video, DollarSign, Upload, Camera, CheckCircle } from 'lucide-react';
import { AiToolGate } from '@/components/common/AiToolGate';
import { useWallet } from '@/context/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { useParsedBrochure } from '@/hooks/useParsedBrochure';

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
  photos: File[];
  amenities: string[];
}

interface EnhancedListingFormProps {
  onReraToggle?: (show: boolean) => void;
}

export const EnhancedListingForm: React.FC<EnhancedListingFormProps> = ({ onReraToggle }) => {
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
    area_sqft: '',
    photos: [],
    amenities: []
  });

  const { balance, deductCredits } = useWallet();
  const { toast } = useToast();
  const [enhancing, setEnhancing] = useState(false);
  const [brochureFile, setBrochureFile] = useState<File | null>(null);
  const { parsing, parsedData, parseBrochure } = useParsedBrochure();

  const handleInputChange = (field: string, value: string | File[] | string[]) => {
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

  const handleBrochureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBrochureFile(file);
    }
  };

  const parseBrochureWithAI = async () => {
    if (!brochureFile) return;

    const currentCredits = balance?.balance || 0;
    if (currentCredits < 50) {
      toast({
        title: "Insufficient Credits",
        description: "You need 50 credits to parse brochure with AI",
        variant: "destructive"
      });
      return;
    }

    try {
      const success = await deductCredits(50, 'AI Brochure Parser');
      if (!success) {
        toast({
          title: "Payment Failed",
          description: "Could not deduct credits for brochure parsing",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        try {
          await parseBrochure(text);
          if (parsedData) {
            // Auto-fill form with parsed data
            setListingData(prev => ({
              ...prev,
              title: parsedData.title || prev.title,
              description: parsedData.description || prev.description,
              property_type: parsedData.property_type || prev.property_type,
              price: parsedData.price?.toString() || prev.price,
              city: parsedData.city || prev.city,
              locality: parsedData.locality || prev.locality,
              bedrooms: parsedData.bedrooms?.toString() || prev.bedrooms,
              bathrooms: parsedData.bathrooms?.toString() || prev.bathrooms,
              area_sqft: parsedData.area_sqft?.toString() || prev.area_sqft,
              amenities: parsedData.amenities || prev.amenities
            }));
            
            toast({
              title: "Brochure Parsed Successfully",
              description: "AI has extracted property details and filled the form",
            });
          }
        } catch (error) {
          console.error('Brochure parsing failed:', error);
          toast({
            title: "Parsing Failed",
            description: "Could not parse brochure with AI",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(brochureFile);
    } catch (error) {
      console.error('Brochure parsing failed:', error);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPhotos = [...listingData.photos, ...files].slice(0, 20);
    handleInputChange('photos', newPhotos);
  };

  const generateVideo = async () => {
    const currentCredits = balance?.balance || 0;
    if (currentCredits < 100) {
      toast({
        title: "Insufficient Credits",
        description: "You need 100 credits to generate AI video",
        variant: "destructive"
      });
      return;
    }

    if (listingData.photos.length === 0) {
      toast({
        title: "Photos Required",
        description: "Please upload photos first to generate video",
        variant: "destructive"
      });
      return;
    }

    try {
      const success = await deductCredits(100, 'AI Video Generation');
      if (!success) {
        toast({
          title: "Payment Failed",
          description: "Could not deduct credits for video generation",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Video Generation Started",
        description: "AI is creating your property video. You'll be notified when ready.",
      });
    } catch (error) {
      console.error('Video generation failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Brochure Parser Section */}
      <Card className="border-2 border-dashed border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <FileText className="h-5 w-5" />
            AI Brochure Parser (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Upload a property brochure and let AI extract all the details automatically.
          </p>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleBrochureUpload}
              className="hidden"
              id="brochure-upload"
            />
            <label htmlFor="brochure-upload" className="cursor-pointer">
              <Button variant="outline" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Brochure
                </span>
              </Button>
            </label>
            {brochureFile && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-600">{brochureFile.name}</span>
                <Button
                  onClick={parseBrochureWithAI}
                  disabled={parsing}
                  size="sm"
                  className="bg-blue-600"
                >
                  {parsing ? 'Parsing...' : 'Parse with AI (50 Credits)'}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
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

          {/* Photo Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Property Photos</Label>
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span>
                      <Camera className="h-4 w-4 mr-2" />
                      Upload Photos
                    </span>
                  </Button>
                </label>
                <AiToolGate toolName="video_generator" toolTitle="AI Video Generator">
                  <Button
                    onClick={generateVideo}
                    disabled={listingData.photos.length === 0}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-purple-600"
                  >
                    <Video className="h-4 w-4" />
                    Generate Video (100 Credits)
                  </Button>
                </AiToolGate>
              </div>
            </div>
            
            {listingData.photos.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {listingData.photos.slice(0, 8).map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Property ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                    {index === 0 && (
                      <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                        Cover
                      </div>
                    )}
                  </div>
                ))}
                {listingData.photos.length > 8 && (
                  <div className="flex items-center justify-center bg-gray-100 rounded h-20">
                    <span className="text-sm text-gray-500">+{listingData.photos.length - 8} more</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* AI Tools Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">AI-Powered Enhancement Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AiToolGate toolName="brochure_parser" toolTitle="Brochure Parser">
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Smart Form Fill</span>
                  </div>
                  <p className="text-sm text-blue-600">
                    Upload brochures and let AI fill your form automatically
                  </p>
                </Card>
              </AiToolGate>

              <AiToolGate toolName="quality_enhancer" toolTitle="Quality Enhancer">
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Quality Check</span>
                  </div>
                  <p className="text-sm text-green-600">
                    Get AI suggestions to improve your listing performance
                  </p>
                </Card>
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
