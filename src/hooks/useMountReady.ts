
import { useEffect, useState } from "react";

export function useMountReady() {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    setIsReady(true);
  }, []);
  
  return isReady;
}
