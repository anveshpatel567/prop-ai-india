
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, MapPin, IndianRupee, Eye, Heart, Share } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

export default function CardsTestPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const sampleProperties = [
    {
      id: '1',
      title: '3BHK Luxury Apartment in Banjara Hills',
      location: 'Banjara Hills, Hyderabad',
      price: 85000000,
      type: 'Apartment',
      area: '2100 sq ft',
      bedrooms: 3,
      bathrooms: 3,
      image: '/placeholder.svg',
      featured: true
    },
    {
      id: '2',
      title: 'Independent Villa with Garden',
      location: 'Jubilee Hills, Hyderabad',
      price: 125000000,
      type: 'Villa',
      area: '3500 sq ft',
      bedrooms: 4,
      bathrooms: 4,
      image: '/placeholder.svg',
      featured: false
    },
    {
      id: '3',
      title: '2BHK Modern Flat Near Metro',
      location: 'Gachibowli, Hyderabad',
      price: 65000000,
      type: 'Apartment',
      area: '1400 sq ft',
      bedrooms: 2,
      bathrooms: 2,
      image: '/placeholder.svg',
      featured: true
    }
  ];

  const toggleExpansion = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Property Cards Visual Test
            </h1>
            <p className="text-gray-600">
              Testing property card expansion, AI buttons, and mobile responsiveness
            </p>
          </div>

          {/* Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProperties.map((property) => {
              const isExpanded = expandedCard === property.id;
              
              return (
                <Card 
                  key={property.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-orange-200/30 ${
                    isExpanded ? 'scale-105 z-20 shadow-xl' : ''
                  } ${property.featured ? 'border-orange-200' : ''}`}
                  onClick={() => toggleExpansion(property.id)}
                >
                  <div className="relative">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {property.featured && (
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <Share className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-2">{property.title}</h3>
                        <div className="flex items-center text-gray-600 text-sm mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-green-600 font-bold text-xl">
                          <IndianRupee className="h-5 w-5" />
                          {(property.price / 10000000).toFixed(1)}Cr
                        </div>
                        <Badge variant="secondary">{property.type}</Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-1" />
                          {property.bedrooms}BR
                        </div>
                        <div>{property.bathrooms}BA</div>
                        <div>{property.area}</div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="space-y-3 pt-3 border-t">
                          <div className="text-sm text-gray-600">
                            <p>Premium property with modern amenities, excellent connectivity, and prime location. Perfect for families looking for luxury living.</p>
                          </div>
                          
                          {/* AI Action Buttons */}
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-700">AI Tools:</div>
                            <div className="grid grid-cols-2 gap-2">
                              <Button 
                                size="sm" 
                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs"
                              >
                                AI Pricing (25₹)
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-orange-300 text-orange-600 text-xs"
                              >
                                Generate Video (15₹)
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-purple-300 text-purple-600 text-xs"
                              >
                                SEO Schema (10₹)
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-blue-300 text-blue-600 text-xs"
                              >
                                Fraud Check (10₹)
                              </Button>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Mobile Responsiveness Test Info */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-600">Mobile Test Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>✅ <strong>Tap Test:</strong> Cards should expand smoothly on tap</p>
                <p>✅ <strong>Outside Click:</strong> Cards should collapse when tapping outside</p>
                <p>✅ <strong>Button Test:</strong> All AI tool buttons should be tappable</p>
                <p>✅ <strong>Overflow Test:</strong> Expanded cards should not break layout</p>
                <p>✅ <strong>Z-Index Test:</strong> Expanded cards should appear above others</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
