import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const fabVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full font-medium transition-all duration-150 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-02 disabled:text-01 disabled:shadow-none",
  {
    variants: {
      size: {
        L: "h-[56px] w-[56px] text-[24px]",
        M: "h-[44px] w-[44px] text-[20px]",
        S: "h-[36px] w-[36px] text-[16px]",
      },
      color: {
        primary:
          "primary-01 text-00 shadow-blue-04 enabled:hover:bg-secondary-01 enabled:hover:shadow-blue-05 enabled:active:bg-blue-09 enabled:active:scale-95",
        secondary:
          "border-2 bg-00 line-03 text-04-brand shadow-blue-03 enabled:hover:bg-03 enabled:active:bg-04 enabled:active:scale-95",
      },
    },
    defaultVariants: {
      size: "M",
      color: "primary",
    },
  },
);

export interface FabProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof fabVariants> {}

const Fab = React.forwardRef<HTMLButtonElement, FabProps>(({ className, size, color, ...props }, ref) => {
  return <button ref={ref} type="button" className={cn(fabVariants({ size, color }), className)} {...props} />;
});
Fab.displayName = "Fab";

export { Fab, fabVariants };
