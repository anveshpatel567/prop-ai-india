
// Flat Type Architecture - No nested or recursive types

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'seeker' | 'owner' | 'agent' | 'rera_agent' | 'builder' | 'admin';
  rera_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface WalletBalance {
  id: string;
  user_id: string;
  balance: number;
  last_updated: string;
  status: 'active' | 'suspended';
}

export interface PropertyListing {
  id: string;
  user_id: string;
  title: string;
  description: string;
  property_type: 'residential' | 'commercial' | 'plot';
  listing_type: 'sale' | 'rent';
  price: number;
  area_sqft: number;
  bedrooms: number;
  bathrooms: number;
  city: string;
  locality: string;
  google_maps_pin: string;
  rera_number: string | null;
  is_rera_verified: boolean;
  status: 'active' | 'sold' | 'rented' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface SearchFilter {
  city: string;
  property_type: string;
  listing_type: string;
  min_price: number;
  max_price: number;
  min_area: number;
  max_area: number;
  bedrooms: number;
}

export interface AiSearchQuery {
  id: string;
  user_id: string;
  query_text: string;
  parsed_filters: string;
  results_count: number;
  credit_cost: number;
  created_at: string;
}

export interface PropertyMatchScore {
  property_id: string;
  match_percentage: number;
  match_reasons: string[];
}

export interface AiToolTransaction {
  id: string;
  user_id: string;
  tool_name: string;
  credit_cost: number;
  input_data: string;
  output_data: string;
  status: 'success' | 'failed' | 'pending';
  created_at: string;
}

export interface CrmLead {
  id: string;
  agent_id: string;
  seeker_id: string;
  property_id: string;
  lead_score: number;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  notes: string;
  follow_up_date: string;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
}

export interface ReferralReward {
  id: string;
  referrer_id: string;
  referee_id: string;
  reward_credits: number;
  status: 'pending' | 'completed';
  created_at: string;
}

export interface AdminLog {
  id: string;
  admin_id: string;
  action_type: string;
  target_id: string;
  description: string;
  created_at: string;
}

export interface AiToolConfig {
  tool_name: string;
  is_enabled: boolean;
  credit_cost: number;
  description: string;
}

export interface PaymentReceipt {
  id: string;
  user_id: string;
  amount: number;
  receipt_url: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string;
  created_at: string;
}

export interface PropertyComparison {
  id: string;
  user_id: string;
  property_ids: string[];
  comparison_data: string;
  created_at: string;
}

export interface SavedProperty {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
}
