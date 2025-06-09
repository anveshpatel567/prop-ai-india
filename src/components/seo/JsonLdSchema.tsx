
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface JsonLdSchemaProps {
  type: 'organization' | 'realestate' | 'breadcrumb';
  data: any;
}

export const JsonLdSchema: React.FC<JsonLdSchemaProps> = ({ type, data }) => {
  const generateSchema = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'FreePropList',
          description: 'AI-Powered Property Platform for India',
          url: 'https://freeproplist.com',
          logo: 'https://freeproplist.com/logo.png',
          sameAs: [
            'https://twitter.com/freeproplist',
            'https://facebook.com/freeproplist'
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-XXX-XXX-XXXX',
            contactType: 'customer service'
          }
        };
        
      case 'realestate':
        return {
          '@context': 'https://schema.org',
          '@type': 'RealEstateListing',
          name: data.title,
          description: data.description,
          url: data.url,
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock'
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: data.city,
            addressRegion: data.state || 'India',
            addressCountry: 'IN'
          },
          floorSize: {
            '@type': 'QuantitativeValue',
            value: data.area,
            unitText: 'sq ft'
          },
          numberOfRooms: data.bedrooms,
          numberOfBathroomsTotal: data.bathrooms
        };
        
      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        };
        
      default:
        return null;
    }
  };

  const schema = generateSchema();
  
  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
