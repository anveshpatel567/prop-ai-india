
export interface AiListingDraft {
  title: string;
  description: string;
  enhanced_description?: string;
  property_type: string;
  location: string;
  price: number;
  ai_suggestions: string[];
  credits_used: number;
}

export interface AiDescriptionRequest {
  current_description: string;
  property_details: {
    title: string;
    location: string;
    property_type: string;
    price?: number;
    features?: string[];
  };
}
