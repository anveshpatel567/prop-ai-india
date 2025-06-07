
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAiPricingSuggestions } from '@/hooks/useAiPricingSuggestions';
import { useToast } from '@/components/ui/use-toast';
import { DollarSign, TrendingUp, Brain } from 'lucide-react';

export const AiPricingSuggestionCard: React.FC = () => {
  const { generatePricingSuggestion, loading } = useAiPricingSuggestions();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    property_type: '',
    area_sqft: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    amenities: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await generatePricingSuggestion('temp-listing-id', formData);
      toast({
        title: "Pricing Analysis Complete",
        description: `Suggested price: ₹${result.suggested_price?.toLocaleString()}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate pricing suggestion",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-2">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-orange-600">AI Smart Pricing</CardTitle>
        <CardDescription>Get AI-powered pricing suggestions for your property</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="property_type">Property Type</Label>
            <Input
              id="property_type"
              value={formData.property_type}
              onChange={(e) => setFormData({...formData, property_type: e.target.value})}
              placeholder="e.g., 2BHK Apartment"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="area_sqft">Area (sq ft)</Label>
              <Input
                id="area_sqft"
                type="number"
                value={formData.area_sqft}
                onChange={(e) => setFormData({...formData, area_sqft: e.target.value})}
                placeholder="1200"
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Mumbai"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                placeholder="2"
              />
            </div>
            <div>
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                placeholder="2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="amenities">Key Amenities</Label>
            <Textarea
              id="amenities"
              value={formData.amenities}
              onChange={(e) => setFormData({...formData, amenities: e.target.value})}
              placeholder="Gym, Pool, Security, Parking..."
              rows={2}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : (
              <>
                <DollarSign className="mr-2 h-4 w-4" />
                Get AI Pricing (25 credits)
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-orange-100 rounded-lg">
          <div className="flex items-center text-sm text-orange-700">
            <TrendingUp className="mr-2 h-4 w-4" />
            AI analyzes market trends, comparable properties, and location factors
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
