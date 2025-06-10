
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, TrendingUp } from 'lucide-react';
import { AiToolGate } from '@/components/common/AiToolGate';
import { useAiPricingSuggestion } from '@/hooks/useAiPricingSuggestion';

interface PricingStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
}

export const PricingStep: React.FC<PricingStepProps> = ({ data, onDataChange, onNext }) => {
  const [showAiPricing, setShowAiPricing] = useState(false);
  const { suggesting, suggestion, getPricingSuggestion } = useAiPricingSuggestion();

  const handleChange = (field: string, value: any) => {
    onDataChange({ [field]: value });
  };

  const handleAiPricing = async () => {
    try {
      await getPricingSuggestion(data);
    } catch (error) {
      console.error('AI pricing failed:', error);
    }
  };

  const canProceed = data.price > 0;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Property Pricing</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price *</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
              <Input
                id="price"
                type="number"
                value={data.price || ''}
                onChange={(e) => handleChange('price', Number(e.target.value))}
                className="pl-8"
                placeholder="Enter price"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price_negotiable">Price Options</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="price_negotiable"
                checked={data.price_negotiable || false}
                onCheckedChange={(checked) => handleChange('price_negotiable', checked)}
              />
              <label htmlFor="price_negotiable" className="text-sm">
                Price Negotiable
              </label>
            </div>
          </div>

          {data.property_type === 'residential' && (
            <div className="space-y-2">
              <Label htmlFor="maintenance">Maintenance (Monthly)</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                <Input
                  id="maintenance"
                  type="number"
                  value={data.maintenance || ''}
                  onChange={(e) => handleChange('maintenance', Number(e.target.value))}
                  className="pl-8"
                  placeholder="Monthly maintenance"
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <AiToolGate
            toolName="smart_pricing"
            toolTitle="AI Smart Pricing"
          >
            <Card className="border-2 border-dashed border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <Sparkles className="h-5 w-5" />
                  AI Smart Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Get AI-powered pricing suggestions based on market analysis, location, and property features.
                </p>
                <Button
                  onClick={handleAiPricing}
                  disabled={suggesting}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600"
                >
                  {suggesting ? 'Analyzing...' : 'Get AI Pricing (30 Credits)'}
                </Button>
              </CardContent>
            </Card>
          </AiToolGate>

          {suggestion && (
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <TrendingUp className="h-5 w-5" />
                  AI Pricing Suggestion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Suggested Price:</span>
                    <span className="font-medium">₹{suggestion.suggested_price?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Confidence:</span>
                    <span className="font-medium">{(suggestion.confidence_score * 100).toFixed(0)}%</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleChange('price', suggestion.suggested_price)}
                    className="w-full mt-2"
                  >
                    Apply Suggested Price
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Pricing Tips:</h4>
        <ul className="text-sm text-blue-600 space-y-1">
          <li>• Research similar properties in your area</li>
          <li>• Consider property condition and amenities</li>
          <li>• Use our AI pricing tool for market analysis</li>
          <li>• Be realistic to attract genuine buyers</li>
        </ul>
      </div>

      <Button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full bg-gradient-to-r from-orange-500 to-red-600"
      >
        Continue to Photos
      </Button>
    </div>
  );
};
