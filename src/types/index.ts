
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
