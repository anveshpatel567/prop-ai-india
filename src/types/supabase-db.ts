
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
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          balance?: number;
          last_updated?: string;
          status?: 'active' | 'suspended';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          balance?: number;
          last_updated?: string;
          status?: 'active' | 'suspended';
          created_at?: string;
        };
      };
      listings: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          property_type: 'residential' | 'commercial' | 'plot';
          listing_type: 'sale' | 'rent';
          price: number;
          area_sqft: number | null;
          bedrooms: number | null;
          bathrooms: number | null;
          city: string;
          locality: string | null;
          google_maps_pin: string;
          rera_number: string | null;
          is_rera_verified: boolean;
          amenities: any | null;
          photos: any | null;
          status: 'active' | 'sold' | 'rented' | 'draft';
          ai_generated_title: boolean;
          ai_parsed_data: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          property_type: 'residential' | 'commercial' | 'plot';
          listing_type: 'sale' | 'rent';
          price: number;
          area_sqft?: number | null;
          bedrooms?: number | null;
          bathrooms?: number | null;
          city: string;
          locality?: string | null;
          google_maps_pin: string;
          rera_number?: string | null;
          is_rera_verified?: boolean;
          amenities?: any | null;
          photos?: any | null;
          status?: 'active' | 'sold' | 'rented' | 'draft';
          ai_generated_title?: boolean;
          ai_parsed_data?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          property_type?: 'residential' | 'commercial' | 'plot';
          listing_type?: 'sale' | 'rent';
          price?: number;
          area_sqft?: number | null;
          bedrooms?: number | null;
          bathrooms?: number | null;
          city?: string;
          locality?: string | null;
          google_maps_pin?: string;
          rera_number?: string | null;
          is_rera_verified?: boolean;
          amenities?: any | null;
          photos?: any | null;
          status?: 'active' | 'sold' | 'rented' | 'draft';
          ai_generated_title?: boolean;
          ai_parsed_data?: any | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      listing_categories: {
        Row: {
          id: string;
          slug: string;
          label: string;
          parent_id: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          label: string;
          parent_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          label?: string;
          parent_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      listing_conditions: {
        Row: {
          id: string;
          label: string;
          applies_to_category_id: string | null;
          input_type: 'dropdown' | 'input' | 'checkbox' | 'date' | 'number';
          options: any | null;
          is_required: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          applies_to_category_id?: string | null;
          input_type: 'dropdown' | 'input' | 'checkbox' | 'date' | 'number';
          options?: any | null;
          is_required?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          applies_to_category_id?: string | null;
          input_type?: 'dropdown' | 'input' | 'checkbox' | 'date' | 'number';
          options?: any | null;
          is_required?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_tool_transactions: {
        Row: {
          id: string;
          user_id: string;
          tool_name: string;
          credit_cost: number;
          input_data: any | null;
          output_data: any | null;
          status: 'pending' | 'success' | 'failed';
          processing_time_ms: number | null;
          error_message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tool_name: string;
          credit_cost: number;
          input_data?: any | null;
          output_data?: any | null;
          status?: 'pending' | 'success' | 'failed';
          processing_time_ms?: number | null;
          error_message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tool_name?: string;
          credit_cost?: number;
          input_data?: any | null;
          output_data?: any | null;
          status?: 'pending' | 'success' | 'failed';
          processing_time_ms?: number | null;
          error_message?: string | null;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: 'info' | 'success' | 'warning' | 'error';
          is_read: boolean;
          metadata: any | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type?: 'info' | 'success' | 'warning' | 'error';
          is_read?: boolean;
          metadata?: any | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: 'info' | 'success' | 'warning' | 'error';
          is_read?: boolean;
          metadata?: any | null;
          created_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          agent_id: string;
          seeker_id: string;
          property_id: string;
          lead_score: number;
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
          notes: string | null;
          follow_up_date: string | null;
          ai_insights: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          agent_id: string;
          seeker_id: string;
          property_id: string;
          lead_score?: number;
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
          notes?: string | null;
          follow_up_date?: string | null;
          ai_insights?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          agent_id?: string;
          seeker_id?: string;
          property_id?: string;
          lead_score?: number;
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
          notes?: string | null;
          follow_up_date?: string | null;
          ai_insights?: any | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      payment_receipts: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          receipt_url: string;
          payment_method: string | null;
          transaction_id: string | null;
          status: 'pending' | 'approved' | 'rejected';
          admin_notes: string | null;
          approved_by: string | null;
          approved_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          receipt_url: string;
          payment_method?: string | null;
          transaction_id?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          admin_notes?: string | null;
          approved_by?: string | null;
          approved_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          receipt_url?: string;
          payment_method?: string | null;
          transaction_id?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          admin_notes?: string | null;
          approved_by?: string | null;
          approved_at?: string | null;
          created_at?: string;
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
      ai_whatsapp_responses: {
        Row: {
          id: string;
          lead_id: string;
          user_id: string;
          phone_number: string;
          message_content: string;
          ai_response: string;
          response_type: string;
          credits_used: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          user_id: string;
          phone_number: string;
          message_content: string;
          ai_response: string;
          response_type?: string;
          credits_used?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          user_id?: string;
          phone_number?: string;
          message_content?: string;
          ai_response?: string;
          response_type?: string;
          credits_used?: number;
          created_at?: string;
        };
      };
      ai_followups: {
        Row: {
          id: string;
          lead_id: string;
          agent_id: string;
          followup_message: string;
          followup_type: string;
          scheduled_date: string | null;
          is_sent: boolean;
          credits_used: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          agent_id: string;
          followup_message: string;
          followup_type?: string;
          scheduled_date?: string | null;
          is_sent?: boolean;
          credits_used?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          agent_id?: string;
          followup_message?: string;
          followup_type?: string;
          scheduled_date?: string | null;
          is_sent?: boolean;
          credits_used?: number;
          created_at?: string;
        };
      };
      ai_listing_suggestions: {
        Row: {
          id: string;
          listing_id: string;
          user_id: string;
          suggestion_type: string;
          original_content: string | null;
          suggested_content: string;
          is_applied: boolean;
          credits_used: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          user_id: string;
          suggestion_type: string;
          original_content?: string | null;
          suggested_content: string;
          is_applied?: boolean;
          credits_used?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          user_id?: string;
          suggestion_type?: string;
          original_content?: string | null;
          suggested_content?: string;
          is_applied?: boolean;
          credits_used?: number;
          created_at?: string;
        };
      };
      ai_listing_videos: {
        Row: {
          id: string;
          listing_id: string;
          user_id: string;
          video_url: string | null;
          thumbnail_url: string | null;
          status: 'generating' | 'completed' | 'failed';
          credits_used: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          user_id: string;
          video_url?: string | null;
          thumbnail_url?: string | null;
          status?: 'generating' | 'completed' | 'failed';
          credits_used?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          user_id?: string;
          video_url?: string | null;
          thumbnail_url?: string | null;
          status?: 'generating' | 'completed' | 'failed';
          credits_used?: number;
          created_at?: string;
        };
      };
      crm_lead_audit_logs: {
        Row: {
          id: string;
          lead_id: string;
          admin_id: string;
          action: string;
          old_values: any | null;
          new_values: any | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          admin_id: string;
          action: string;
          old_values?: any | null;
          new_values?: any | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          admin_id?: string;
          action?: string;
          old_values?: any | null;
          new_values?: any | null;
          notes?: string | null;
          created_at?: string;
        };
      };
      referral_invites: {
        Row: {
          id: string;
          inviter_id: string;
          invited_email: string;
          invited_phone: string | null;
          referral_code: string;
          status: 'pending' | 'completed' | 'expired';
          invited_user_id: string | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          inviter_id: string;
          invited_email: string;
          invited_phone?: string | null;
          referral_code: string;
          status?: 'pending' | 'completed' | 'expired';
          invited_user_id?: string | null;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          inviter_id?: string;
          invited_email?: string;
          invited_phone?: string | null;
          referral_code?: string;
          status?: 'pending' | 'completed' | 'expired';
          invited_user_id?: string | null;
          created_at?: string;
          completed_at?: string | null;
        };
      };
      referral_rewards: {
        Row: {
          id: string;
          inviter_id: string;
          invited_user_id: string;
          referral_invite_id: string;
          credits_awarded: number;
          reward_type: string;
          is_claimed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          inviter_id: string;
          invited_user_id: string;
          referral_invite_id: string;
          credits_awarded: number;
          reward_type?: string;
          is_claimed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          inviter_id?: string;
          invited_user_id?: string;
          referral_invite_id?: string;
          credits_awarded?: number;
          reward_type?: string;
          is_claimed?: boolean;
          created_at?: string;
        };
      };
      property_listings_extended: {
        Row: {
          id: string;
          listing_id: string;
          user_id: string;
          possession_date: string | null;
          carpet_area: number | null;
          builtup_area: number | null;
          furnishing: 'unfurnished' | 'semi-furnished' | 'furnished' | null;
          balconies: number;
          parking: number;
          brochure_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          user_id: string;
          possession_date?: string | null;
          carpet_area?: number | null;
          builtup_area?: number | null;
          furnishing?: 'unfurnished' | 'semi-furnished' | 'furnished' | null;
          balconies?: number;
          parking?: number;
          brochure_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          user_id?: string;
          possession_date?: string | null;
          carpet_area?: number | null;
          builtup_area?: number | null;
          furnishing?: 'unfurnished' | 'semi-furnished' | 'furnished' | null;
          balconies?: number;
          parking?: number;
          brochure_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      communication_logs: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          payload: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          payload?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          payload?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_video_previews: {
        Row: {
          id: string;
          listing_id: string;
          video_url: string | null;
          preview_image_url: string | null;
          status: 'generating' | 'completed' | 'failed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          video_url?: string | null;
          preview_image_url?: string | null;
          status?: 'generating' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          video_url?: string | null;
          preview_image_url?: string | null;
          status?: 'generating' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_tool_flags: {
        Row: {
          id: string;
          tool_name: string;
          is_enabled: boolean;
          last_updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tool_name: string;
          is_enabled?: boolean;
          last_updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tool_name?: string;
          is_enabled?: boolean;
          last_updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_resume_profiles: {
        Row: {
          id: string;
          user_id: string;
          resume_text: string | null;
          extracted_skills: string | null;
          matched_score: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          resume_text?: string | null;
          extracted_skills?: string | null;
          matched_score?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          resume_text?: string | null;
          extracted_skills?: string | null;
          matched_score?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      seo_jsonld_schemas: {
        Row: {
          id: string;
          listing_id: string;
          jsonld: string;
          generated_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          jsonld: string;
          generated_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          jsonld?: string;
          generated_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      agent_heatmaps: {
        Row: {
          id: string;
          agent_id: string;
          city: string;
          activity_score: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          agent_id: string;
          city: string;
          activity_score?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          agent_id?: string;
          city?: string;
          activity_score?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      crm_ai_trails: {
        Row: {
          id: string;
          lead_id: string;
          user_id: string;
          ai_tool: string;
          suggestion: string | null;
          credits_used: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          user_id: string;
          ai_tool: string;
          suggestion?: string | null;
          credits_used?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          user_id?: string;
          ai_tool?: string;
          suggestion?: string | null;
          credits_used?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      lead_scores: {
        Row: {
          id: string;
          lead_id: string;
          score: number;
          score_factors: string | null;
          calculated_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          score?: number;
          score_factors?: string | null;
          calculated_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          score?: number;
          score_factors?: string | null;
          calculated_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_listing_heatmaps: {
        Row: {
          id: string;
          listing_id: string;
          views_count: number;
          interest_score: number;
          engagement_rate: number;
          last_calculated: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          views_count?: number;
          interest_score?: number;
          engagement_rate?: number;
          last_calculated?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          views_count?: number;
          interest_score?: number;
          engagement_rate?: number;
          last_calculated?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_engagement_audit: {
        Row: {
          id: string;
          user_id: string;
          listing_id: string;
          action_type: string;
          interaction_data: string | null;
          session_id: string | null;
          duration_seconds: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          listing_id: string;
          action_type: string;
          interaction_data?: string | null;
          session_id?: string | null;
          duration_seconds?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          listing_id?: string;
          action_type?: string;
          interaction_data?: string | null;
          session_id?: string | null;
          duration_seconds?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      listing_offer_logs: {
        Row: {
          id: string;
          listing_id: string;
          offered_by: string;
          offer_amount: number;
          offer_status: 'pending' | 'accepted' | 'rejected' | 'expired';
          expires_at: string | null;
          response_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          offered_by: string;
          offer_amount: number;
          offer_status?: 'pending' | 'accepted' | 'rejected' | 'expired';
          expires_at?: string | null;
          response_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          offered_by?: string;
          offer_amount?: number;
          offer_status?: 'pending' | 'accepted' | 'rejected' | 'expired';
          expires_at?: string | null;
          response_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_negotiation_logs: {
        Row: {
          id: string;
          listing_id: string;
          seeker_id: string;
          agent_id: string;
          negotiation_step: string | null;
          ai_suggestion: string | null;
          user_response: string | null;
          step_outcome: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          seeker_id: string;
          agent_id: string;
          negotiation_step?: string | null;
          ai_suggestion?: string | null;
          user_response?: string | null;
          step_outcome?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          seeker_id?: string;
          agent_id?: string;
          negotiation_step?: string | null;
          ai_suggestion?: string | null;
          user_response?: string | null;
          step_outcome?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      agent_campaign_logs: {
        Row: {
          id: string;
          agent_id: string;
          campaign_name: string;
          campaign_type: 'whatsapp' | 'sms' | 'email';
          target_count: number;
          sent_count: number;
          response_count: number;
          campaign_status: 'draft' | 'active' | 'paused' | 'completed';
          started_at: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          agent_id: string;
          campaign_name: string;
          campaign_type: 'whatsapp' | 'sms' | 'email';
          target_count?: number;
          sent_count?: number;
          response_count?: number;
          campaign_status?: 'draft' | 'active' | 'paused' | 'completed';
          started_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          agent_id?: string;
          campaign_name?: string;
          campaign_type?: 'whatsapp' | 'sms' | 'email';
          target_count?: number;
          sent_count?: number;
          response_count?: number;
          campaign_status?: 'draft' | 'active' | 'paused' | 'completed';
          started_at?: string | null;
          completed_at?: string | null;
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
