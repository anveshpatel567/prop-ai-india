import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchFilters } from '@/components/search/SearchFilters';
import { useSearch } from '@/hooks/useSearch';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Search as SearchIcon, MapPin } from 'lucide-react';

const Search: React.FC = () => {
  const { searchResults, isLoading, manualSearch, aiSearch } = useSearch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleManualSearch = async (filters: any) => {
    console.log('Manual search with filters:', filters);
    setHasSearched(true);
    await manualSearch(filters);
  };

  const handleAiSearch = async (query: string) => {
    console.log('AI search with query:', query);
    setHasSearched(true);
    await aiSearch(query);
  };

  const LoadingSkeleton = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-5 w-1/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const NoResultsFound = () => (
    <Card className="text-center py-12">
      <CardContent className="space-y-4">
        <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
          <SearchIcon className="h-8 w-8 text-orange-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">No properties found</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          We couldn't find any properties matching your criteria. Try adjusting your filters or use our AI search for better results.
        </p>
      </CardContent>
    </Card>
  );

  const SearchPlaceholder = () => (
    <Card className="text-center py-16">
      <CardContent className="space-y-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center">
          <MapPin className="h-10 w-10 text-orange-500" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Find Your Dream Property</h3>
          <p className="text-gray-600 max-w-lg mx-auto">
            Use the filters above to search through thousands of verified properties, or try our AI-powered search for intelligent matching.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Your Perfect Property</h1>
          <p className="text-gray-600">Search through thousands of verified listings with smart filters and AI-powered matching</p>
        </div>

        <div className="space-y-8">
          <SearchFilters
            onSearch={handleManualSearch}
            onAiSearch={handleAiSearch}
          />

          {isLoading && <LoadingSkeleton />}

          {!isLoading && !hasSearched && <SearchPlaceholder />}

          {!isLoading && hasSearched && searchResults.length === 0 && <NoResultsFound />}

          {!isLoading && searchResults.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((listing) => (
                <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="h-48 bg-gradient-to-r from-orange-100 to-red-100 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="text-4xl mb-2">🏠</div>
                      <p className="text-sm">Property Image</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{listing.title || 'Property Title'}</h3>
                    <p className="text-gray-600 text-sm mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {listing.location}
                    </p>
                    <p className="text-orange-600 font-bold text-lg">₹{(listing.price || 0).toLocaleString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
