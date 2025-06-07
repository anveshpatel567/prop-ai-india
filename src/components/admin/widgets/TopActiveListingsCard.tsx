
import { useEffect } from 'react';
import { useAiListingHeatmaps } from '@/hooks/useAiListingHeatmaps';

export default function TopActiveListingsCard() {
  const { heatmaps, loading, fetchListingHeatmaps } = useAiListingHeatmaps();

  useEffect(() => {
    fetchListingHeatmaps();
  }, []);

  const topListings = heatmaps
    .sort((a, b) => b.engagement_rate - a.engagement_rate)
    .slice(0, 5);

  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">🔥 Top Active Listings</h2>
      {loading ? (
        <div className="text-sm text-gray-500">Loading...</div>
      ) : (
        <ul className="text-sm space-y-1">
          {topListings.length > 0 ? (
            topListings.map((listing) => (
              <li key={listing.id} className="flex justify-between">
                <span>{listing.listing_id.slice(0, 8)}...</span>
                <span className="font-medium">{listing.engagement_rate}%</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No data available</li>
          )}
        </ul>
      )}
    </div>
  );
}
