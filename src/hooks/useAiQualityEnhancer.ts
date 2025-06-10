
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useWallet } from '@/context/WalletContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useAiQualityEnhancer = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { user } = useAuth();
  const { deductCredits } = useWallet();
  const { toast } = useToast();

  const analyzeQuality = async (listingData: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to use quality enhancement",
        variant: "destructive"
      });
      return;
    }

    const creditsRequired = 100;
    const canAfford = await deductCredits(creditsRequired, 'AI Quality Enhancer');
    
    if (!canAfford) {
      toast({
        title: "Insufficient Credits",
        description: "You need 100 credits for quality analysis",
        variant: "destructive"
      });
      return;
    }

    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('quality-enhancer', {
        body: {
          listing_data: listingData,
          user_id: user.id
        }
      });

      if (error) throw error;

      // Mock suggestions for now
      const mockSuggestions = [
        {
          id: '1',
          field: 'title',
          type: 'improvement',
          severity: 'high',
          reason: 'Title could be more descriptive and include key features',
          suggested_value: `${listingData.bedrooms}BHK ${listingData.property_type} in Prime ${listingData.locality} - ${listingData.area_sqft} sq ft`,
          confidence: 0.9
        },
        {
          id: '2',
          field: 'description',
          type: 'enhancement',
          severity: 'medium',
          reason: 'Description lacks specific amenities and neighborhood details',
          suggested_value: `${listingData.description}\n\nNearby amenities include shopping centers, schools, and excellent connectivity. This property offers modern amenities and is perfect for families.`,
          confidence: 0.85
        }
      ];

      setSuggestions(mockSuggestions);
      toast({
        title: "Quality Analysis Complete",
        description: `Found ${mockSuggestions.length} suggestions to improve your listing`
      });
      
      return mockSuggestions;
    } catch (error) {
      console.error('Error analyzing quality:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze listing quality. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setAnalyzing(false);
    }
  };

  return {
    analyzing,
    suggestions,
    analyzeQuality,
    resetSuggestions: () => setSuggestions([])
  };
};
