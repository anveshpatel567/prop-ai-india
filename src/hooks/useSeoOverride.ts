
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
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) {
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
        } else if (entityId) {
          await generateAiMetadata(path, entityId);
        }
      } catch (error) {
        console.error('Error fetching SEO override:', error);
        setSeoData({
          title: fallbackTitle,
          description: fallbackDescription
        });
      } finally {
        setLoading(false);
      }
    }

    fetchSeoOverride();
  }, [path, entityId, fallbackTitle, fallbackDescription, hasMounted]);

  const generateAiMetadata = async (path: string, entityId: string) => {
    if (!hasMounted) return;
    
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
    }
  };

  if (!hasMounted) {
    return { 
      seoData: { title: fallbackTitle, description: fallbackDescription }, 
      loading: true 
    };
  }

  return { seoData, loading };
}
