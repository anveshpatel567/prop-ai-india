import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SeoOverride {
  title?: string;
  description?: string;
  keywords?: string;
  source?: string;
}

interface UseSeoOverrideProps {
  path: string;
  entityId?: string;
  fallbackTitle: string;
  fallbackDescription: string;
}

export function useSeoOverride({ 
  path, 
  entityId, 
  fallbackTitle, 
  fallbackDescription 
}: UseSeoOverrideProps) {
  const [seoData, setSeoData] = useState<SeoOverride>({
    title: fallbackTitle,
    description: fallbackDescription
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run on client side after component mount
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    async function fetchSeoOverride() {
      try {
        const { data, error } = await supabase
          .from('ai_seo_overrides')
          .select('title, description, keywords, source')
          .eq('path', path)
          .maybeSingle();

        if (error) {
          console.warn('SEO override fetch failed:', error);
          // Use fallbacks on error instead of throwing
          setSeoData({
            title: fallbackTitle,
            description: fallbackDescription
          });
          return;
        }

        if (data) {
          setSeoData({
            title: data.title || fallbackTitle,
            description: data.description || fallbackDescription,
            keywords: data.keywords || undefined,
            source: data.source || 'manual'
          });
        } else {
          // If no override exists and entityId provided, try to generate AI metadata
          if (entityId) {
            await generateAiMetadata(path, entityId);
          }
        }
      } catch (error) {
        console.error('Error fetching SEO override:', error);
        // Always provide fallbacks instead of crashing
        setSeoData({
          title: fallbackTitle,
          description: fallbackDescription
        });
      } finally {
        setLoading(false);
      }
    }

    fetchSeoOverride();
  }, [path, entityId, fallbackTitle, fallbackDescription]);

  const generateAiMetadata = async (path: string, entityId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('generateSeoMetadata', {
        body: { path, entityId }
      });

      if (error) {
        console.warn('AI metadata generation failed:', error);
        return;
      }

      if (data) {
        setSeoData({
          title: data.title || fallbackTitle,
          description: data.description || fallbackDescription,
          keywords: data.keywords,
          source: 'gpt'
        });
      }
    } catch (error) {
      console.error('Error generating AI metadata:', error);
      // Silently fail and keep fallbacks
    }
  };

  return { seoData, loading };
}
