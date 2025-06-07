
import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/layout/GlassCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useListings } from '@/hooks/useListings';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
  const { fetchListings } = useListings();
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

  const handleAiSearch = () => {
    const basicLocation = extractLocationFromQuery(aiQuery);
    if (basicLocation) {
      fetchListings({ location: basicLocation });
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

  return (
    <div className="min-h-screen bg-global-bg">
      <Navbar />
      <section className="section-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-rajdhani text-3xl font-bold text-text-primary mb-2">Property Search</h1>
            <p className="font-dmsans text-text-secondary">Find your perfect property with manual filters or AI search</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <GlassCard>
              <div className="p-6">
                <h2 className="font-rajdhani text-xl font-semibold mb-4 text-text-primary">Manual Search (Free)</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      value={manualFilters.location}
                      onValueChange={(value) => setManualFilters({ ...manualFilters, location: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Delhi">Delhi</SelectItem>
                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                        <SelectItem value="Pune">Pune</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select
                      value={manualFilters.property_type}
                      onValueChange={(value) => setManualFilters({ ...manualFilters, property_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="plot">Plot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      placeholder="Min Price"
                      value={manualFilters.min_price}
                      onChange={(e) => setManualFilters({ ...manualFilters, min_price: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Max Price"
                      value={manualFilters.max_price}
                      onChange={(e) => setManualFilters({ ...manualFilters, max_price: e.target.value })}
                    />
                  </div>
                  
                  <Select
                    value={manualFilters.listing_type}
                    onValueChange={(value) => setManualFilters({ ...manualFilters, listing_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Listing Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <button
                    onClick={handleManualSearch}
                    className="w-full bg-gradient-to-r from-[#FDBA74] to-[#60A5FA] text-white font-rajdhani font-semibold 
                             py-3 px-6 rounded-xl shadow-lg hover:shadow-glow-blue 
                             transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Search Properties
                  </button>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <h2 className="font-rajdhani text-xl font-semibold mb-4 text-text-primary">AI Smart Search (8 Credits)</h2>
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
                    className="w-full bg-gradient-to-r from-accent-violet to-accent-cyan text-white font-rajdhani font-semibold 
                             py-3 px-6 rounded-xl shadow-lg hover:shadow-glow-cyan 
                             transition-all duration-300 ease-in-out transform hover:scale-105
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Search with AI
                  </button>
                  <div className="text-sm font-dmsans text-text-muted text-center">
                    AI will understand your requirements and find matching properties
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="mt-12">
            <h2 className="font-rajdhani text-2xl font-bold text-text-primary mb-6">Popular Searches</h2>
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
                  className="bg-white/80 backdrop-blur-md text-slate-900 font-dmsans font-medium
                           px-4 py-2 rounded-xl border border-white/30 shadow-soft
                           hover:bg-white/90 hover:shadow-lg hover:border-accent-blue/30
                           transition-all duration-300 ease-in-out transform hover:scale-105
                           text-left"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Information Block */}
          <div className="mt-16 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-md mx-auto shadow-lg text-center">
              <div className="space-y-2 text-sm md:text-base text-white/90">
                <p className="font-dmsans">info@freeproplist.com</p>
                <p className="font-dmsans">9512901356</p>
                <p className="font-dmsans">Ahmedabad, Gujarat, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Search;
