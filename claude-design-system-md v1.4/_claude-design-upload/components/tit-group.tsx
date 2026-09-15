import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const titGroupVariants = cva("flex flex-col items-start", {
  variants: {
    align: {
      left: "items-start text-left",
      center: "items-center text-center",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

const TITLE_SIZES = {
  L: "text-[28px] tracking-[-1.3px]",
  S: "text-[20px] tracking-[-1px]",
  XS: "text-[16px] tracking-[-0.5px]",
} as const;

const SUBTITLE_SIZES = {
  L: "mt-[2px] text-[16px]",
  S: "mt-[2px] text-[14px]",
  XS: "mt-[1px] text-[13px]",
} as const;

export interface TitGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof titGroupVariants> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Visual size — L (28px), S (20px), XS (16px) */
  size?: "L" | "S" | "XS";
}

const TitGroup = React.forwardRef<HTMLDivElement, TitGroupProps>(
  ({ title, subtitle, size = "L", align, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(titGroupVariants({ align }), className)} {...props}>
        {title && (
          <div className={cn("font-semibold text-03-high leading-[1.2]", TITLE_SIZES[size])}>{title}</div>
        )}
        {subtitle && (
          <div className={cn("font-medium text-03-high leading-[1.48] opacity-75", SUBTITLE_SIZES[size])}>
            {subtitle}
          </div>
        )}
      </div>
    );
  },
);
TitGroup.displayName = "TitGroup";

export { TitGroup, titGroupVariants };
