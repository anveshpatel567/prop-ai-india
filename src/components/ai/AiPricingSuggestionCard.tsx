
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAiPricingSuggestion } from '@/hooks/useAiPricingSuggestion';
import { TrendingUp, Calculator, MapPin } from 'lucide-react';

export const AiPricingSuggestionCard: React.FC = () => {
  const { suggesting, suggestion, getPricingSuggestion } = useAiPricingSuggestion();
  const [propertyData, setPropertyData] = useState({
    location: '',
    property_type: 'residential',
    area_sqft: '',
    bedrooms: '',
    amenities: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await getPricingSuggestion(propertyData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5" />
          AI Smart Pricing
          <Badge className="ml-2">250 Credits</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Input
              value={propertyData.location}
              onChange={(e) => setPropertyData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., Bandra West, Mumbai"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Property Type</label>
            <select
              value={propertyData.property_type}
              onChange={(e) => setPropertyData(prev => ({ ...prev, property_type: e.target.value }))}
              className="w-full p-2 border rounded"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="plot">Plot</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Area (sq ft)</label>
            <Input
              type="number"
              value={propertyData.area_sqft}
              onChange={(e) => setPropertyData(prev => ({ ...prev, area_sqft: e.target.value }))}
              placeholder="1200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bedrooms</label>
            <Input
              type="number"
              value={propertyData.bedrooms}
              onChange={(e) => setPropertyData(prev => ({ ...prev, bedrooms: e.target.value }))}
              placeholder="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Key Amenities</label>
            <Textarea
              value={propertyData.amenities}
              onChange={(e) => setPropertyData(prev => ({ ...prev, amenities: e.target.value }))}
              placeholder="Parking, Gym, Swimming Pool"
              rows={2}
            />
          </div>

          <Button type="submit" className="w-full" disabled={suggesting}>
            {suggesting ? 'Analyzing...' : 'Get AI Pricing Suggestion'}
          </Button>
        </form>

        {suggestion && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">AI Pricing Analysis</h3>
            <div className="space-y-2">
              <p><strong>Suggested Price:</strong> ₹{suggestion.suggested_price?.toLocaleString()}</p>
              <p><strong>Confidence:</strong> {Math.round(suggestion.confidence_score * 100)}%</p>
              {suggestion.market_analysis && (
                <p><strong>Market Analysis:</strong> {suggestion.market_analysis}</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
