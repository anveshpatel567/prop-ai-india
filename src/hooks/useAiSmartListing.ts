
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AiListingDraft, AiDescriptionRequest } from '@/types/listing/ai';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { useWallet } from '@/context/WalletContext';

export const useAiSmartListing = () => {
  const [enhancing, setEnhancing] = useState(false);
  const [draft, setDraft] = useState<AiListingDraft | null>(null);
  const { user } = useSupabaseUser();
  const { deductCredits } = useWallet();

  const enhanceDescription = async (request: AiDescriptionRequest) => {
    if (!user) throw new Error('User not authenticated');
    
    // Check and deduct credits
    const creditsNeeded = 100;
    const canAfford = await deductCredits(creditsNeeded, 'AI Description Enhancer');
    if (!canAfford) {
      throw new Error('Insufficient credits');
    }

    setEnhancing(true);
    try {
      const { data, error } = await supabase.functions.invoke('generateSmartDescription', {
        body: {
          ...request,
          user_id: user.id
        }
      });

      if (error) throw error;

      const enhancedDraft: AiListingDraft = {
        title: request.property_details.title,
        description: request.current_description,
        enhanced_description: data.enhanced_description,
        property_type: request.property_details.property_type,
        location: request.property_details.location,
        price: request.property_details.price || 0,
        ai_suggestions: data.suggestions || [],
        credits_used: creditsNeeded
      };

      setDraft(enhancedDraft);
      return enhancedDraft;
    } catch (error) {
      console.error('Error enhancing description:', error);
      throw error;
    } finally {
      setEnhancing(false);
    }
  };

  const acceptEnhancement = () => {
    if (draft && draft.enhanced_description) {
      setDraft(prev => prev ? { ...prev, description: prev.enhanced_description || prev.description } : null);
    }
  };

  return {
    enhancing,
    draft,
    enhanceDescription,
    acceptEnhancement,
    resetDraft: () => setDraft(null)
  };
};
