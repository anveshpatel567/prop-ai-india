
import { useState, useEffect } from 'react';

export function useDebouncedValue(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return {
    debouncedValue,
    isDebouncing: debouncedValue !== value
  };
}
