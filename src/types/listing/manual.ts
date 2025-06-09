
export interface FieldConfig {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'date' | 'textarea' | 'toggle';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  value?: any;
}

export interface ListingTemplate {
  id: string;
  name: string;
  category: 'residential' | 'commercial' | 'plot';
  fields: FieldConfig[];
}

export interface DynamicListingData {
  basic_fields: Record<string, any>;
  custom_fields: Record<string, any>;
  template_id?: string;
}
