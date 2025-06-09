
export type AiNegotiation = {
  id: string;
  listing_id: string;
  buyer_id: string;
  lister_id: string;
  offer_text: string;
  counter_text: string | null;
  status: 'open' | 'countered' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
};

export type ListingOffer = {
  id: string;
  listing_id: string;
  title: string;
  description: string;
  is_active: boolean;
  created_by: string;
  created_at: string;
};

export type NegotiationMessage = {
  id: string;
  negotiation_id: string;
  sender_id: string;
  message: string;
  message_type: 'offer' | 'counter' | 'acceptance' | 'rejection';
  created_at: string;
};
