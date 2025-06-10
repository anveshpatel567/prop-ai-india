
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useWallet } from '@/context/WalletContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useAiPricingSuggestion = () => {
  const [suggesting, setSuggesting] = useState(false);
  const [suggestion, setSuggestion] = useState<any>(null);
  const { user } = useAuth();
  const { deductCredits } = useWallet();
  const { toast } = useToast();

  const getPricingSuggestion = async (propertyData: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to use AI pricing",
        variant: "destructive"
      });
      return;
    }

    const creditsRequired = 30;
    const canAfford = await deductCredits(creditsRequired, 'AI Smart Pricing');
    
    if (!canAfford) {
      toast({
        title: "Insufficient Credits",
        description: "You need 30 credits for AI pricing analysis",
        variant: "destructive"
      });
      return;
    }

    setSuggesting(true);
    try {
      const { data, error } = await supabase.functions.invoke('generatePricingSuggestion', {
        body: {
          property_details: propertyData,
          user_id: user.id
        }
      });

      if (error) throw error;

      setSuggestion(data.suggestion);
      toast({
        title: "AI Pricing Complete",
        description: "Smart pricing analysis generated successfully"
      });
      
      return data.suggestion;
    } catch (error) {
      console.error('Error getting pricing suggestion:', error);
      toast({
        title: "Pricing Analysis Failed",
        description: "Unable to generate pricing suggestion. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setSuggesting(false);
    }
  };

  return {
    suggesting,
    suggestion,
    getPricingSuggestion,
    resetSuggestion: () => setSuggestion(null)
  };
};
