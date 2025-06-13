
import React from 'react';
import { Helmet } from 'react-helmet-async';

export function PageMetaTags({ 
  title,
  description,
  keywords,
  imageUrl,
  canonicalUrl,
  schemaMarkup 
}: { 
  title: string;
  description: string;
  keywords?: string;
  imageUrl?: string;
  canonicalUrl?: string;
  schemaMarkup?: string;
}) {
  const siteName = "PropertyHub - AI-Powered Real Estate Platform";
  const defaultImage = "/placeholder.svg";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="PropertyHub Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      
      {/* Schema Markup */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {schemaMarkup}
        </script>
      )}
    </Helmet>
  );
}
