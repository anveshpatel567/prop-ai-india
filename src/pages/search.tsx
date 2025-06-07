
import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/layout/GlassCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useListings } from '@/hooks/useListings';
import { useAiSearchHistory } from '@/hooks/useAiSearchHistory';
import { useNavigate } from 'react-router-dom';
import { getSafeSelectValue, isValidSelectOption } from '@/utils/selectUtils';
import { GoBackHomeButton } from '@/components/ui/GoBackHomeButton';

const Search: React.FC = () => {
  const { fetchListings } = useListings();
  const { recordAiSearch } = useAiSearchHistory();
  const navigate = useNavigate();
  
  const [manualFilters, setManualFilters] = useState({
    location: '',
    property_type: '',
    listing_type: '',
    min_price: '',
    max_price: ''
  });
  
  const [aiQuery, setAiQuery] = useState('');

  const handleManualSearch = async () => {
    const filters = {
      location: manualFilters.location || undefined,
      property_type: manualFilters.property_type || undefined,
      listing_type: manualFilters.listing_type || undefined,
      min_price: manualFilters.min_price ? Number(manualFilters.min_price) : undefined,
      max_price: manualFilters.max_price ? Number(manualFilters.max_price) : undefined,
    };
    
    await fetchListings(filters);
    navigate('/listing/all');
  };

  const handleAiSearch = async () => {
    const basicLocation = extractLocationFromQuery(aiQuery);
    const filters = basicLocation ? { location: basicLocation } : {};
    
    try {
      await recordAiSearch({
        user_id: '',
        search_query: aiQuery,
        ai_interpretation: { extracted_location: basicLocation },
        results_count: null,
        filters_applied: filters,
        credits_used: 8
      });
    } catch (error) {
      console.error('Failed to record AI search:', error);
    }

    if (basicLocation) {
      await fetchListings(filters);
    }
    navigate('/listing/all');
  };

  const extractLocationFromQuery = (query: string): string => {
    const cities = ['mumbai', 'delhi', 'bangalore', 'pune', 'chennai', 'hyderabad', 'kolkata'];
    const lowerQuery = query.toLowerCase();
    
    for (const city of cities) {
      if (lowerQuery.includes(city)) {
        return city.charAt(0).toUpperCase() + city.slice(1);
      }
    }
    return '';
  };

  const handleFilterChange = (key: string, value: string) => {
    const safeValue = value && value.trim() !== '' && value !== 'all' ? value : '';
    setManualFilters({ ...manualFilters, [key]: safeValue });
  };

  const cities = [
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Chennai', label: 'Chennai' }
  ];

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'villa', label: 'Villa' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'plot', label: 'Plot' }
  ];

  const listingTypes = [
    { value: 'sale', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Search</h1>
              <p className="text-gray-600">Find your perfect property with manual filters or AI search</p>
            </div>
            <GoBackHomeButton />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <GlassCard>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Manual Search (Free)</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      value={getSafeSelectValue(manualFilters.location)}
                      onValueChange={(value) => handleFilterChange('location', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.filter(isValidSelectOption).map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select
                      value={getSafeSelectValue(manualFilters.property_type)}
                      onValueChange={(value) => handleFilterChange('property_type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.filter(isValidSelectOption).map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      placeholder="Min Price"
                      value={manualFilters.min_price}
                      onChange={(e) => handleFilterChange('min_price', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Max Price"
                      value={manualFilters.max_price}
                      onChange={(e) => handleFilterChange('max_price', e.target.value)}
                    />
                  </div>
                  
                  <Select
                    value={getSafeSelectValue(manualFilters.listing_type)}
                    onValueChange={(value) => handleFilterChange('listing_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Listing Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {listingTypes.filter(isValidSelectOption).map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <button
                    onClick={handleManualSearch}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Search Properties
                  </button>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">AI Smart Search (8 Credits)</h2>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Describe what you're looking for... e.g., '3BHK apartment near metro station in Mumbai under 2 crores'"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    className="h-32 resize-none"
                  />
                  <button
                    onClick={handleAiSearch}
                    disabled={!aiQuery.trim()}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Search with AI
                  </button>
                  <div className="text-sm text-gray-600 text-center">
                    AI will understand your requirements and find matching properties
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Searches</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                '3BHK in Mumbai',
                '2BHK for rent Delhi',
                'Commercial space Bangalore',
                'Villa in Pune'
              ].map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAiQuery(search);
                    handleAiSearch();
                  }}
                  className="bg-white text-gray-900 font-medium px-4 py-2 rounded-xl border border-orange-200 shadow-md hover:bg-orange-50 hover:shadow-lg hover:border-orange-300 transition-all duration-300 ease-in-out transform hover:scale-105 text-left"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Search;
