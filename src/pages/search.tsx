
import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/layout/GlassCard';
import { EnhancedSearchInterface } from '../components/search/EnhancedSearchInterface';
import { ListingCard } from '../components/listing/ListingCard';
import { useSearch } from '../hooks/useSearch';

const Search: React.FC = () => {
  const { searchResults, isLoading, manualSearch, aiSearch } = useSearch();
  const [searchMode, setSearchMode] = useState<'manual' | 'ai'>('manual');

  const handleManualSearch = async (filters: any) => {
    console.log('Manual search with filters:', filters);
    await manualSearch(filters);
  };

  const handleAiSearch = async (query: string) => {
    console.log('AI search with query:', query);
    setSearchMode('ai');
    await aiSearch(query);
  };

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Your Perfect Property</h1>
          <p className="text-gray-600">Search through thousands of listings with smart filters and AI-powered matching</p>
        </div>

        <div className="space-y-8">
          <EnhancedSearchInterface
            onSearch={handleManualSearch}
            onAiSearch={handleAiSearch}
            searchResults={searchResults}
            loading={isLoading}
          />

          {isLoading && (
            <div className="text-center py-12">
              <div className="text-xl">Searching properties...</div>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          {!isLoading && searchResults.length === 0 && (
            <GlassCard>
              <div className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search filters or use our AI search for better results
                </p>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
