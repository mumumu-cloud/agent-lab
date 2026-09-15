import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const dotVariants = cva("inline-block shrink-0 rounded-full transition-colors duration-200", {
  variants: {
    status: {
      success: "state-success",
      error: "state-error",
      warning: "state-warning",
      primary: "primary-01",
      gray: "bg-gray-02",
    },
    size: {
      S: "h-[6px] w-[6px]",
      M: "h-[8px] w-[8px]",
      L: "h-[10px] w-[10px]",
    },
  },
  defaultVariants: {
    status: "gray",
    size: "M",
  },
});

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof dotVariants> {
  /** Optional inline label */
  label?: string;
}

const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, status, size, label, ...props }, ref) => {
    return (
      <span ref={ref} className={cn("inline-flex items-center gap-[6px]", className)} {...props}>
        <span className={dotVariants({ status, size })} />
        {label && <span className="text-[13px] font-normal tracking-[-0.3px] text-03-high">{label}</span>}
      </span>
    );
  },
);
StatusDot.displayName = "StatusDot";

export { StatusDot, dotVariants };
