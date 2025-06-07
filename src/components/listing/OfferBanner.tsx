
import { useOffersForListing, type FlatListingOffer } from '@/hooks/useListingOffers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface OfferBannerProps {
  listingId: string;
  onUnlockOffer?: () => void;
}

export default function OfferBanner({ listingId, onUnlockOffer }: OfferBannerProps) {
  const { data: offers, isLoading } = useOffersForListing(listingId);

  if (isLoading || !offers || offers.length === 0) {
    return null;
  }

  const activeOffers = offers.filter(offer => {
    if (offer.status !== 'active') return false;
    if (offer.expiry_at && new Date(offer.expiry_at) < new Date()) return false;
    return true;
  });

  if (activeOffers.length === 0) return null;

  const getOfferStyles = (type: string) => {
    const styles = {
      discount: {
        container: 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-300/50',
        badge: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
        glow: 'shadow-orange-200/50'
      },
      perk: {
        container: 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-pink-300/50',
        badge: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
        glow: 'shadow-pink-200/50'
      },
      'limited-time': {
        container: 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-300/50 animate-pulse',
        badge: 'bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse',
        glow: 'shadow-red-200/50'
      },
      custom: {
        container: 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-300/50',
        badge: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
        glow: 'shadow-gray-200/50'
      }
    };
    return styles[type as keyof typeof styles] || styles.custom;
  };

  const getDaysRemaining = (expiryAt: string | null) => {
    if (!expiryAt) return null;
    const days = Math.ceil((new Date(expiryAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : null;
  };

  return (
    <div className="space-y-3">
      {activeOffers.map((offer) => {
        const styles = getOfferStyles(offer.offer_type);
        const daysLeft = getDaysRemaining(offer.expiry_at);
        
        return (
          <div
            key={offer.id}
            className={`
              p-4 rounded-xl backdrop-blur-sm border 
              ${styles.container} ${styles.glow}
              transition-all duration-300 hover:shadow-lg
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{offer.title}</h3>
                  <Badge className={`${styles.badge} border-0`}>
                    {offer.offer_type.replace('-', ' ')}
                  </Badge>
                  {daysLeft && (
                    <Badge variant="outline" className="text-xs">
                      {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
                    </Badge>
                  )}
                </div>
                
                {offer.description && (
                  <p className="text-sm text-gray-700 mb-3">{offer.description}</p>
                )}
                
                <div className="flex items-center gap-4">
                  {offer.discount_amount && (
                    <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-green-700">
                        Save ₹{offer.discount_amount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  {offer.offer_type === 'limited-time' && (
                    <div className="bg-red-500/10 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                      ⏰ Limited Time Only
                    </div>
                  )}
                </div>
              </div>
              
              <div className="ml-4">
                <Button
                  onClick={onUnlockOffer}
                  className={`
                    ${styles.badge} hover:scale-105 transition-transform
                    shadow-lg border-0 font-medium
                  `}
                  size="sm"
                >
                  Unlock Offer
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
