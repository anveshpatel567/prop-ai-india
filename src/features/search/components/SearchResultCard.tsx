
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

export function SearchResultCard({ 
  result,
  onClick 
}: { 
  result: {
    id: string;
    title: string;
    location: string;
    price: number;
    imageUrl: string;
    propertyType: string;
    listingType: string;
    bedrooms: number;
    bathrooms: number;
    areaSqft: number;
  };
  onClick: (id: string) => void;
}) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(result.id)}
    >
      <div className="h-48 bg-gradient-to-r from-orange-100 to-red-100 flex items-center justify-center">
        {result.imageUrl ? (
          <img 
            src={result.imageUrl} 
            alt={result.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center text-gray-600">
            <div className="text-4xl mb-2">🏠</div>
            <p className="text-sm">Property Image</p>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 flex-1">
            {result.title}
          </h3>
          <Badge variant="secondary" className="ml-2">
            {result.listingType}
          </Badge>
        </div>
        
        <p className="text-orange-600 font-bold text-xl mb-3">
          ₹{result.price.toLocaleString()}
        </p>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{result.location}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {result.bedrooms > 0 && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{result.bedrooms} BHK</span>
            </div>
          )}
          {result.bathrooms > 0 && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{result.bathrooms}</span>
            </div>
          )}
          {result.areaSqft > 0 && (
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{result.areaSqft} sq ft</span>
            </div>
          )}
        </div>
        
        <Badge variant="outline" className="mt-2">
          {result.propertyType}
        </Badge>
      </CardContent>
    </Card>
  );
}
