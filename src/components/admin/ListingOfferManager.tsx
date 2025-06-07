import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import {
  useListingOffers,
  useCreateListingOffer,
  useUpdateListingOffer,
  useDeleteListingOffer,
  type CreateListingOfferInput,
  type FlatListingOffer
} from '@/hooks/useListingOffers';
import { Badge } from '@/components/ui/badge';

export default function ListingOfferManager() {
  const { data: offers, isLoading } = useListingOffers();
  const createOffer = useCreateListingOffer();
  const updateOffer = useUpdateListingOffer();
  const deleteOffer = useDeleteListingOffer();
  const { toast } = useToast();

  const [form, setForm] = useState<CreateListingOfferInput>({
    listing_id: '',
    title: '',
    description: '',
    offer_type: 'custom',
    discount_amount: undefined,
    expiry_at: undefined,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!form.listing_id.trim() || !form.title.trim()) {
      toast({
        title: 'Error',
        description: 'Listing ID and title are required',
        variant: 'destructive'
      });
      return;
    }

    try {
      await createOffer.mutateAsync(form);
      setForm({
        listing_id: '',
        title: '',
        description: '',
        offer_type: 'custom',
        discount_amount: undefined,
        expiry_at: undefined,
      });
      toast({
        title: 'Success',
        description: 'Offer created successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create offer',
        variant: 'destructive'
      });
    }
  };

  const handleStatusToggle = async (offer: FlatListingOffer) => {
    const newStatus = offer.status === 'active' ? 'disabled' : 'active';
    try {
      await updateOffer.mutateAsync({ id: offer.id, status: newStatus });
      toast({
        title: 'Success',
        description: `Offer ${newStatus === 'active' ? 'activated' : 'disabled'}`
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update offer',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;

    try {
      await deleteOffer.mutateAsync(id);
      toast({
        title: 'Success',
        description: 'Offer deleted successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete offer',
        variant: 'destructive'
      });
    }
  };

  const getOfferTypeBadge = (type: string) => {
    const variants = {
      discount: 'bg-gradient-to-r from-orange-500 to-red-500',
      perk: 'bg-gradient-to-r from-pink-500 to-rose-500',
      'limited-time': 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse',
      custom: 'bg-gradient-to-r from-gray-500 to-gray-600'
    };
    return variants[type as keyof typeof variants] || variants.custom;
  };

  const getDaysRemaining = (expiryAt: string | null) => {
    if (!expiryAt) return null;
    const days = Math.ceil((new Date(expiryAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days left` : 'Expired';
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading offers...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Listing Offer Manager</h1>
        <p className="text-gray-600">Create and manage promotional offers for property listings</p>
      </div>

      {/* Create New Offer Form */}
      <Card className="p-6 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm border border-white/20">
        <h2 className="text-lg font-semibold mb-4">Create New Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="listing_id">Listing ID *</Label>
            <Input
              id="listing_id"
              placeholder="Enter listing UUID"
              value={form.listing_id}
              onChange={(e) => setForm(f => ({ ...f, listing_id: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Offer Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Early Bird Discount"
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="offer_type">Offer Type</Label>
            <Select value={form.offer_type} onValueChange={(value: any) => setForm(f => ({ ...f, offer_type: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">Discount</SelectItem>
                <SelectItem value="perk">Perk</SelectItem>
                <SelectItem value="limited-time">Limited Time</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount_amount">Discount Amount (₹)</Label>
            <Input
              id="discount_amount"
              type="number"
              placeholder="Optional"
              value={form.discount_amount || ''}
              onChange={(e) => setForm(f => ({ ...f, discount_amount: e.target.value ? Number(e.target.value) : undefined }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiry_at">Expiry Date</Label>
            <Input
              id="expiry_at"
              type="datetime-local"
              value={form.expiry_at || ''}
              onChange={(e) => setForm(f => ({ ...f, expiry_at: e.target.value || undefined }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Offer details..."
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>
        </div>
        <Button 
          className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" 
          onClick={handleCreate}
          disabled={createOffer.isPending}
        >
          {createOffer.isPending ? 'Creating...' : 'Create Offer'}
        </Button>
      </Card>

      {/* Existing Offers */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Existing Offers</h2>
        {!offers || offers.length === 0 ? (
          <Card className="p-6">
            <div className="text-center text-gray-500">
              No offers found. Create your first offer above.
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {offers.map((offer) => (
              <Card 
                key={offer.id} 
                className={`p-4 bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:shadow-lg ${
                  offer.status === 'active' ? 'hover:shadow-orange-200/50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{offer.title}</h3>
                      <Badge className={`${getOfferTypeBadge(offer.offer_type)} text-white border-0`}>
                        {offer.offer_type}
                      </Badge>
                      <Badge variant={offer.status === 'active' ? 'default' : 'secondary'}>
                        {offer.status}
                      </Badge>
                    </div>
                    {offer.description && (
                      <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">Listing: {offer.listing_id.slice(0, 8)}...</span>
                      {offer.discount_amount && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          ₹{offer.discount_amount} off
                        </span>
                      )}
                      {offer.expiry_at && (
                        <span className={`px-2 py-1 rounded text-xs ${
                          getDaysRemaining(offer.expiry_at)?.includes('Expired') 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {getDaysRemaining(offer.expiry_at)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusToggle(offer)}
                      disabled={updateOffer.isPending}
                    >
                      {offer.status === 'active' ? 'Disable' : 'Activate'}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(offer.id)}
                      disabled={deleteOffer.isPending}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
