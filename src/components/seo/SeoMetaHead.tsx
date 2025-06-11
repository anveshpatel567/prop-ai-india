
import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  
  // Add safety check to ensure we're in a proper context
  try {
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        
        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content={siteName} />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Additional meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="FreePropList" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
    );
  } catch (error) {
    console.error('Error rendering SeoMetaHead:', error);
    return (
      <div>
        <title>{title}</title>
      </div>
    );
  }
};
