
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
  offer_amount?: number;
  sent_at: string;
  created_at: string;
};

export type SavedSearch = {
  id: string;
  user_id: string;
  search_name: string;
  filters: string;
  alert_enabled: boolean;
  created_at: string;
};

export type DeveloperPaymentPlan = {
  id: string;
  developer_id: string;
  plan_name: string;
  plan_type: 'custom' | 'template';
  pdf_url: string | null;
  template_data: string | null;
  created_at: string;
};
