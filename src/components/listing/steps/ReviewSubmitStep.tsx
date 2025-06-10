
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, IndianRupee, Bed, Bath, Square } from 'lucide-react';

interface ReviewSubmitStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const ReviewSubmitStep: React.FC<ReviewSubmitStepProps> = ({ data, onSubmit, isSubmitting }) => {
  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Review Your Listing</h3>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{data.title}</span>
            <Badge variant="secondary">
              {data.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span className="capitalize">{data.property_type}</span>
            </div>
            <div className="flex items-center gap-1">
              <IndianRupee className="h-4 w-4" />
              <span>{formatPrice(data.price)}</span>
            </div>
            {data.area_sqft && (
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{data.area_sqft} sq ft</span>
              </div>
            )}
            {data.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{data.bedrooms} BHK</span>
              </div>
            )}
            {data.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{data.bathrooms} Bath</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{data.locality ? `${data.locality}, ` : ''}{data.city}</span>
          </div>

          {data.description && (
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-gray-600 line-clamp-3">{data.description}</p>
            </div>
          )}

          {data.amenities && data.amenities.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Amenities ({data.amenities.length})</h4>
              <div className="flex flex-wrap gap-2">
                {data.amenities.slice(0, 5).map((amenity: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {data.amenities.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{data.amenities.length - 5} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {data.brochure_data && (
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-700">
                ✅ Enhanced with AI-parsed brochure data
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">Before You Submit:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Double-check all property details are accurate</li>
          <li>• Ensure contact information is correct</li>
          <li>• Verify the Google Maps location is precise</li>
          <li>• Review pricing for market competitiveness</li>
        </ul>
      </div>
    </div>
  );
};
