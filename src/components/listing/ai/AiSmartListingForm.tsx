
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Zap, Check, X } from 'lucide-react';
import { useAiSmartListing } from '@/hooks/useAiSmartListing';
import { useCreditStatus } from '@/hooks/useCreditStatus';
import { AiDescriptionRequest } from '@/types/listing/ai';

export const AiSmartListingForm: React.FC = () => {
  const { enhancing, draft, enhanceDescription, acceptEnhancement, resetDraft } = useAiSmartListing();
  const { canAfford } = useCreditStatus();
  const [basicDetails, setBasicDetails] = useState({
    title: '',
    location: '',
    property_type: 'residential',
    price: 0,
    description: ''
  });

  const handleEnhanceDescription = async () => {
    if (!basicDetails.title || !basicDetails.location || !basicDetails.description) {
      return;
    }

    const request: AiDescriptionRequest = {
      current_description: basicDetails.description,
      property_details: {
        title: basicDetails.title,
        location: basicDetails.location,
        property_type: basicDetails.property_type,
        price: basicDetails.price
      }
    };

    try {
      await enhanceDescription(request);
    } catch (error) {
      console.error('Enhancement failed:', error);
    }
  };

  const canEnhance = canAfford(100) && basicDetails.title && basicDetails.location && basicDetails.description;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Smart Listing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Property Title</Label>
              <Input
                value={basicDetails.title}
                onChange={(e) => setBasicDetails(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Luxury 3BHK Apartment"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={basicDetails.location}
                onChange={(e) => setBasicDetails(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Bandra West, Mumbai"
              />
            </div>
            <div className="space-y-2">
              <Label>Property Type</Label>
              <Input
                value={basicDetails.property_type}
                onChange={(e) => setBasicDetails(prev => ({ ...prev, property_type: e.target.value }))}
                placeholder="Residential, Commercial, etc."
              />
            </div>
            <div className="space-y-2">
              <Label>Price (₹)</Label>
              <Input
                type="number"
                value={basicDetails.price || ''}
                onChange={(e) => setBasicDetails(prev => ({ ...prev, price: Number(e.target.value) }))}
                placeholder="0"
              />
            </div>
          </div>

          {/* Description with AI Enhancement */}
          <div className="space-y-4">
            <Label>Property Description</Label>
            <Textarea
              value={basicDetails.description}
              onChange={(e) => setBasicDetails(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your property..."
              rows={4}
            />

            {/* AI Enhancement Section */}
            <div className="border rounded-lg p-4 bg-blue-50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  AI Description Enhancer
                </h4>
                <span className="text-sm text-gray-600">100 credits</span>
              </div>

              <Button
                onClick={handleEnhanceDescription}
                disabled={!canEnhance || enhancing}
                className="mb-3"
              >
                {enhancing ? 'Enhancing...' : 'Enhance My Description'}
              </Button>

              {draft?.enhanced_description && (
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border">
                    <h5 className="font-medium mb-2">AI Enhanced Version:</h5>
                    <p className="text-sm text-gray-700">{draft.enhanced_description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={acceptEnhancement}
                      className="flex items-center gap-1"
                    >
                      <Check className="h-4 w-4" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={resetDraft}
                      className="flex items-center gap-1"
                    >
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
