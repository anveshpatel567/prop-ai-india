export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agent_campaign_logs: {
        Row: {
          agent_id: string | null
          campaign_name: string
          campaign_status: string | null
          campaign_type: string | null
          completed_at: string | null
          created_at: string | null
          id: string
          response_count: number | null
          sent_count: number | null
          started_at: string | null
          target_count: number | null
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          campaign_name: string
          campaign_status?: string | null
          campaign_type?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          response_count?: number | null
          sent_count?: number | null
          started_at?: string | null
          target_count?: number | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          campaign_name?: string
          campaign_status?: string | null
          campaign_type?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          response_count?: number | null
          sent_count?: number | null
          started_at?: string | null
          target_count?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_campaign_logs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_heatmaps: {
        Row: {
          activity_score: number | null
          agent_id: string | null
          city: string
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          activity_score?: number | null
          agent_id?: string | null
          city: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          activity_score?: number | null
          agent_id?: string | null
          city?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_heatmaps_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_match_requests: {
        Row: {
          ai_comment: string | null
          budget: number | null
          created_at: string | null
          id: string
          matched_agent_id: string | null
          notes: string | null
          preferred_city: string | null
          property_type: string | null
          seeker_id: string | null
          urgency_level: string | null
        }
        Insert: {
          ai_comment?: string | null
          budget?: number | null
          created_at?: string | null
          id?: string
          matched_agent_id?: string | null
          notes?: string | null
          preferred_city?: string | null
          property_type?: string | null
          seeker_id?: string | null
          urgency_level?: string | null
        }
        Update: {
          ai_comment?: string | null
          budget?: number | null
          created_at?: string | null
          id?: string
          matched_agent_id?: string | null
          notes?: string | null
          preferred_city?: string | null
          property_type?: string | null
          seeker_id?: string | null
          urgency_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_match_requests_matched_agent_id_fkey"
            columns: ["matched_agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_match_requests_seeker_id_fkey"
            columns: ["seeker_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_admin_audit_trail: {
        Row: {
          admin_id: string | null
          change_type: string
          changed_at: string | null
          id: string
          new_value: string | null
          previous_value: string | null
          tool_name: string
        }
        Insert: {
          admin_id?: string | null
          change_type: string
          changed_at?: string | null
          id?: string
          new_value?: string | null
          previous_value?: string | null
          tool_name: string
        }
        Update: {
          admin_id?: string | null
          change_type?: string
          changed_at?: string | null
          id?: string
          new_value?: string | null
          previous_value?: string | null
          tool_name?: string
        }
        Relationships: []
      }
      ai_admin_decision_logs: {
        Row: {
          action: string
          decided_at: string | null
          decided_by: string | null
          decision: string
          id: string
          module: string
        }
        Insert: {
          action: string
          decided_at?: string | null
          decided_by?: string | null
          decision: string
          id?: string
          module: string
        }
        Update: {
          action?: string
          decided_at?: string | null
          decided_by?: string | null
          decision?: string
          id?: string
          module?: string
        }
        Relationships: []
      }
      ai_autoresponse_feedback: {
        Row: {
          created_at: string | null
          feedback: string | null
          id: string
          message_id: string | null
          user_id: string | null
          was_helpful: boolean | null
        }
        Insert: {
          created_at?: string | null
          feedback?: string | null
          id?: string
          message_id?: string | null
          user_id?: string | null
          was_helpful?: boolean | null
        }
        Update: {
          created_at?: string | null
          feedback?: string | null
          id?: string
          message_id?: string | null
          user_id?: string | null
          was_helpful?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_autoresponse_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_behavior_exceptions: {
        Row: {
          approved_by: string | null
          context: string
          created_at: string | null
          id: string
          notes: string | null
          override_behavior: string
        }
        Insert: {
          approved_by?: string | null
          context: string
          created_at?: string | null
          id?: string
          notes?: string | null
          override_behavior: string
        }
        Update: {
          approved_by?: string | null
          context?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          override_behavior?: string
        }
        Relationships: []
      }
      ai_bias_detection_logs: {
        Row: {
          bias_detected: boolean | null
          detected_at: string | null
          detected_by: string | null
          id: string
          notes: string | null
          prompt: string
          result: string
        }
        Insert: {
          bias_detected?: boolean | null
          detected_at?: string | null
          detected_by?: string | null
          id?: string
          notes?: string | null
          prompt: string
          result: string
        }
        Update: {
          bias_detected?: boolean | null
          detected_at?: string | null
          detected_by?: string | null
          id?: string
          notes?: string | null
          prompt?: string
          result?: string
        }
        Relationships: []
      }
      ai_drift_detection_logs: {
        Row: {
          detected_at: string | null
          detection_method: string | null
          drift_score: number
          id: string
          model_version: string
        }
        Insert: {
          detected_at?: string | null
          detection_method?: string | null
          drift_score: number
          id?: string
          model_version: string
        }
        Update: {
          detected_at?: string | null
          detection_method?: string | null
          drift_score?: number
          id?: string
          model_version?: string
        }
        Relationships: []
      }
      ai_edge_invocation_logs: {
        Row: {
          created_at: string | null
          edge_function: string
          id: string
          invocation_time: string | null
          response_time_ms: number | null
          status_code: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          edge_function: string
          id?: string
          invocation_time?: string | null
          response_time_ms?: number | null
          status_code?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          edge_function?: string
          id?: string
          invocation_time?: string | null
          response_time_ms?: number | null
          status_code?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_edge_invocation_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_engagement_audit: {
        Row: {
          action_type: string
          created_at: string | null
          duration_seconds: number | null
          id: string
          interaction_data: string | null
          listing_id: string | null
          session_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          interaction_data?: string | null
          listing_id?: string | null
          session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          interaction_data?: string | null
          listing_id?: string | null
          session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_engagement_audit_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_engagement_audit_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_failure_event_logs: {
        Row: {
          created_at: string | null
          description: string | null
          failure_type: string
          id: string
          module: string
          occurred_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          failure_type: string
          id?: string
          module: string
          occurred_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          failure_type?: string
          id?: string
          module?: string
          occurred_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_failure_event_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_failure_logs: {
        Row: {
          error_message: string | null
          error_type: string
          failed_at: string | null
          feature: string
          id: string
          retry_attempted: boolean | null
          user_id: string | null
        }
        Insert: {
          error_message?: string | null
          error_type: string
          failed_at?: string | null
          feature: string
          id?: string
          retry_attempted?: boolean | null
          user_id?: string | null
        }
        Update: {
          error_message?: string | null
          error_type?: string
          failed_at?: string | null
          feature?: string
          id?: string
          retry_attempted?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_faq_generations: {
        Row: {
          context: string
          created_at: string | null
          faq_markdown: string
          generated_by: string | null
          id: string
        }
        Insert: {
          context: string
          created_at?: string | null
          faq_markdown: string
          generated_by?: string | null
          id?: string
        }
        Update: {
          context?: string
          created_at?: string | null
          faq_markdown?: string
          generated_by?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_faq_generations_generated_by_fkey"
            columns: ["generated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_feature_adoption_logs: {
        Row: {
          adopted_at: string | null
          adoption_status: string | null
          feature_name: string
          id: string
          reason: string | null
          user_id: string | null
        }
        Insert: {
          adopted_at?: string | null
          adoption_status?: string | null
          feature_name: string
          id?: string
          reason?: string | null
          user_id?: string | null
        }
        Update: {
          adopted_at?: string | null
          adoption_status?: string | null
          feature_name?: string
          id?: string
          reason?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_feature_adoption_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_feature_cooldowns: {
        Row: {
          cooldown_triggered_at: string | null
          duration_minutes: number
          feature: string
          id: string
          resolved: boolean | null
          user_id: string | null
        }
        Insert: {
          cooldown_triggered_at?: string | null
          duration_minutes: number
          feature: string
          id?: string
          resolved?: boolean | null
          user_id?: string | null
        }
        Update: {
          cooldown_triggered_at?: string | null
          duration_minutes?: number
          feature?: string
          id?: string
          resolved?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_feature_error_logs: {
        Row: {
          context: string | null
          created_at: string | null
          error_message: string | null
          id: string
          stack_trace: string | null
          tool_name: string
          user_id: string | null
        }
        Insert: {
          context?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          stack_trace?: string | null
          tool_name: string
          user_id?: string | null
        }
        Update: {
          context?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          stack_trace?: string | null
          tool_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_feature_error_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_feature_review_queue: {
        Row: {
          feature_name: string
          id: string
          issue_description: string
          review_notes: string | null
          reviewed: boolean | null
          severity: string
          submitted_at: string | null
          user_id: string | null
        }
        Insert: {
          feature_name: string
          id?: string
          issue_description: string
          review_notes?: string | null
          reviewed?: boolean | null
          severity: string
          submitted_at?: string | null
          user_id?: string | null
        }
        Update: {
          feature_name?: string
          id?: string
          issue_description?: string
          review_notes?: string | null
          reviewed?: boolean | null
          severity?: string
          submitted_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_feature_usage_heatmap: {
        Row: {
          feature: string
          hour_segment: number
          id: string
          logged_date: string
          usage_count: number
          user_role: string
        }
        Insert: {
          feature: string
          hour_segment: number
          id?: string
          logged_date?: string
          usage_count?: number
          user_role: string
        }
        Update: {
          feature?: string
          hour_segment?: number
          id?: string
          logged_date?: string
          usage_count?: number
          user_role?: string
        }
        Relationships: []
      }
      ai_feedback_tag_logs: {
        Row: {
          context_snippet: string | null
          feature_used: string
          id: string
          submitted_at: string | null
          tag: string
          user_id: string | null
        }
        Insert: {
          context_snippet?: string | null
          feature_used: string
          id?: string
          submitted_at?: string | null
          tag: string
          user_id?: string | null
        }
        Update: {
          context_snippet?: string | null
          feature_used?: string
          id?: string
          submitted_at?: string | null
          tag?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_feedback_tag_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_flagged_prompt_logs: {
        Row: {
          flagged_at: string | null
          id: string
          prompt: string
          reason: string
          severity: string
        }
        Insert: {
          flagged_at?: string | null
          id?: string
          prompt: string
          reason: string
          severity: string
        }
        Update: {
          flagged_at?: string | null
          id?: string
          prompt?: string
          reason?: string
          severity?: string
        }
        Relationships: []
      }
      ai_followup_reminders: {
        Row: {
          agent_id: string | null
          created_at: string | null
          id: string
          lead_id: string | null
          recommended_time: string
          reminder_text: string
          urgency_level: string
        }
        Insert: {
          agent_id?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          recommended_time: string
          reminder_text: string
          urgency_level: string
        }
        Update: {
          agent_id?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          recommended_time?: string
          reminder_text?: string
          urgency_level?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_followup_reminders_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_followup_reminders_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_followups: {
        Row: {
          agent_id: string | null
          created_at: string | null
          credits_used: number | null
          followup_message: string
          followup_type: string | null
          id: string
          is_sent: boolean | null
          lead_id: string | null
          scheduled_date: string | null
        }
        Insert: {
          agent_id?: string | null
          created_at?: string | null
          credits_used?: number | null
          followup_message: string
          followup_type?: string | null
          id?: string
          is_sent?: boolean | null
          lead_id?: string | null
          scheduled_date?: string | null
        }
        Update: {
          agent_id?: string | null
          created_at?: string | null
          credits_used?: number | null
          followup_message?: string
          followup_type?: string | null
          id?: string
          is_sent?: boolean | null
          lead_id?: string | null
          scheduled_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_followups_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_followups_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_form_fill_logs: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          fields_auto_filled: Json
          form_context: string
          id: string
          user_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          fields_auto_filled: Json
          form_context: string
          id?: string
          user_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          fields_auto_filled?: Json
          form_context?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_form_fill_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_hallucination_reports: {
        Row: {
          feature: string
          id: string
          report_text: string
          reported_at: string | null
          review_notes: string | null
          reviewed: boolean | null
          user_id: string | null
        }
        Insert: {
          feature: string
          id?: string
          report_text: string
          reported_at?: string | null
          review_notes?: string | null
          reviewed?: boolean | null
          user_id?: string | null
        }
        Update: {
          feature?: string
          id?: string
          report_text?: string
          reported_at?: string | null
          review_notes?: string | null
          reviewed?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_input_trace_logs: {
        Row: {
          feature_area: string
          id: string
          input_data: Json
          logged_at: string | null
          trace_level: string
          user_id: string | null
        }
        Insert: {
          feature_area: string
          id?: string
          input_data: Json
          logged_at?: string | null
          trace_level: string
          user_id?: string | null
        }
        Update: {
          feature_area?: string
          id?: string
          input_data?: Json
          logged_at?: string | null
          trace_level?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ai_interaction_logs: {
        Row: {
          action_type: string
          created_at: string | null
          credit_used: number | null
          id: string
          result_summary: string | null
          tool_name: string
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          credit_used?: number | null
          id?: string
          result_summary?: string | null
          tool_name: string
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          credit_used?: number | null
          id?: string
          result_summary?: string | null
          tool_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_interaction_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_latency_incident_logs: {
        Row: {
          created_at: string | null
          duration_ms: number
          feature_name: string
          id: string
          triggered_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          duration_ms: number
          feature_name: string
          id?: string
          triggered_at: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          duration_ms?: number
          feature_name?: string
          id?: string
          triggered_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ai_learning_feedback: {
        Row: {
          answer: string | null
          created_at: string | null
          helpful: boolean | null
          id: string
          module_name: string
          question: string | null
          submitted_at: string | null
          user_id: string | null
        }
        Insert: {
          answer?: string | null
          created_at?: string | null
          helpful?: boolean | null
          id?: string
          module_name: string
          question?: string | null
          submitted_at?: string | null
          user_id?: string | null
        }
        Update: {
          answer?: string | null
          created_at?: string | null
          helpful?: boolean | null
          id?: string
          module_name?: string
          question?: string | null
          submitted_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_learning_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_learning_iterations: {
        Row: {
          created_at: string | null
          domain: string
          id: string
          improvement_summary: string | null
          model_name: string
          triggered_by: string | null
        }
        Insert: {
          created_at?: string | null
          domain: string
          id?: string
          improvement_summary?: string | null
          model_name: string
          triggered_by?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string
          id?: string
          improvement_summary?: string | null
          model_name?: string
          triggered_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_learning_iterations_triggered_by_fkey"
            columns: ["triggered_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_lister_chat_summaries: {
        Row: {
          chat_thread_id: string
          created_at: string | null
          id: string
          lister_id: string | null
          summary_markdown: string
          summary_type: string
        }
        Insert: {
          chat_thread_id: string
          created_at?: string | null
          id?: string
          lister_id?: string | null
          summary_markdown: string
          summary_type: string
        }
        Update: {
          chat_thread_id?: string
          created_at?: string | null
          id?: string
          lister_id?: string | null
          summary_markdown?: string
          summary_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_lister_chat_summaries_lister_id_fkey"
            columns: ["lister_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_listing_heatmaps: {
        Row: {
          created_at: string | null
          engagement_rate: number | null
          id: string
          interest_score: number | null
          last_calculated: string | null
          listing_id: string | null
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          created_at?: string | null
          engagement_rate?: number | null
          id?: string
          interest_score?: number | null
          last_calculated?: string | null
          listing_id?: string | null
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          created_at?: string | null
          engagement_rate?: number | null
          id?: string
          interest_score?: number | null
          last_calculated?: string | null
          listing_id?: string | null
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_listing_heatmaps_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: true
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_listing_suggestions: {
        Row: {
          created_at: string | null
          credits_used: number | null
          id: string
          is_applied: boolean | null
          listing_id: string | null
          original_content: string | null
          suggested_content: string
          suggestion_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          credits_used?: number | null
          id?: string
          is_applied?: boolean | null
          listing_id?: string | null
          original_content?: string | null
          suggested_content: string
          suggestion_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          credits_used?: number | null
          id?: string
          is_applied?: boolean | null
          listing_id?: string | null
          original_content?: string | null
          suggested_content?: string
          suggestion_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_listing_suggestions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_listing_suggestions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_listing_uplift_logs: {
        Row: {
          action_taken: string | null
          created_at: string | null
          created_by: string | null
          id: string
          listing_id: string | null
          new_score: number | null
          old_score: number | null
          uplift_comment: string | null
        }
        Insert: {
          action_taken?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          listing_id?: string | null
          new_score?: number | null
          old_score?: number | null
          uplift_comment?: string | null
        }
        Update: {
          action_taken?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          listing_id?: string | null
          new_score?: number | null
          old_score?: number | null
          uplift_comment?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_listing_uplift_logs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_listing_uplift_logs_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_listing_videos: {
        Row: {
          created_at: string | null
          credits_used: number | null
          id: string
          listing_id: string | null
          status: string | null
          thumbnail_url: string | null
          user_id: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          credits_used?: number | null
          id?: string
          listing_id?: string | null
          status?: string | null
          thumbnail_url?: string | null
          user_id?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          credits_used?: number | null
          id?: string
          listing_id?: string | null
          status?: string | null
          thumbnail_url?: string | null
          user_id?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_listing_videos_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_listing_videos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_loan_queries: {
        Row: {
          created_at: string | null
          emi: number | null
          id: string
          income_monthly: number
          interest_rate: number
          loan_amount: number | null
          suggestion: string | null
          tenure_years: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          emi?: number | null
          id?: string
          income_monthly: number
          interest_rate: number
          loan_amount?: number | null
          suggestion?: string | null
          tenure_years: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          emi?: number | null
          id?: string
          income_monthly?: number
          interest_rate?: number
          loan_amount?: number | null
          suggestion?: string | null
          tenure_years?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_loan_queries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_locality_reports: {
        Row: {
          city: string | null
          created_at: string | null
          id: string
          locality: string
          report_markdown: string | null
          user_id: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          id?: string
          locality: string
          report_markdown?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          id?: string
          locality?: string
          report_markdown?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_locality_reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_manual_review_flags: {
        Row: {
          flagged_at: string | null
          flagged_by: string | null
          id: string
          reason: string
          source_id: string
          source_table: string
        }
        Insert: {
          flagged_at?: string | null
          flagged_by?: string | null
          id?: string
          reason: string
          source_id: string
          source_table: string
        }
        Update: {
          flagged_at?: string | null
          flagged_by?: string | null
          id?: string
          reason?: string
          source_id?: string
          source_table?: string
        }
        Relationships: []
      }
      ai_market_pressure_logs: {
        Row: {
          data_scope: string
          generated_at: string | null
          id: string
          locality_id: string | null
          pressure_type: string
          reasoning: string
        }
        Insert: {
          data_scope: string
          generated_at?: string | null
          id?: string
          locality_id?: string | null
          pressure_type: string
          reasoning: string
        }
        Update: {
          data_scope?: string
          generated_at?: string | null
          id?: string
          locality_id?: string | null
          pressure_type?: string
          reasoning?: string
        }
        Relationships: []
      }
      ai_model_downtime_logs: {
        Row: {
          created_by: string | null
          downtime_reason: string | null
          id: string
          model_name: string
          resolved_at: string | null
          started_at: string
        }
        Insert: {
          created_by?: string | null
          downtime_reason?: string | null
          id?: string
          model_name: string
          resolved_at?: string | null
          started_at: string
        }
        Update: {
          created_by?: string | null
          downtime_reason?: string | null
          id?: string
          model_name?: string
          resolved_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      ai_model_version_logs: {
        Row: {
          feature_area: string
          id: string
          model_name: string
          notes: string | null
          timestamp: string | null
          version: string
        }
        Insert: {
          feature_area: string
          id?: string
          model_name: string
          notes?: string | null
          timestamp?: string | null
          version: string
        }
        Update: {
          feature_area?: string
          id?: string
          model_name?: string
          notes?: string | null
          timestamp?: string | null
          version?: string
        }
        Relationships: []
      }
      ai_moderator_actions: {
        Row: {
          action_taken: string
          decided_at: string | null
          decision: string
          id: string
          moderator_id: string | null
          notes: string | null
          target_id: string
          target_table: string
        }
        Insert: {
          action_taken: string
          decided_at?: string | null
          decision: string
          id?: string
          moderator_id?: string | null
          notes?: string | null
          target_id: string
          target_table: string
        }
        Update: {
          action_taken?: string
          decided_at?: string | null
          decision?: string
          id?: string
          moderator_id?: string | null
          notes?: string | null
          target_id?: string
          target_table?: string
        }
        Relationships: []
      }
      ai_negotiation_logs: {
        Row: {
          agent_id: string | null
          ai_suggestion: string | null
          created_at: string | null
          id: string
          listing_id: string | null
          negotiation_step: string | null
          seeker_id: string | null
          step_outcome: string | null
          updated_at: string | null
          user_response: string | null
        }
        Insert: {
          agent_id?: string | null
          ai_suggestion?: string | null
          created_at?: string | null
          id?: string
          listing_id?: string | null
          negotiation_step?: string | null
          seeker_id?: string | null
          step_outcome?: string | null
          updated_at?: string | null
          user_response?: string | null
        }
        Update: {
          agent_id?: string | null
          ai_suggestion?: string | null
          created_at?: string | null
          id?: string
          listing_id?: string | null
          negotiation_step?: string | null
          seeker_id?: string | null
          step_outcome?: string | null
          updated_at?: string | null
          user_response?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_negotiation_logs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_negotiation_logs_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_negotiation_logs_seeker_id_fkey"
            columns: ["seeker_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_output_influence_logs: {
        Row: {
          feature_name: string
          id: string
          influence_weights: number[]
          influencing_factors: string[]
          output_summary: string
          recorded_at: string | null
          user_id: string | null
        }
        Insert: {
          feature_name: string
          id?: string
          influence_weights: number[]
          influencing_factors: string[]
          output_summary: string
          recorded_at?: string | null
          user_id?: string | null
        }
        Update: {
          feature_name?: string
          id?: string
          influence_weights?: number[]
          influencing_factors?: string[]
          output_summary?: string
          recorded_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_output_quality_ratings: {
        Row: {
          comments: string | null
          feature_name: string
          id: string
          rated_at: string | null
          rating: number
          user_id: string | null
        }
        Insert: {
          comments?: string | null
          feature_name: string
          id?: string
          rated_at?: string | null
          rating: number
          user_id?: string | null
        }
        Update: {
          comments?: string | null
          feature_name?: string
          id?: string
          rated_at?: string | null
          rating?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_output_quality_ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_performance_evaluations: {
        Row: {
          ai_module: string
          evaluated_at: string | null
          evaluated_by: string | null
          evaluation_context: string | null
          feedback: string | null
          id: string
          quality_score: number | null
        }
        Insert: {
          ai_module: string
          evaluated_at?: string | null
          evaluated_by?: string | null
          evaluation_context?: string | null
          feedback?: string | null
          id?: string
          quality_score?: number | null
        }
        Update: {
          ai_module?: string
          evaluated_at?: string | null
          evaluated_by?: string | null
          evaluation_context?: string | null
          feedback?: string | null
          id?: string
          quality_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_performance_evaluations_evaluated_by_fkey"
            columns: ["evaluated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_personalization_feedback: {
        Row: {
          created_at: string | null
          feature_name: string
          feedback_notes: string | null
          feedback_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          feature_name: string
          feedback_notes?: string | null
          feedback_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          feature_name?: string
          feedback_notes?: string | null
          feedback_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_personalization_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_pricing_feedback_logs: {
        Row: {
          ai_price_suggested: number | null
          created_at: string | null
          feedback_text: string | null
          id: string
          lister_id: string | null
          listing_id: string | null
          rejection_reason: string | null
          user_accepted: boolean | null
        }
        Insert: {
          ai_price_suggested?: number | null
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          lister_id?: string | null
          listing_id?: string | null
          rejection_reason?: string | null
          user_accepted?: boolean | null
        }
        Update: {
          ai_price_suggested?: number | null
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          lister_id?: string | null
          listing_id?: string | null
          rejection_reason?: string | null
          user_accepted?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_pricing_feedback_logs_lister_id_fkey"
            columns: ["lister_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_pricing_feedback_logs_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_prompt_drift_logs: {
        Row: {
          drift_detected_at: string | null
          expected_behavior: string
          feature: string
          id: string
          observed_behavior: string
          reported_by: string | null
          resolved: boolean | null
        }
        Insert: {
          drift_detected_at?: string | null
          expected_behavior: string
          feature: string
          id?: string
          observed_behavior: string
          reported_by?: string | null
          resolved?: boolean | null
        }
        Update: {
          drift_detected_at?: string | null
          expected_behavior?: string
          feature?: string
          id?: string
          observed_behavior?: string
          reported_by?: string | null
          resolved?: boolean | null
        }
        Relationships: []
      }
      ai_prompt_regen_logs: {
        Row: {
          feature: string
          id: string
          regenerated_at: string | null
          regenerated_from_prompt: string | null
          user_id: string | null
        }
        Insert: {
          feature: string
          id?: string
          regenerated_at?: string | null
          regenerated_from_prompt?: string | null
          user_id?: string | null
        }
        Update: {
          feature?: string
          id?: string
          regenerated_at?: string | null
          regenerated_from_prompt?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_prompt_tags: {
        Row: {
          feature_area: string
          id: string
          prompt_id: string
          tagged_at: string | null
          tagged_by: string | null
          tags: string[]
        }
        Insert: {
          feature_area: string
          id?: string
          prompt_id: string
          tagged_at?: string | null
          tagged_by?: string | null
          tags: string[]
        }
        Update: {
          feature_area?: string
          id?: string
          prompt_id?: string
          tagged_at?: string | null
          tagged_by?: string | null
          tags?: string[]
        }
        Relationships: []
      }
      ai_prompt_templates: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          id: string
          template: string
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          template: string
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          template?: string
          title?: string
        }
        Relationships: []
      }
      ai_prompt_tuning_logs: {
        Row: {
          admin_id: string | null
          ai_module: string
          id: string
          new_prompt: string
          old_prompt: string
          reason_for_change: string | null
          tuned_at: string | null
        }
        Insert: {
          admin_id?: string | null
          ai_module: string
          id?: string
          new_prompt: string
          old_prompt: string
          reason_for_change?: string | null
          tuned_at?: string | null
        }
        Update: {
          admin_id?: string | null
          ai_module?: string
          id?: string
          new_prompt?: string
          old_prompt?: string
          reason_for_change?: string | null
          tuned_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_prompt_tuning_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_property_matches: {
        Row: {
          created_at: string | null
          explanation: string | null
          id: string
          listing_id: string | null
          match_score: number
          seeker_id: string | null
        }
        Insert: {
          created_at?: string | null
          explanation?: string | null
          id?: string
          listing_id?: string | null
          match_score: number
          seeker_id?: string | null
        }
        Update: {
          created_at?: string | null
          explanation?: string | null
          id?: string
          listing_id?: string | null
          match_score?: number
          seeker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_property_matches_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_property_matches_seeker_id_fkey"
            columns: ["seeker_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_recommendation_override_logs: {
        Row: {
          created_at: string | null
          feature_area: string
          final_user_input: string
          id: string
          original_ai_suggestion: string
          override_reason: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          feature_area: string
          final_user_input: string
          id?: string
          original_ai_suggestion: string
          override_reason?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          feature_area?: string
          final_user_input?: string
          id?: string
          original_ai_suggestion?: string
          override_reason?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_recommendation_override_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_recommender_optimizations: {
        Row: {
          affected_feature: string
          applied_at: string | null
          id: string
          model_version: string
          notes: string | null
          optimization_type: string
          user_id: string | null
        }
        Insert: {
          affected_feature: string
          applied_at?: string | null
          id?: string
          model_version: string
          notes?: string | null
          optimization_type: string
          user_id?: string | null
        }
        Update: {
          affected_feature?: string
          applied_at?: string | null
          id?: string
          model_version?: string
          notes?: string | null
          optimization_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_recommender_optimizations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_response_quality_logs: {
        Row: {
          critique: string | null
          evaluated_at: string | null
          feature_context: string
          id: string
          quality_score: number
          response_text: string
          user_id: string | null
        }
        Insert: {
          critique?: string | null
          evaluated_at?: string | null
          feature_context: string
          id?: string
          quality_score: number
          response_text: string
          user_id?: string | null
        }
        Update: {
          critique?: string | null
          evaluated_at?: string | null
          feature_context?: string
          id?: string
          quality_score?: number
          response_text?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_response_quality_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_restricted_input_logs: {
        Row: {
          id: string
          input_text: string
          rejected_at: string | null
          restriction_reason: string
        }
        Insert: {
          id?: string
          input_text: string
          rejected_at?: string | null
          restriction_reason: string
        }
        Update: {
          id?: string
          input_text?: string
          rejected_at?: string | null
          restriction_reason?: string
        }
        Relationships: []
      }
      ai_resume_profiles: {
        Row: {
          created_at: string | null
          extracted_skills: string | null
          id: string
          matched_score: number | null
          resume_text: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          extracted_skills?: string | null
          id?: string
          matched_score?: number | null
          resume_text?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          extracted_skills?: string | null
          id?: string
          matched_score?: number | null
          resume_text?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_resume_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_resumes: {
        Row: {
          city: string | null
          created_at: string | null
          experience_years: number | null
          id: string
          name: string
          past_projects: string | null
          resume_markdown: string | null
          specialization: string | null
          strengths: string | null
          user_id: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          experience_years?: number | null
          id?: string
          name: string
          past_projects?: string | null
          resume_markdown?: string | null
          specialization?: string | null
          strengths?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          experience_years?: number | null
          id?: string
          name?: string
          past_projects?: string | null
          resume_markdown?: string | null
          specialization?: string | null
          strengths?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_resumes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_search_history: {
        Row: {
          ai_interpretation: Json | null
          created_at: string | null
          credits_used: number | null
          filters_applied: Json | null
          id: string
          results_count: number | null
          search_query: string
          user_id: string | null
        }
        Insert: {
          ai_interpretation?: Json | null
          created_at?: string | null
          credits_used?: number | null
          filters_applied?: Json | null
          id?: string
          results_count?: number | null
          search_query: string
          user_id?: string | null
        }
        Update: {
          ai_interpretation?: Json | null
          created_at?: string | null
          credits_used?: number | null
          filters_applied?: Json | null
          id?: string
          results_count?: number | null
          search_query?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_search_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_search_rerankings: {
        Row: {
          created_at: string | null
          id: string
          original_query: string
          reason_summary: string | null
          reranked_results: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          original_query: string
          reason_summary?: string | null
          reranked_results: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          original_query?: string
          reason_summary?: string | null
          reranked_results?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_search_rerankings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_seeker_behavior_logs: {
        Row: {
          behavior_data: Json
          behavior_type: string
          created_at: string | null
          id: string
          inferred_preference: string | null
          seeker_id: string | null
        }
        Insert: {
          behavior_data: Json
          behavior_type: string
          created_at?: string | null
          id?: string
          inferred_preference?: string | null
          seeker_id?: string | null
        }
        Update: {
          behavior_data?: Json
          behavior_type?: string
          created_at?: string | null
          id?: string
          inferred_preference?: string | null
          seeker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_seeker_behavior_logs_seeker_id_fkey"
            columns: ["seeker_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_sentiment_feedback_logs: {
        Row: {
          feature: string
          feedback: string | null
          id: string
          sentiment: string
          submitted_at: string | null
          user_id: string | null
        }
        Insert: {
          feature: string
          feedback?: string | null
          id?: string
          sentiment: string
          submitted_at?: string | null
          user_id?: string | null
        }
        Update: {
          feature?: string
          feedback?: string | null
          id?: string
          sentiment?: string
          submitted_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_tool_attribution_logs: {
        Row: {
          context_info: string | null
          feature_area: string
          id: string
          invoked_at: string | null
          invoked_by: string | null
          tool_name: string
        }
        Insert: {
          context_info?: string | null
          feature_area: string
          id?: string
          invoked_at?: string | null
          invoked_by?: string | null
          tool_name: string
        }
        Update: {
          context_info?: string | null
          feature_area?: string
          id?: string
          invoked_at?: string | null
          invoked_by?: string | null
          tool_name?: string
        }
        Relationships: []
      }
      ai_tool_flags: {
        Row: {
          created_at: string | null
          id: string
          is_enabled: boolean | null
          last_updated_by: string | null
          tool_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          last_updated_by?: string | null
          tool_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          last_updated_by?: string | null
          tool_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_tool_flags_last_updated_by_fkey"
            columns: ["last_updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_tool_transactions: {
        Row: {
          created_at: string | null
          credit_cost: number
          error_message: string | null
          id: string
          input_data: Json | null
          output_data: Json | null
          processing_time_ms: number | null
          status: string | null
          tool_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          credit_cost: number
          error_message?: string | null
          id?: string
          input_data?: Json | null
          output_data?: Json | null
          processing_time_ms?: number | null
          status?: string | null
          tool_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          credit_cost?: number
          error_message?: string | null
          id?: string
          input_data?: Json | null
          output_data?: Json | null
          processing_time_ms?: number | null
          status?: string | null
          tool_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_tool_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_toxicity_detection_logs: {
        Row: {
          detected_at: string | null
          flagged: boolean | null
          id: string
          prompt: string
          toxicity_score: number
        }
        Insert: {
          detected_at?: string | null
          flagged?: boolean | null
          id?: string
          prompt: string
          toxicity_score: number
        }
        Update: {
          detected_at?: string | null
          flagged?: boolean | null
          id?: string
          prompt?: string
          toxicity_score?: number
        }
        Relationships: []
      }
      ai_toxicity_flags: {
        Row: {
          content_snippet: string
          flagged_at: string | null
          id: string
          reviewed: boolean | null
          reviewer_notes: string | null
          severity: string | null
          user_id: string | null
        }
        Insert: {
          content_snippet: string
          flagged_at?: string | null
          id?: string
          reviewed?: boolean | null
          reviewer_notes?: string | null
          severity?: string | null
          user_id?: string | null
        }
        Update: {
          content_snippet?: string
          flagged_at?: string | null
          id?: string
          reviewed?: boolean | null
          reviewer_notes?: string | null
          severity?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_ui_attention_heatmaps: {
        Row: {
          attention_map: Json
          created_at: string | null
          device_type: string
          id: string
          page_path: string
          session_id: string
          user_id: string | null
        }
        Insert: {
          attention_map: Json
          created_at?: string | null
          device_type: string
          id?: string
          page_path: string
          session_id: string
          user_id?: string | null
        }
        Update: {
          attention_map?: Json
          created_at?: string | null
          device_type?: string
          id?: string
          page_path?: string
          session_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_ui_attention_heatmaps_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_usage_anomaly_logs: {
        Row: {
          anomaly_type: string
          created_at: string | null
          id: string
          module: string
          observed_at: string
          usage_count: number
          user_id: string | null
        }
        Insert: {
          anomaly_type: string
          created_at?: string | null
          id?: string
          module: string
          observed_at: string
          usage_count: number
          user_id?: string | null
        }
        Update: {
          anomaly_type?: string
          created_at?: string | null
          id?: string
          module?: string
          observed_at?: string
          usage_count?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_anomaly_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_usage_frequency_logs: {
        Row: {
          feature: string
          id: string
          logged_date: string | null
          usage_count: number | null
          user_id: string | null
        }
        Insert: {
          feature: string
          id?: string
          logged_date?: string | null
          usage_count?: number | null
          user_id?: string | null
        }
        Update: {
          feature?: string
          id?: string
          logged_date?: string | null
          usage_count?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_user_badges: {
        Row: {
          badge_level: string
          badge_name: string
          badge_type: string
          id: string
          unlocked_at: string | null
          user_id: string | null
        }
        Insert: {
          badge_level: string
          badge_name: string
          badge_type: string
          id?: string
          unlocked_at?: string | null
          user_id?: string | null
        }
        Update: {
          badge_level?: string
          badge_name?: string
          badge_type?: string
          id?: string
          unlocked_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_user_correction_logs: {
        Row: {
          approved: boolean | null
          created_at: string | null
          feature: string
          id: string
          reviewed: boolean | null
          suggested_text: string
          user_id: string | null
        }
        Insert: {
          approved?: boolean | null
          created_at?: string | null
          feature: string
          id?: string
          reviewed?: boolean | null
          suggested_text: string
          user_id?: string | null
        }
        Update: {
          approved?: boolean | null
          created_at?: string | null
          feature?: string
          id?: string
          reviewed?: boolean | null
          suggested_text?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ai_video_previews: {
        Row: {
          created_at: string | null
          id: string
          listing_id: string | null
          preview_image_url: string | null
          status: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          listing_id?: string | null
          preview_image_url?: string | null
          status?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          listing_id?: string | null
          preview_image_url?: string | null
          status?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_video_previews_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_visibility_tracking_logs: {
        Row: {
          ai_feature: string
          id: string
          interaction_taken: boolean | null
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          ai_feature: string
          id?: string
          interaction_taken?: boolean | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          ai_feature?: string
          id?: string
          interaction_taken?: boolean | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_visibility_tracking_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_whatsapp_responses: {
        Row: {
          ai_response: string
          created_at: string | null
          credits_used: number | null
          id: string
          lead_id: string | null
          message_content: string
          phone_number: string
          response_type: string | null
          user_id: string | null
        }
        Insert: {
          ai_response: string
          created_at?: string | null
          credits_used?: number | null
          id?: string
          lead_id?: string | null
          message_content: string
          phone_number: string
          response_type?: string | null
          user_id?: string | null
        }
        Update: {
          ai_response?: string
          created_at?: string | null
          credits_used?: number | null
          id?: string
          lead_id?: string | null
          message_content?: string
          phone_number?: string
          response_type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_whatsapp_responses_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_whatsapp_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      api_rate_limits: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          requests_count: number | null
          user_id: string | null
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          requests_count?: number | null
          user_id?: string | null
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          requests_count?: number | null
          user_id?: string | null
          window_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_rate_limits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      auth_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          is_active: boolean | null
          session_token: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          is_active?: boolean | null
          session_token: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          is_active?: boolean | null
          session_token?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auth_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_reports: {
        Row: {
          clicks: number | null
          created_at: string | null
          ctr: number | null
          id: string
          last_interaction_at: string | null
          offer_id: string | null
          views: number | null
        }
        Insert: {
          clicks?: number | null
          created_at?: string | null
          ctr?: number | null
          id?: string
          last_interaction_at?: string | null
          offer_id?: string | null
          views?: number | null
        }
        Update: {
          clicks?: number | null
          created_at?: string | null
          ctr?: number | null
          id?: string
          last_interaction_at?: string | null
          offer_id?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_reports_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "listing_offers"
            referencedColumns: ["id"]
          },
        ]
      }
      communication_logs: {
        Row: {
          created_at: string | null
          id: string
          payload: string | null
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          payload?: string | null
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          payload?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communication_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_packs: {
        Row: {
          created_at: string | null
          credits: number
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          price_inr: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          credits: number
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          price_inr: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          credits?: number
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_inr?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      crm_ai_trails: {
        Row: {
          ai_tool: string
          created_at: string | null
          credits_used: number | null
          id: string
          lead_id: string | null
          suggestion: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          ai_tool: string
          created_at?: string | null
          credits_used?: number | null
          id?: string
          lead_id?: string | null
          suggestion?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          ai_tool?: string
          created_at?: string | null
          credits_used?: number | null
          id?: string
          lead_id?: string | null
          suggestion?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_ai_trails_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_ai_trails_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_interactions: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          interaction_date: string | null
          interaction_type: string
          lead_id: string | null
          next_action: string | null
          outcome: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          interaction_date?: string | null
          interaction_type: string
          lead_id?: string | null
          next_action?: string | null
          outcome?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          interaction_date?: string | null
          interaction_type?: string
          lead_id?: string | null
          next_action?: string | null
          outcome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_interactions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_lead_audit_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string | null
          id: string
          lead_id: string | null
          new_values: Json | null
          notes: string | null
          old_values: Json | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          new_values?: Json | null
          notes?: string | null
          old_values?: Json | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          new_values?: Json | null
          notes?: string | null
          old_values?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_lead_audit_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_lead_audit_logs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_scores: {
        Row: {
          calculated_at: string | null
          created_at: string | null
          id: string
          lead_id: string | null
          score: number | null
          score_factors: string | null
          updated_at: string | null
        }
        Insert: {
          calculated_at?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          score?: number | null
          score_factors?: string | null
          updated_at?: string | null
        }
        Update: {
          calculated_at?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          score?: number | null
          score_factors?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_scores_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: true
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          agent_id: string | null
          ai_insights: Json | null
          created_at: string | null
          follow_up_date: string | null
          id: string
          lead_score: number | null
          notes: string | null
          property_id: string | null
          seeker_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          ai_insights?: Json | null
          created_at?: string | null
          follow_up_date?: string | null
          id?: string
          lead_score?: number | null
          notes?: string | null
          property_id?: string | null
          seeker_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          ai_insights?: Json | null
          created_at?: string | null
          follow_up_date?: string | null
          id?: string
          lead_score?: number | null
          notes?: string | null
          property_id?: string | null
          seeker_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_seeker_id_fkey"
            columns: ["seeker_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_categories: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          parent_id: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          parent_id?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          parent_id?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listing_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "listing_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_conditions: {
        Row: {
          applies_to_category_id: string | null
          created_at: string | null
          display_order: number | null
          id: string
          input_type: string
          is_required: boolean | null
          label: string
          options: Json | null
          updated_at: string | null
        }
        Insert: {
          applies_to_category_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          input_type: string
          is_required?: boolean | null
          label: string
          options?: Json | null
          updated_at?: string | null
        }
        Update: {
          applies_to_category_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          input_type?: string
          is_required?: boolean | null
          label?: string
          options?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listing_conditions_applies_to_category_id_fkey"
            columns: ["applies_to_category_id"]
            isOneToOne: false
            referencedRelation: "listing_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_offer_logs: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          listing_id: string | null
          offer_amount: number | null
          offer_status: string | null
          offered_by: string | null
          response_message: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          listing_id?: string | null
          offer_amount?: number | null
          offer_status?: string | null
          offered_by?: string | null
          response_message?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          listing_id?: string | null
          offer_amount?: number | null
          offer_status?: string | null
          offered_by?: string | null
          response_message?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listing_offer_logs_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_offer_logs_offered_by_fkey"
            columns: ["offered_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_offers: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          discount_amount: number | null
          expiry_at: string | null
          id: string
          listing_id: string | null
          offer_type: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          discount_amount?: number | null
          expiry_at?: string | null
          id?: string
          listing_id?: string | null
          offer_type?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          discount_amount?: number | null
          expiry_at?: string | null
          id?: string
          listing_id?: string | null
          offer_type?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listing_offers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_offers_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          ai_generated_title: boolean | null
          ai_parsed_data: Json | null
          amenities: Json | null
          area_sqft: number | null
          bathrooms: number | null
          bedrooms: number | null
          city: string
          created_at: string | null
          description: string | null
          google_maps_pin: string
          id: string
          is_rera_verified: boolean | null
          listing_type: string
          locality: string | null
          photos: Json | null
          price: number
          property_type: string
          rera_number: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          ai_generated_title?: boolean | null
          ai_parsed_data?: Json | null
          amenities?: Json | null
          area_sqft?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          created_at?: string | null
          description?: string | null
          google_maps_pin: string
          id?: string
          is_rera_verified?: boolean | null
          listing_type: string
          locality?: string | null
          photos?: Json | null
          price: number
          property_type: string
          rera_number?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          ai_generated_title?: boolean | null
          ai_parsed_data?: Json | null
          amenities?: Json | null
          area_sqft?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          created_at?: string | null
          description?: string | null
          google_maps_pin?: string
          id?: string
          is_rera_verified?: boolean | null
          listing_type?: string
          locality?: string | null
          photos?: Json | null
          price?: number
          property_type?: string
          rera_number?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      parsed_brochures: {
        Row: {
          ai_model_used: string | null
          confidence_score: number | null
          created_at: string | null
          credits_used: number | null
          error_message: string | null
          id: string
          listing_id: string | null
          original_file_url: string
          parsed_data: Json | null
          processing_time_ms: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          ai_model_used?: string | null
          confidence_score?: number | null
          created_at?: string | null
          credits_used?: number | null
          error_message?: string | null
          id?: string
          listing_id?: string | null
          original_file_url: string
          parsed_data?: Json | null
          processing_time_ms?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          ai_model_used?: string | null
          confidence_score?: number | null
          created_at?: string | null
          credits_used?: number | null
          error_message?: string | null
          id?: string
          listing_id?: string | null
          original_file_url?: string
          parsed_data?: Json | null
          processing_time_ms?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parsed_brochures_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parsed_brochures_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_receipts: {
        Row: {
          admin_notes: string | null
          amount: number
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          id: string
          payment_method: string | null
          receipt_url: string
          status: string | null
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          id?: string
          payment_method?: string | null
          receipt_url: string
          status?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          id?: string
          payment_method?: string | null
          receipt_url?: string
          status?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_receipts_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_receipts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      property_inquiries: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          inquirer_id: string | null
          listing_id: string | null
          message: string
          phone: string | null
          preferred_contact_time: string | null
          responded_at: string | null
          response: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          inquirer_id?: string | null
          listing_id?: string | null
          message: string
          phone?: string | null
          preferred_contact_time?: string | null
          responded_at?: string | null
          response?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          inquirer_id?: string | null
          listing_id?: string | null
          message?: string
          phone?: string | null
          preferred_contact_time?: string | null
          responded_at?: string | null
          response?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_inquiries_inquirer_id_fkey"
            columns: ["inquirer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_inquiries_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      property_listings_extended: {
        Row: {
          balconies: number | null
          brochure_url: string | null
          builtup_area: number | null
          carpet_area: number | null
          created_at: string | null
          furnishing: string | null
          id: string
          listing_id: string | null
          parking: number | null
          possession_date: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          balconies?: number | null
          brochure_url?: string | null
          builtup_area?: number | null
          carpet_area?: number | null
          created_at?: string | null
          furnishing?: string | null
          id?: string
          listing_id?: string | null
          parking?: number | null
          possession_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          balconies?: number | null
          brochure_url?: string | null
          builtup_area?: number | null
          carpet_area?: number | null
          created_at?: string | null
          furnishing?: string | null
          id?: string
          listing_id?: string | null
          parking?: number | null
          possession_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_listings_extended_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_listings_extended_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      property_views: {
        Row: {
          created_at: string | null
          id: string
          listing_id: string | null
          referrer: string | null
          user_agent: string | null
          view_duration: number | null
          viewer_id: string | null
          viewer_ip: unknown | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          listing_id?: string | null
          referrer?: string | null
          user_agent?: string | null
          view_duration?: number | null
          viewer_id?: string | null
          viewer_ip?: unknown | null
        }
        Update: {
          created_at?: string | null
          id?: string
          listing_id?: string | null
          referrer?: string | null
          user_agent?: string | null
          view_duration?: number | null
          viewer_id?: string | null
          viewer_ip?: unknown | null
        }
        Relationships: [
          {
            foreignKeyName: "property_views_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_views_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_invites: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          invited_email: string
          invited_phone: string | null
          invited_user_id: string | null
          inviter_id: string | null
          referral_code: string
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          invited_email: string
          invited_phone?: string | null
          invited_user_id?: string | null
          inviter_id?: string | null
          referral_code: string
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          invited_email?: string
          invited_phone?: string | null
          invited_user_id?: string | null
          inviter_id?: string | null
          referral_code?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_invites_invited_user_id_fkey"
            columns: ["invited_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_invites_inviter_id_fkey"
            columns: ["inviter_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_rewards: {
        Row: {
          created_at: string | null
          credits_awarded: number
          id: string
          invited_user_id: string | null
          inviter_id: string | null
          is_claimed: boolean | null
          referral_invite_id: string | null
          reward_type: string | null
        }
        Insert: {
          created_at?: string | null
          credits_awarded: number
          id?: string
          invited_user_id?: string | null
          inviter_id?: string | null
          is_claimed?: boolean | null
          referral_invite_id?: string | null
          reward_type?: string | null
        }
        Update: {
          created_at?: string | null
          credits_awarded?: number
          id?: string
          invited_user_id?: string | null
          inviter_id?: string | null
          is_claimed?: boolean | null
          referral_invite_id?: string | null
          reward_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_rewards_invited_user_id_fkey"
            columns: ["invited_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_rewards_inviter_id_fkey"
            columns: ["inviter_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_rewards_referral_invite_id_fkey"
            columns: ["referral_invite_id"]
            isOneToOne: false
            referencedRelation: "referral_invites"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_properties: {
        Row: {
          created_at: string | null
          id: string
          listing_id: string | null
          notes: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          listing_id?: string | null
          notes?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          listing_id?: string | null
          notes?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_properties_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_properties_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_jsonld_schemas: {
        Row: {
          created_at: string | null
          generated_at: string | null
          id: string
          jsonld: string
          listing_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          generated_at?: string | null
          id?: string
          jsonld: string
          listing_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          generated_at?: string | null
          id?: string
          jsonld?: string
          listing_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seo_jsonld_schemas_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_schemas: {
        Row: {
          created_at: string | null
          generated_by: string | null
          id: string
          jsonld: string
          listing_id: string | null
        }
        Insert: {
          created_at?: string | null
          generated_by?: string | null
          id?: string
          jsonld: string
          listing_id?: string | null
        }
        Update: {
          created_at?: string | null
          generated_by?: string | null
          id?: string
          jsonld?: string
          listing_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seo_schemas_generated_by_fkey"
            columns: ["generated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_schemas_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      title_chain_events: {
        Row: {
          created_at: string | null
          description: string | null
          event_date: string | null
          event_label: string
          id: string
          listing_id: string | null
          recorded_by: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          event_label: string
          id?: string
          listing_id?: string | null
          recorded_by?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          event_label?: string
          id?: string
          listing_id?: string | null
          recorded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "title_chain_events_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "title_chain_events_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ui_button_controls: {
        Row: {
          allowed_variants: string[]
          fallback_variant: string
          id: string
          page_slug: string
          updated_at: string | null
        }
        Insert: {
          allowed_variants?: string[]
          fallback_variant?: string
          id?: string
          page_slug: string
          updated_at?: string | null
        }
        Update: {
          allowed_variants?: string[]
          fallback_variant?: string
          id?: string
          page_slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ui_button_logs: {
        Row: {
          created_at: string | null
          id: string
          page: string
          user_id: string | null
          variant: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          page: string
          user_id?: string | null
          variant: string
        }
        Update: {
          created_at?: string | null
          id?: string
          page?: string
          user_id?: string | null
          variant?: string
        }
        Relationships: [
          {
            foreignKeyName: "ui_button_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company_name: string | null
          created_at: string | null
          id: string
          linkedin_url: string | null
          updated_at: string | null
          user_id: string | null
          verification_documents: Json | null
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string | null
          id?: string
          linkedin_url?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_documents?: Json | null
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string | null
          id?: string
          linkedin_url?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_documents?: Json | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_rera_verified: boolean | null
          phone: string | null
          rera_number: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          is_rera_verified?: boolean | null
          phone?: string | null
          rera_number?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_rera_verified?: boolean | null
          phone?: string | null
          rera_number?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          reference_id: string | null
          reference_type: string | null
          status: string | null
          transaction_type: string
          user_id: string | null
          wallet_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          status?: string | null
          transaction_type: string
          user_id?: string | null
          wallet_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          status?: string | null
          transaction_type?: string
          user_id?: string | null
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number | null
          id: string
          last_updated: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          balance?: number | null
          id?: string
          last_updated?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          balance?: number | null
          id?: string
          last_updated?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
