
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-[#fff7f0] hover:from-[#ff3c00] hover:to-[#ff6a00] shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)]",
        destructive: "bg-gradient-to-r from-[#ff0000] to-[#ff3c00] text-[#fff7f0] hover:from-[#ff3c00] hover:to-[#ff0000]",
        outline: "border border-[#ff4500] bg-[#fff7f0] text-[#ff4500] hover:bg-gradient-to-r hover:from-[#ff3c00] hover:to-[#ff6a00] hover:text-[#fff7f0]",
        secondary: "bg-[#fff7f0] text-[#ff4500] hover:bg-gradient-to-r hover:from-[#ff6a00] hover:to-[#ff3c00] hover:text-[#fff7f0]",
        ghost: "text-[#ff4500] hover:bg-gradient-to-r hover:from-[#ff6a00] hover:to-[#ff3c00] hover:text-[#fff7f0]",
        link: "text-[#ff4500] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
