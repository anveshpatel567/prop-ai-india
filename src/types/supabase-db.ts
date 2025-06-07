
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone: string | null;
          role: 'seeker' | 'owner' | 'agent' | 'rera_agent' | 'builder' | 'admin';
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
          role?: 'seeker' | 'owner' | 'agent' | 'rera_agent' | 'builder' | 'admin';
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
          role?: 'seeker' | 'owner' | 'agent' | 'rera_agent' | 'builder' | 'admin';
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
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
