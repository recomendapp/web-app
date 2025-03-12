import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // link: "text-primary underline-offset-4 hover:underline",
        link: "text-primary underline-offset-4 hover:underline hover:text-accent-pink",
        'link-accent-yellow': "text-accent-yellow/80 underline-offset-4 hover:underline hover:text-accent-yellow",
        action: 'text-foreground hover:text-foreground/60',
        muted: 'bg-muted hover:bg-muted-hover',
        'muted-background': 'bg-background hover:bg-muted',
        // ACCENT
        'accent-yellow':
          'bg-accent-yellow text-accent-yellow-foreground hover:bg-muted hover:text-accent-yellow border',
        'accent-yellow-enabled': 'bg-accent-yellow-foreground text-accent-yellow',
        'accent-yellow-hover':
          'bg-accent-yellow text-accent-yellow-foreground hover:bg-accent-yellow-hover',
        rating: 'text-foreground hover:text-accent-yellow',
        'rating-enabled':
          '!p-0 !aspect-[3/2] border-2 border-accent-yellow rounded-sm text-accent-yellow hover:text-accent-yellow-foreground hover:bg-accent-yellow bg-background',
        share:
          'text-destructive-foreground hover:bg-blue-500/10 hover:text-blue-300 rounded-full',
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        fit: "h-fit w-fit",
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
