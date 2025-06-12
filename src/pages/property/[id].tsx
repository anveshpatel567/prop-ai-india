
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PropertyDetailView } from '@/components/property/PropertyDetailView';
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

    toast({
      title: "Brochure Request Sent",
      description: "The agent has been notified of your request.",
    });
  };

  const handleNegotiate = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to start negotiations.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "AI Negotiation",
      description: "This feature will be available soon!",
    });
  };

  const handleDownloadFlyer = () => {
    toast({
      title: "PDF Generation",
      description: "Property flyer download will be available soon!",
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: property?.title || 'Property Listing',
      text: `Check out this property: ${property?.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Property link has been copied to clipboard.",
      });
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
          <div className="bg-white/80 backdrop-blur-sm border border-orange-500 rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or is no longer available.</p>
            <button 
              onClick={() => navigate('/')} 
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <PropertyDetailView
        property={property}
        agent={agent}
        onContactAgent={handleContactAgent}
        onNegotiate={handleNegotiate}
        onDownloadFlyer={handleDownloadFlyer}
        onShare={handleShare}
      />
      <Footer />
    </div>
  );
};

export default PropertyDetail;
