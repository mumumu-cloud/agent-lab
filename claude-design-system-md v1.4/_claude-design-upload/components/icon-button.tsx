import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full border-none bg-transparent text-gray-03-icon-row transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      size: {
        L: "h-[36px] w-[36px]",
        M: "h-[30px] w-[30px]",
        S: "h-[24px] w-[24px]",
      },
      color: {
        default: "enabled:hover:bg-01 enabled:hover:text-03-high",
        primary: "enabled:hover:bg-03 enabled:hover:text-primary-01",
      },
    },
    defaultVariants: {
      size: "M",
      color: "default",
    },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size, color, ...props }, ref) => {
    return (
      <button ref={ref} type="button" className={cn(iconButtonVariants({ size, color }), className)} {...props} />
    );
  },
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
