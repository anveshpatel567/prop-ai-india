
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Share2, Download, MessageSquare, FileText } from 'lucide-react';

interface PropertyDetailViewProps {
  property: {
    id: string;
    title: string;
    description: string | null;
    property_type: 'residential' | 'commercial' | 'plot';
    listing_type: 'sale' | 'rent';
    price: number;
    area_sqft: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    city: string;
    locality: string | null;
    amenities: string[] | null;
    photos: string[] | null;
    status: 'active' | 'sold' | 'rented' | 'draft';
    created_at: string;
    user_id: string;
  };
  agent: {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    role: 'admin' | 'agent' | 'seeker';
  } | null;
  onContactAgent: () => void;
  onNegotiate: () => void;
  onDownloadFlyer: () => void;
  onShare: () => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  agent,
  onContactAgent,
  onNegotiate,
  onDownloadFlyer,
  onShare
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Images */}
          <Card className="overflow-hidden">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {property.photos && property.photos.length > 0 ? (
                <img 
                  src={property.photos[0]} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏠</div>
                    <p>No image available</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Property Details */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="capitalize">
                      {property.property_type}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      For {property.listing_type}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-orange-600">
                    ₹{property.price.toLocaleString()}
                  </p>
                  {property.listing_type === 'rent' && (
                    <p className="text-sm text-gray-600">per month</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {property.area_sqft && (
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-800">{property.area_sqft}</p>
                    <p className="text-sm text-gray-600">Sq Ft</p>
                  </div>
                )}
                {property.bedrooms && (
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-800">{property.bedrooms}</p>
                    <p className="text-sm text-gray-600">Bedrooms</p>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-800">{property.bathrooms}</p>
                    <p className="text-sm text-gray-600">Bathrooms</p>
                  </div>
                )}
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">{property.city}</p>
                  <p className="text-sm text-gray-600">City</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {property.description || 'No description available for this property.'}
                </p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={onNegotiate}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Negotiate via AI
              </Button>
              
              <Button 
                onClick={onDownloadFlyer}
                variant="outline"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Flyer
              </Button>
              
              <Button 
                onClick={onShare}
                variant="outline"
                className="w-full"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Property
              </Button>
            </CardContent>
          </Card>

          {/* Agent Info */}
          {agent && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-800">{agent.full_name}</p>
                  <p className="text-sm text-gray-600 capitalize">{agent.role}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Email: {agent.email}</p>
                  {agent.phone && (
                    <p className="text-sm text-gray-600">Phone: {agent.phone}</p>
                  )}
                </div>

                <Button 
                  onClick={onContactAgent}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Request Brochure
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Location Info */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold text-gray-800">{property.city}</p>
                {property.locality && (
                  <p className="text-gray-600">{property.locality}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Property Info */}
          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium capitalize">{property.property_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Listed:</span>
                <span className="font-medium">
                  {new Date(property.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <Badge variant="outline" className="capitalize">
                  {property.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
