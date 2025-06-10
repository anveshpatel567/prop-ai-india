
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, IndianRupee, Calendar, Sparkles } from 'lucide-react';
import { AiToolGate } from '@/components/common/AiToolGate';
import { QualityEnhancerModal } from '@/components/listing/QualityEnhancerModal';
import { useState } from 'react';

interface ReviewStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ data, onDataChange, onNext }) => {
  const [showQualityModal, setShowQualityModal] = useState(false);

  const handleQualitySuggestions = (suggestions: any[]) => {
    // Apply quality suggestions to listing data
    suggestions.forEach(suggestion => {
      if (suggestion.field === 'title') {
        onDataChange({ title: suggestion.suggested_value });
      } else if (suggestion.field === 'description') {
        onDataChange({ description: suggestion.suggested_value });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Review Your Listing</h3>
        <AiToolGate
          toolName="quality_enhancer"
          toolTitle="AI Quality Enhancer"
        >
          <Button
            variant="outline"
            onClick={() => setShowQualityModal(true)}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            AI Quality Check
          </Button>
        </AiToolGate>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">{data.title}</h4>
                <Badge variant="outline">
                  {data.property_type} • {data.listing_type}
                </Badge>
              </div>
              
              <div className="text-sm text-gray-600">
                {data.description}
              </div>
              
              {data.area_sqft && (
                <div className="flex justify-between">
                  <span>Area:</span>
                  <span>{data.area_sqft} sq ft</span>
                </div>
              )}
              
              {data.bedrooms && (
                <div className="flex justify-between">
                  <span>Bedrooms:</span>
                  <span>{data.bedrooms}</span>
                </div>
              )}
              
              {data.bathrooms && (
                <div className="flex justify-between">
                  <span>Bathrooms:</span>
                  <span>{data.bathrooms}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>{data.locality}, {data.city}</div>
                {data.address && (
                  <div className="text-sm text-gray-600">{data.address}</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">
                  ₹{data.price?.toLocaleString()}
                </div>
                {data.price_negotiable && (
                  <Badge variant="secondary">Negotiable</Badge>
                )}
                {data.maintenance && (
                  <div className="text-sm">
                    Maintenance: ₹{data.maintenance}/month
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {data.photos && data.photos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Photos ({data.photos.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {data.photos.slice(0, 6).map((photo: File, index: number) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(photo)}
                      alt={`Property ${index + 1}`}
                      className="w-full h-16 object-cover rounded"
                    />
                  ))}
                </div>
                {data.photos.length > 6 && (
                  <p className="text-sm text-gray-500 mt-2">
                    +{data.photos.length - 6} more photos
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-800 mb-2">Ready to Publish!</h4>
        <p className="text-sm text-green-600">
          Your listing looks great! Once published, it will be visible to potential buyers and you'll start receiving inquiries.
        </p>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => setShowQualityModal(true)}
          className="flex-1"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Final Quality Check
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Publish Listing
        </Button>
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
