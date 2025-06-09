
import React from 'react';
import { getSafeSelectValue } from '@/utils/selectUtils';

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    description?: string | null;
    property_type: string;
    listing_type: string;
    price: number;
    area_sqft?: number | null;
    bedrooms?: number | null;
    bathrooms?: number | null;
    city: string;
    locality?: string | null;
    amenities?: any;
    photos?: any;
  };
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const getLocationDisplay = (listing: any) => {
    const city = getSafeSelectValue(listing.city);
    const locality = getSafeSelectValue(listing.locality);
    
    if (locality !== "-" && city !== "-") {
      return `${locality}, ${city}`;
    } else if (city !== "-") {
      return city;
    } else {
      return 'Location not specified';
    }
  };

  const safeAmenities = Array.isArray(listing.amenities) ? listing.amenities : [];

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_0_30px_rgba(255,102,0,0.45)] overflow-hidden hover:bg-white/20 hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 transform hover:scale-105">
      <div className="aspect-video bg-gradient-to-br from-[#ffe4d6] to-[#ff6a00] relative">
        <div className="absolute inset-0 flex items-center justify-center text-[#2d0000] font-['DM_Sans'] font-bold text-lg">
          🏠 Property Image
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 font-['Rajdhani'] text-[#2d0000]">
            {getSafeSelectValue(listing.title)}
          </h3>
          <span className={`px-2 py-1 rounded text-xs font-medium font-['DM_Sans'] ${
            listing.listing_type === 'sale' 
              ? 'bg-gradient-to-r from-[#84cc16] to-[#10b981] text-white' 
              : 'bg-gradient-to-r from-[#ff6a00] to-[#ff3c00] text-white'
          }`}>
            {listing.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
        </div>
        
        <p className="text-[#8b4513] text-sm mb-3 line-clamp-2 font-['DM_Sans']">
          {getSafeSelectValue(listing.description) !== "-" 
            ? listing.description 
            : 'No description available'}
        </p>
        
        <div className="flex items-center text-sm text-[#8b4513] mb-3 font-['DM_Sans']">
          <span>{getLocationDisplay(listing)}</span>
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
          <span className="text-xl font-bold bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] bg-clip-text text-transparent font-['Rajdhani']">
            {formatPrice(listing.price)}
          </span>
          <span className="text-xs text-[#8b4513] capitalize font-['DM_Sans']">
            {getSafeSelectValue(listing.property_type)}
          </span>
        </div>
        
        {safeAmenities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {safeAmenities.slice(0, 3).map((amenity: string, index: number) => (
              <span 
                key={index}
                className="bg-white/30 text-[#2d0000] px-2 py-1 rounded text-xs font-['DM_Sans']"
              >
                {getSafeSelectValue(amenity)}
              </span>
            ))}
            {safeAmenities.length > 3 && (
              <span className="text-xs text-[#8b4513] font-['DM_Sans']">
                +{safeAmenities.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
