
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SeoPreviewData {
  title: string;
  description: string;
  keywords: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  jsonLd: Record<string, any>;
}

export const useSeoPreview = () => {
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState<SeoPreviewData | null>(null);

  const generatePreview = async (path: string, entityId?: string) => {
    setLoading(true);
    try {
      // Get existing SEO data
      const { data: seoData } = await supabase
        .from('ai_seo_overrides')
        .select('*')
        .eq('path', path)
        .single();

      // Generate or use existing metadata
      let metadata = seoData;
      if (!seoData) {
        const { data } = await supabase.functions.invoke('generateSeoMetadata', {
          body: { path, entityId, triggerType: 'preview' }
        });
        metadata = data;
      }

      if (metadata) {
        const preview: SeoPreviewData = {
          title: metadata.title,
          description: metadata.description,
          keywords: metadata.keywords,
          openGraph: {
            title: metadata.title,
            description: metadata.description,
            image: 'https://freeproplist.com/og-image.jpg',
            url: `https://freeproplist.com${path}`
          },
          jsonLd: {
            "@context": "https://schema.org",
            "@type": path.includes('/property/') ? "RealEstate" : "WebPage",
            "name": metadata.title,
            "description": metadata.description,
            "url": `https://freeproplist.com${path}`
          }
        };
        setPreviewData(preview);
      }
    } catch (error) {
      console.error('Error generating SEO preview:', error);
    } finally {
      setLoading(false);
    }
  };

  const regenerateMetadata = async (path: string, entityId?: string) => {
    setLoading(true);
    try {
      const { data } = await supabase.functions.invoke('generateSeoMetadata', {
        body: { path, entityId, triggerType: 'manual' }
      });
      
      if (data) {
        await generatePreview(path, entityId);
      }
    } catch (error) {
      console.error('Error regenerating metadata:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    previewData,
    generatePreview,
    regenerateMetadata
  };
};
