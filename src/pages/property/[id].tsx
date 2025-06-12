
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/layout/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BuyCreditsCta } from '@/components/common/BuyCreditsCta';
import { useWallet } from '@/context/WalletContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PropertyData {
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
}

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: 'admin' | 'agent' | 'seeker';
}

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { balance } = useWallet();
  const { toast } = useToast();
  
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [agent, setAgent] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [contacting, setContacting] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    fetchPropertyData();
  }, [id, navigate]);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      
      // Fetch property data
      const { data: propertyData, error: propertyError } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .eq('status', 'active')
        .single();

      if (propertyError) {
        console.error('Property fetch error:', propertyError);
        toast({
          title: "Property Not Found",
          description: "The property you're looking for doesn't exist or is no longer available.",
          variant: "destructive"
        });
        navigate('/');
        return;
      }

      setProperty(propertyData);

      // Fetch agent data
      const { data: agentData, error: agentError } = await supabase
        .from('users')
        .select('id, full_name, email, phone, role')
        .eq('id', propertyData.user_id)
        .single();

      if (agentError) {
        console.error('Agent fetch error:', agentError);
      } else {
        setAgent(agentData);
      }

    } catch (error) {
      console.error('Error fetching property:', error);
      toast({
        title: "Error",
        description: "Failed to load property details.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContactAgent = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to contact the agent.",
        variant: "destructive"
      });
      return;
    }

    const currentCredits = balance?.balance || 0;
    if (currentCredits < 10) {
      toast({
        title: "Insufficient Credits",
        description: "You need 10 credits to contact the agent.",
        variant: "destructive"
      });
      return;
    }

    setContacting(true);
    try {
      // Deduct credits for contacting agent
      // This would normally integrate with your credit system
      toast({
        title: "Contact Request Sent",
        description: "The agent has been notified of your interest.",
      });
    } catch (error) {
      console.error('Contact error:', error);
      toast({
        title: "Error",
        description: "Failed to send contact request.",
        variant: "destructive"
      });
    } finally {
      setContacting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading property details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <GlassCard>
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
              <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or is no longer available.</p>
              <Button onClick={() => navigate('/')} className="bg-gradient-to-r from-orange-500 to-red-600">
                Back to Home
              </Button>
            </div>
          </GlassCard>
        </div>
        <Footer />
      </div>
    );
  }

  const currentCredits = balance?.balance || 0;
  const hasInsufficientCredits = currentCredits < 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Images */}
            <GlassCard>
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
            </GlassCard>

            {/* Property Details */}
            <GlassCard>
              <div className="p-6">
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
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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

                  {hasInsufficientCredits ? (
                    <BuyCreditsCta 
                      creditsNeeded={10}
                      toolName="Contact Agent"
                      className="w-full"
                    />
                  ) : (
                    <Button 
                      onClick={handleContactAgent}
                      disabled={contacting}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600"
                    >
                      {contacting ? 'Contacting...' : 'Contact Agent (10 Credits)'}
                    </Button>
                  )}
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

      <Footer />
    </div>
  );
};

export default PropertyDetail;
