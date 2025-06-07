
export type ButtonVariant = 'primary' | 'secondary' | 'glass';

export interface UiButtonControl {
  id: string;
  page_slug: string;
  allowed_variants: ButtonVariant[];
  fallback_variant: ButtonVariant;
  updated_at: string;
}

export interface UiButtonLog {
  id: string;
  page: string;
  variant: ButtonVariant;
  user_id: string | null;
  created_at: string;
}
