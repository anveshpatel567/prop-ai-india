
import { ButtonVariant } from '../types/ui';

export type { ButtonVariant };

export function isValidVariant(v: string): v is ButtonVariant {
  return ['primary', 'secondary', 'glass'].includes(v);
}

export function getValidVariant(v: string): ButtonVariant {
  if (isValidVariant(v)) {
    return v;
  }
  console.warn(`Invalid button variant "${v}", falling back to "primary"`);
  return 'primary';
}

export function getValidVariantWithConfig(
  v: string, 
  allowedVariants: ButtonVariant[], 
  fallbackVariant: ButtonVariant
): ButtonVariant {
  if (isValidVariant(v) && allowedVariants.includes(v)) {
    return v;
  }
  
  if (!isValidVariant(v)) {
    console.warn(`Invalid button variant "${v}", using fallback "${fallbackVariant}"`);
  } else {
    console.warn(`Button variant "${v}" not allowed for this page, using fallback "${fallbackVariant}"`);
  }
  
  return fallbackVariant;
}
