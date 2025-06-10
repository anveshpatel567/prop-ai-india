
import * as React from "react";

// Simple toast state for Radix UI integration
interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

const toasts: Toast[] = [];
const listeners: Array<(toasts: Toast[]) => void> = [];

const addToast = (toast: Omit<Toast, "id">) => {
  const id = Math.random().toString(36).substr(2, 9);
  const newToast = { ...toast, id };
  toasts.push(newToast);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    removeToast(id);
  }, 5000);
  
  listeners.forEach((listener) => listener([...toasts]));
  
  if (import.meta.env.DEV) {
    console.log("🔧 Toast added:", newToast);
  }
  
  return { id, dismiss: () => removeToast(id) };
};

const removeToast = (id: string) => {
  const index = toasts.findIndex((t) => t.id === id);
  if (index > -1) {
    toasts.splice(index, 1);
    listeners.forEach((listener) => listener([...toasts]));
  }
};

export function useToast() {
  const [toastList, setToastList] = React.useState<Toast[]>([]);

  React.useEffect(() => {
    listeners.push(setToastList);
    return () => {
      const index = listeners.indexOf(setToastList);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    toasts: toastList,
    toast: addToast,
    dismiss: removeToast,
  };
}

export { addToast as toast };
