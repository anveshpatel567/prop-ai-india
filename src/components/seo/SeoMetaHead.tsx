
import React from 'react';

interface SeoMetaHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
}

export const SeoMetaHead: React.FC<SeoMetaHeadProps> = ({
  title,
  description,
  keywords,
  ogImage = '/placeholder.svg',
  canonicalUrl,
  type = 'website'
}) => {
  console.log('SeoMetaHead rendering with title:', title);
  
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const siteName = 'FreePropList - AI-Powered Property Platform';
  
  // For now, let's just use basic HTML head elements without react-helmet-async
  // This avoids the helmet context issues
  React.useEffect(() => {
    document.title = title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Update keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }
  }, [title, description, keywords]);
  
  return null; // This component only manages document head, no visual output
};
