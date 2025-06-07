
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ButtonVariant } from '@/types/ui';

interface ButtonControlData {
  allowed_variants: ButtonVariant[];
  fallback_variant: ButtonVariant;
}

export const useButtonControl = (page: string) => {
  return useQuery({
    queryKey: ['button-control', page],
    queryFn: async (): Promise<ButtonControlData> => {
      const { data, error } = await supabase
        .from('ui_button_controls')
        .select('allowed_variants, fallback_variant')
        .eq('page_slug', page)
        .single();

      if (error || !data) {
        console.warn(`No button control config found for page: ${page}, using defaults`);
        return {
          allowed_variants: ['primary', 'secondary', 'glass'],
          fallback_variant: 'primary'
        };
      }

      return {
        allowed_variants: data.allowed_variants as ButtonVariant[],
        fallback_variant: data.fallback_variant as ButtonVariant
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const logButtonUsage = async (page: string, variant: ButtonVariant) => {
  try {
    await supabase.functions.invoke('ui/log-button-variant', {
      body: { page, variant }
    });
  } catch (error) {
    console.error('Failed to log button usage:', error);
  }
};
