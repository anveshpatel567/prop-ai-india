
export type ButtonVariant = 'primary' | 'secondary' | 'glass';

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
