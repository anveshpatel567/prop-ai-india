
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/layout/GlassCard';
import { GlowButton } from '@/components/common/GlowButton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useListings } from '@/hooks/useListings';
import type { Database } from '@/types/supabase-db';
import { Link } from 'react-router-dom';

type PropertyListing = Database['public']['Tables']['property_listings']['Row'];

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

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Property Listings</h1>
          <p className="text-gray-600">Find your perfect property from our curated listings</p>
        </div>

        {/* Filters */}
        <GlassCard className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Input
                placeholder="Location"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
              
              <Select value={filters.property_type} onValueChange={(value) => handleFilterChange('property_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
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
              />

              <Input
                placeholder="Max Price"
                type="number"
                value={filters.max_price}
                onChange={(e) => handleFilterChange('max_price', e.target.value)}
              />
            </div>
            
            <div className="mt-4 flex gap-2">
              <GlowButton onClick={applyFilters}>Apply Filters</GlowButton>
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
              >
                Clear Filters
              </GlowButton>
            </div>
          </div>
        </GlassCard>

        {/* Listings Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl">Loading properties...</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-xl mb-4">No properties found</div>
                <Link to="/listing/create">
                  <GlowButton>Create Your First Listing</GlowButton>
                </Link>
              </div>
            ) : (
              listings.map((listing) => (
                <GlassCard key={listing.id} className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100"></div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg line-clamp-2">{listing.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        listing.listing_type === 'sale' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {listing.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {listing.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{listing.location}</span>
                      {listing.area_sqft && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{listing.area_sqft} sq ft</span>
                        </>
                      )}
                      {listing.bedrooms && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{listing.bedrooms}BHK</span>
                        </>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-orange-600">
                        {formatPrice(listing.price)}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {listing.property_type}
                      </span>
                    </div>
                    
                    {listing.amenities && listing.amenities.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {listing.amenities.slice(0, 3).map((amenity, index) => (
                          <span 
                            key={index}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                          >
                            {amenity}
                          </span>
                        ))}
                        {listing.amenities.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{listing.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </GlassCard>
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
