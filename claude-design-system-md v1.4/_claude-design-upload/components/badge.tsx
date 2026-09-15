import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium tracking-[-0.3px]",
  {
    variants: {
      color: {
        gray: "soft-gray-pale text-03-high",
        navy: "primary-02 text-00",
        blue: "soft-blue text-04-brand",
        red: "soft-red text-error",
        success: "soft-green text-success",
        warning: "soft-yellow text-warning",
        purple: "soft-purple text-07-tertiary",
        primary: "primary-01 text-00",
      },
      size: {
        S: "h-[20px] px-[8px] text-[11px]",
        L: "h-[26px] px-[12px] text-[13px]",
      },
    },
    defaultVariants: {
      color: "gray",
      size: "S",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, color, size, ...props }, ref) => {
  return <span ref={ref} className={cn(badgeVariants({ color, size }), className)} {...props} />;
});
Badge.displayName = "Badge";

export { Badge, badgeVariants };
