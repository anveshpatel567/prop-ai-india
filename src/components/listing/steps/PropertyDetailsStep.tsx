
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2 } from 'lucide-react';
import { useAiSmartListing } from '@/hooks/useAiSmartListing';
import { QualityEnhancerModal } from '@/components/listing/QualityEnhancerModal';

interface PropertyDetailsStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
}

export const PropertyDetailsStep: React.FC<PropertyDetailsStepProps> = ({ data, onDataChange, onNext }) => {
  const [showAiTitle, setShowAiTitle] = useState(false);
  const [showQualityModal, setShowQualityModal] = useState(false);
  const { enhancing, enhanceDescription } = useAiSmartListing();

  const handleChange = (field: string, value: string) => {
    onDataChange({ [field]: value });
  };

  const enhanceWithAi = async () => {
    try {
      await enhanceDescription({
        current_description: data.description || '',
        property_details: {
          title: data.title,
          location: `${data.locality || ''}, ${data.city}`,
          property_type: data.property_type,
          price: data.price
        }
      });
    } catch (error) {
      console.error('AI enhancement failed:', error);
    }
  };

  const handleQualitySuggestions = (suggestions: any[]) => {
    // Apply selected suggestions to the listing data
    suggestions.forEach(suggestion => {
      if (suggestion.field === 'title') {
        handleChange('title', suggestion.suggested_value);
      } else if (suggestion.field === 'description') {
        handleChange('description', suggestion.suggested_value);
      }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Property Details & Description</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="title">Property Title</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAiTitle(!showAiTitle)}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              ✨ AI Enhance
            </Button>
          </div>
          <Textarea
            id="title"
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter a compelling property title"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description">Property Description</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={enhanceWithAi}
                disabled={enhancing}
                className="flex items-center gap-2"
              >
                <Wand2 className="h-4 w-4" />
                {enhancing ? 'Enhancing...' : '✨ AI Enhance'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQualityModal(true)}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Quality Check
              </Button>
            </div>
          </div>
          <Textarea
            id="description"
            value={data.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Describe your property in detail. Mention unique features, nearby amenities, and what makes it special..."
            rows={6}
          />
          <p className="text-xs text-gray-500">
            Tip: Include details about the neighborhood, transportation, schools, and shopping areas nearby
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">AI Tools Available:</h4>
          <ul className="text-sm text-blue-600 space-y-1">
            <li>• Smart title generation based on property features</li>
            <li>• Description enhancement for better appeal</li>
            <li>• Quality suggestions to improve listing performance</li>
            <li>• SEO optimization for better search visibility</li>
          </ul>
        </div>
      </div>

      <QualityEnhancerModal
        isOpen={showQualityModal}
        onClose={() => setShowQualityModal(false)}
        listingData={data}
        onApplySuggestions={handleQualitySuggestions}
      />
    </div>
  );
};
