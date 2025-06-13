
import { useState, useEffect, useRef, RefObject } from 'react';

export function useElementVisibility(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasBeenVisible, setHasBeenVisible] = useState<boolean>(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        
        if (visible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        threshold,
        rootMargin: '0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, hasBeenVisible]);

  return {
    elementRef: elementRef as RefObject<HTMLElement>,
    isVisible,
    hasBeenVisible
  };
}
