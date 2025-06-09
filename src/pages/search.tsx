
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
import { MobileCardSpacing } from '@/components/mobile/MobileCardSpacingFix';

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
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] to-[#ffe4d6]">
      <Navbar />
      <section className="py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2d0000] mb-2 font-rajdhani">Property Search</h1>
              <p className="text-sm sm:text-base text-[#8b4513] font-dmsans">Find your perfect property with manual filters or AI search</p>
            </div>
            <div className="flex justify-center sm:justify-end">
              <GoBackHomeButton />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            <GlassCard>
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#2d0000] font-rajdhani">Manual Search (Free)</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <Select
                      value={getSafeSelectValue(manualFilters.location)}
                      onValueChange={(value) => handleFilterChange('location', value)}
                    >
                      <SelectTrigger className="h-11 sm:h-12 bg-white/10 backdrop-blur-sm border border-white/20 text-[#2d0000]">
                        <SelectValue placeholder="Select City" className="text-[#8b4513]" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/10 backdrop-blur-xl border border-white/20">
                        {cities.filter(isValidSelectOption).map((city) => (
                          <SelectItem key={city.value} value={city.value} className="text-[#2d0000] hover:bg-[#ff4500]/10">
                            {city.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select
                      value={getSafeSelectValue(manualFilters.property_type)}
                      onValueChange={(value) => handleFilterChange('property_type', value)}
                    >
                      <SelectTrigger className="h-11 sm:h-12 bg-white/10 backdrop-blur-sm border border-white/20 text-[#2d0000]">
                        <SelectValue placeholder="Property Type" className="text-[#8b4513]" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/10 backdrop-blur-xl border border-white/20">
                        {propertyTypes.filter(isValidSelectOption).map((type) => (
                          <SelectItem key={type.value} value={type.value} className="text-[#2d0000] hover:bg-[#ff4500]/10">
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <Input
                      type="number"
                      placeholder="Min Price"
                      value={manualFilters.min_price}
                      onChange={(e) => handleFilterChange('min_price', e.target.value)}
                      className="h-11 sm:h-12 bg-white/10 backdrop-blur-sm border border-white/20 text-[#2d0000] placeholder:text-[#8b4513]"
                    />
                    <Input
                      type="number"
                      placeholder="Max Price"
                      value={manualFilters.max_price}
                      onChange={(e) => handleFilterChange('max_price', e.target.value)}
                      className="h-11 sm:h-12 bg-white/10 backdrop-blur-sm border border-white/20 text-[#2d0000] placeholder:text-[#8b4513]"
                    />
                  </div>
                  
                  <Select
                    value={getSafeSelectValue(manualFilters.listing_type)}
                    onValueChange={(value) => handleFilterChange('listing_type', value)}
                  >
                    <SelectTrigger className="h-11 sm:h-12 bg-white/10 backdrop-blur-sm border border-white/20 text-[#2d0000]">
                      <SelectValue placeholder="Listing Type" className="text-[#8b4513]" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/10 backdrop-blur-xl border border-white/20">
                      {listingTypes.filter(isValidSelectOption).map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-[#2d0000] hover:bg-[#ff4500]/10">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <button
                    onClick={handleManualSearch}
                    className="w-full h-12 sm:h-14 bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-[#fff7f0] font-semibold rounded-xl shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base font-rajdhani"
                  >
                    Search Properties
                  </button>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#2d0000] font-rajdhani">AI Smart Search (8 Credits)</h2>
                <div className="space-y-3 sm:space-y-4">
                  <Textarea
                    placeholder="Describe what you're looking for... e.g., '3BHK apartment near metro station in Mumbai under 2 crores'"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    className="h-24 sm:h-32 resize-none text-sm sm:text-base bg-white/10 backdrop-blur-sm border border-white/20 text-[#2d0000] placeholder:text-[#8b4513]"
                  />
                  <button
                    onClick={handleAiSearch}
                    disabled={!aiQuery.trim()}
                    className="w-full h-12 sm:h-14 bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-[#fff7f0] font-semibold rounded-xl shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base font-rajdhani"
                  >
                    Search with AI
                  </button>
                  <div className="text-xs sm:text-sm text-[#8b4513] text-center font-dmsans">
                    AI will understand your requirements and find matching properties
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          <MobileCardSpacing className="mt-8 sm:mt-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#2d0000] mb-4 sm:mb-6 font-rajdhani">Popular Searches</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
                  className="bg-white/10 backdrop-blur-xl text-[#2d0000] font-medium px-3 sm:px-4 py-3 sm:py-2 rounded-xl border border-white/20 shadow-[0_0_20px_rgba(255,102,0,0.25)] hover:bg-[#ff4500]/10 hover:shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:border-[#ff4500] transition-all duration-300 ease-in-out transform hover:scale-105 text-left text-sm sm:text-base min-h-[44px] flex items-center font-rajdhani"
                >
                  {search}
                </button>
              ))}
            </div>
          </MobileCardSpacing>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Search;
