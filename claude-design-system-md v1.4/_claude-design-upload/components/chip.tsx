import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const chipVariants = cva(
  "inline-flex items-center gap-[5px] whitespace-nowrap rounded-full border-[1.5px] border-transparent font-medium tracking-[-0.3px] transition-colors duration-100",
  {
    variants: {
      color: {
        gray: "soft-gray-pale text-03-high",
        blue: "soft-blue text-04-brand",
        red: "soft-red text-error",
        green: "soft-green text-success",
        yellow: "soft-yellow text-warning",
        purple: "soft-purple text-07-tertiary",
        navy: "primary-02 text-00",
        outlined: "bg-transparent line-01 text-03-high",
      },
      size: {
        M: "h-[28px] px-[10px] text-[13px]",
        S: "h-[22px] px-[8px] text-[11px]",
      },
      active: {
        true: "",
        false: "",
      },
      disabled: {
        true: "pointer-events-none cursor-not-allowed opacity-40",
        false: "",
      },
      clickable: {
        true: "cursor-pointer hover:brightness-95",
        false: "cursor-default",
      },
    },
    compoundVariants: [
      { color: "gray", active: true, className: "border-primary-01 text-04-brand" },
      { color: "outlined", active: true, className: "border-primary-01 bg-03 text-04-brand" },
    ],
    defaultVariants: {
      color: "gray",
      size: "M",
      active: false,
      disabled: false,
      clickable: false,
    },
  },
);

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof chipVariants> {
  /** Show close × button */
  removable?: boolean;
  /** Called when close button is clicked */
  onRemove?: () => void;
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    { className, color, size, active, disabled, removable = false, onRemove, onClick, children, ...props },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          chipVariants({ color, size, active, disabled: !!disabled, clickable: !!onClick }),
          className,
        )}
        onClick={disabled ? undefined : onClick}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            aria-label="Remove"
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) onRemove?.();
            }}
            className="flex h-[14px] w-[14px] items-center justify-center rounded-full border-none bg-none p-0 text-current opacity-60 transition-opacity duration-100 hover:opacity-100"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </span>
    );
  },
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
