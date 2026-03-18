import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985]",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,rgba(103,232,249,1),rgba(56,189,248,0.88))] text-primary-foreground shadow-[0_18px_40px_rgba(6,182,212,0.24)] hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(6,182,212,0.3)]",
        secondary:
          "border border-white/10 bg-white/[0.06] text-secondary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-white/15 hover:bg-white/[0.1]",
        outline:
          "border border-white/12 bg-slate-950/40 text-slate-100 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-slate-900/80",
        ghost: "text-slate-300 hover:bg-white/[0.06] hover:text-white",
      },
      size: {
        default: "h-11 px-5.5",
        sm: "h-9 rounded-xl px-3 text-xs",
        lg: "h-12 px-6.5 text-[15px]",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
