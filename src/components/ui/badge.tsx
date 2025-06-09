
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-white hover:from-[#ff3c00] hover:to-[#ff6a00]",
        secondary: "border-transparent bg-[#fff7f0] text-[#ff4500] hover:bg-gradient-to-r hover:from-[#ff6a00] hover:to-[#ff3c00] hover:text-white",
        destructive: "border-transparent bg-gradient-to-r from-[#ff0000] to-[#ff3c00] text-white hover:from-[#ff3c00] hover:to-[#ff0000]",
        outline: "text-[#ff4500] border-[#ff4500]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
