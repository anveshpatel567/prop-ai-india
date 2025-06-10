
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Home, Bed, Bath, Square, Heart, Share2, Phone } from 'lucide-react';
import { PropertyListing } from '@/types';

interface ListingCardProps {
  listing: PropertyListing;
  showMatchScore?: boolean;
  matchScore?: number;
  matchReasons?: string[];
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  showMatchScore = false,
  matchScore = 0,
  matchReasons = []
}) => {
  const handleContact = () => {
    console.log('Contact for listing:', listing.id);
    // Implement contact functionality
  };

  const handleSave = () => {
    console.log('Save listing:', listing.id);
    // Implement save functionality
  };

  const handleShare = () => {
    console.log('Share listing:', listing.id);
    // Implement share functionality
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src="/placeholder.svg"
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
            onClick={handleSave}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        {showMatchScore && matchScore > 0 && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-green-500 text-white">
              {matchScore}% Match
            </Badge>
          </div>
        )}
        
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary">
            {listing.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {listing.locality}, {listing.city}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">
              ₹{listing.price.toLocaleString()}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {listing.area_sqft && (
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              {listing.area_sqft} sq ft
            </div>
          )}
          {listing.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              {listing.bedrooms} BHK
            </div>
          )}
          {listing.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {listing.bathrooms} Bath
            </div>
          )}
        </div>

        {listing.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
        )}

        {showMatchScore && matchReasons.length > 0 && (
          <div className="bg-green-50 p-2 rounded">
            <p className="text-xs font-medium text-green-800 mb-1">Why this matches:</p>
            <ul className="text-xs text-green-600 space-y-1">
              {matchReasons.slice(0, 2).map((reason, index) => (
                <li key={index}>• {reason}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1">
            View Details
          </Button>
          <Button
            onClick={handleContact}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-600"
          >
            <Phone className="h-4 w-4 mr-2" />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
