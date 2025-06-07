
import React, { useState, useEffect } from 'react';
import { useSeoSchema } from '@/hooks/useSeoSchema';
import GenerateSeoSchemaButton from '@/components/listing/GenerateSeoSchemaButton';
import SeoSchemaCard from '@/components/listing/SeoSchemaCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SeoSchemaPage() {
  const { data, fetchSchema } = useSeoSchema();
  const [listingId, setListingId] = useState('');

  const handleGenerated = () => {
    if (listingId) {
      fetchSchema(listingId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            🔍 AI SEO Schema Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Generate JSON-LD schema markup for your property listings to improve SEO and search engine visibility.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <Label htmlFor="listing_id">Listing ID</Label>
              <Input
                id="listing_id"
                type="text"
                value={listingId}
                onChange={(e) => setListingId(e.target.value)}
                placeholder="Enter listing ID to generate schema"
              />
            </div>
            
            {listingId && (
              <GenerateSeoSchemaButton 
                listingId={listingId} 
                onGenerated={handleGenerated}
              />
            )}
          </div>

          {data && (
            <SeoSchemaCard 
              jsonld={data.jsonld} 
              createdAt={data.created_at} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
