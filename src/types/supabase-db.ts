import { UserRole } from './global';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone: string | null;
          role: UserRole;
          rera_number: string | null;
          is_rera_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          phone?: string | null;
          role?: UserRole;
          rera_number?: string | null;
          is_rera_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone?: string | null;
          role?: UserRole;
          rera_number?: string | null;
          is_rera_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      wallets: {
        Row: {
          id: string;
          user_id: string;
          balance: number;
          last_updated: string;
          status: 'active' | 'suspended';
        };
        Insert: {
          id?: string;
          user_id: string;
          balance?: number;
          last_updated?: string;
          status?: 'active' | 'suspended';
        };
        Update: {
          id?: string;
          user_id?: string;
          balance?: number;
          last_updated?: string;
          status?: 'active' | 'suspended';
        };
      };
      auth_sessions: {
        Row: {
          id: string;
          user_id: string;
          session_token: string;
          created_at: string;
          expires_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          session_token: string;
          created_at?: string;
          expires_at: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          session_token?: string;
          created_at?: string;
          expires_at?: string;
          is_active?: boolean;
        };
      };
      ui_button_controls: {
        Row: {
          id: string;
          page_slug: string;
          allowed_variants: string[];
          fallback_variant: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          page_slug: string;
          allowed_variants: string[];
          fallback_variant: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          page_slug?: string;
          allowed_variants?: string[];
          fallback_variant?: string;
          updated_at?: string;
        };
      };
      ui_button_logs: {
        Row: {
          id: string;
          page: string;
          variant: string;
          user_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          page: string;
          variant: string;
          user_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          page?: string;
          variant?: string;
          user_id?: string | null;
          created_at?: string;
        };
      };
      property_listings: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          property_type: string;
          listing_type: 'sale' | 'rent';
          price: number;
          area_sqft: number | null;
          bedrooms: number | null;
          bathrooms: number | null;
          location: string;
          address: string | null;
          amenities: string[] | null;
          photos: string[] | null;
          status: 'active' | 'draft' | 'sold' | 'rented';
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          property_type: string;
          listing_type: 'sale' | 'rent';
          price: number;
          area_sqft?: number | null;
          bedrooms?: number | null;
          bathrooms?: number | null;
          location: string;
          address?: string | null;
          amenities?: string[] | null;
          photos?: string[] | null;
          status?: 'active' | 'draft' | 'sold' | 'rented';
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          property_type?: string;
          listing_type?: 'sale' | 'rent';
          price?: number;
          area_sqft?: number | null;
          bedrooms?: number | null;
          bathrooms?: number | null;
          location?: string;
          address?: string | null;
          amenities?: string[] | null;
          photos?: string[] | null;
          status?: 'active' | 'draft' | 'sold' | 'rented';
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
