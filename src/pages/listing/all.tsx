
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/layout/GlassCard';
import { GlowButton } from '@/components/common/GlowButton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useListings } from '@/hooks/useListings';
import { ListingCard } from '@/components/listing/ListingCard';
import { Link } from 'react-router-dom';
import { getSafeSelectValue } from '@/utils/selectUtils';

const AllListings: React.FC = () => {
  const { listings, fetchListings, loading } = useListings();
  const [filters, setFilters] = useState({
    location: '',
    property_type: '',
    listing_type: '',
    min_price: '',
    max_price: ''
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const applyFilters = () => {
    const filterObj = {
      location: filters.location || undefined,
      property_type: filters.property_type || undefined,
      listing_type: filters.listing_type || undefined,
      min_price: filters.min_price ? Number(filters.min_price) : undefined,
      max_price: filters.max_price ? Number(filters.max_price) : undefined,
    };
    fetchListings(filterObj);
  };

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Rajdhani']">Property Listings</h1>
          <p className="text-gray-600 font-['DM_Sans']">Find your perfect property from our curated listings</p>
        </div>

        {/* Filters */}
        <GlassCard className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 font-['Rajdhani']">Filter Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Input
                placeholder="Location"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="font-['DM_Sans']"
              />
              
              <Select value={filters.property_type} onValueChange={(value) => handleFilterChange('property_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.listing_type} onValueChange={(value) => handleFilterChange('listing_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Listing Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Min Price"
                type="number"
                value={filters.min_price}
                onChange={(e) => handleFilterChange('min_price', e.target.value)}
                className="font-['DM_Sans']"
              />

              <Input
                placeholder="Max Price"
                type="number"
                value={filters.max_price}
                onChange={(e) => handleFilterChange('max_price', e.target.value)}
                className="font-['DM_Sans']"
              />
            </div>
            
            <div className="mt-4 flex gap-2">
              <GlowButton onClick={applyFilters} className="font-['Rajdhani']">Apply Filters</GlowButton>
              <GlowButton 
                variant="outline" 
                onClick={() => {
                  setFilters({
                    location: '',
                    property_type: '',
                    listing_type: '',
                    min_price: '',
                    max_price: ''
                  });
                  fetchListings();
                }}
                className="font-['Rajdhani']"
              >
                Clear Filters
              </GlowButton>
            </div>
          </div>
        </GlassCard>

        {/* Listings Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl font-['DM_Sans']">Loading properties...</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-xl mb-4 font-['Rajdhani']">No properties found</div>
                <Link to="/listing/create">
                  <GlowButton className="font-['Rajdhani']">Create Your First Listing</GlowButton>
                </Link>
              </div>
            ) : (
              listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AllListings;
