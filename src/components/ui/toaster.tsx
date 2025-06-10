
import * as React from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  // Development mode logging
  React.useEffect(() => {
    if (import.meta.env.DEV && toasts.length > 0) {
      console.log('🔧 DEVELOPMENT MODE - Toast rendered:', toasts.length, 'toasts');
    }
  }, [toasts]);

  return (
    <>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </>
  )
}
