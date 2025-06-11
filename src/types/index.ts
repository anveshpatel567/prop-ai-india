
// Flat type definitions for the application
export interface WalletBalance {
  id: string;
  user_id: string;
  balance: number;
  last_updated: string;
  status: string;
}

export interface PaymentReceipt {
  id: string;
  user_id: string;
  amount: number;
  receipt_url: string;
  status: string;
  admin_notes: string;
  created_at: string;
}

export interface AiTool {
  id: string;
  name: string;
  enabled: boolean;
  creditCost: number;
  description: string;
}

export interface AiToolConfig {
  tool_name: string;
  is_enabled: boolean;
  credit_cost: number;
  description: string;
}

export interface AiToolTransaction {
  id: string;
  user_id: string;
  tool_name: string;
  credit_cost: number;
  input_data: string;
  output_data: string;
  status: string;
  created_at: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Listing {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  state: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyListing {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  property_type: string;
  area_sqft: number;
  bedrooms: number;
  bathrooms: number;
  created_at: string;
  updated_at: string;
  listing_type: string;
  locality: string;
  city: string;
}

export interface ListingCategory {
  id: string;
  label: string;
  slug: string;
  description: string;
  is_active: boolean;
}

export interface ListingCondition {
  id: string;
  category_id: string;
  label: string;
  input_type: string;
  is_required: boolean;
  options: string[];
}

export interface SearchFilter {
  location: string;
  min_price: number;
  max_price: number;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
}

export interface PropertyMatchScore {
  listing_id: string;
  score: number;
  reasons: string[];
}

export interface Lead {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  budget: number;
  requirements: string;
  score: number;
  created_at: string;
}

export interface ToolRequirement {
  tool_name: string;
  credits_required: number;
  is_enabled: boolean;
  description: string;
}

export interface ToolAccessResult {
  canAccess: boolean;
  creditsRequired: number;
  currentCredits: number;
  reason?: string;
}
