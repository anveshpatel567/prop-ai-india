
import React, { useState } from 'react';
import { useTitleChain } from '@/hooks/useTitleChain';
import TitleChainEditor from '@/components/listing/TitleChainEditor';
import TitleChainTimeline from '@/components/listing/TitleChainTimeline';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TitleChainPage() {
  const { data, fetchChain } = useTitleChain();
  const [listingId, setListingId] = useState('');

  const handleGenerated = () => {
    if (listingId) {
      fetchChain(listingId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            📋 AI Property Title Chain Visualizer
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Analyze legal documents and generate a visual timeline of property ownership transfers and important legal events.
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
                placeholder="Enter listing ID for title chain analysis"
              />
            </div>
            
            {listingId && (
              <TitleChainEditor 
                listingId={listingId} 
                onGenerated={handleGenerated}
              />
            )}
          </div>

          <TitleChainTimeline events={data} />
        </div>
      </div>
    </div>
  );
}
