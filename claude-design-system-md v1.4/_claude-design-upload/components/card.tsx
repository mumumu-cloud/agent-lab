import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const cardVariants = cva("box-border overflow-hidden border bg-00 line-01", {
  variants: {
    radius: {
      sm: "rounded-[8px]",
      md: "rounded-[12px]",
      lg: "rounded-[16px]",
      xl: "rounded-[20px]",
    },
    shadow: {
      none: "",
      sm: "shadow-black-02",
      md: "shadow-black-03",
      lg: "shadow-black-04",
      blue: "shadow-blue-02",
    },
    clickable: {
      true: "cursor-pointer transition-shadow duration-150 hover:shadow-black-03 active:scale-[0.99]",
      false: "",
    },
  },
  defaultVariants: {
    radius: "md",
    shadow: "sm",
    clickable: false,
  },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  /** Card header title */
  title?: React.ReactNode;
  /** Card header subtitle */
  subtitle?: React.ReactNode;
  /** Slot for action element in header (button, icon, etc.) */
  headerAction?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Override body padding */
  padding?: string | number;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, radius, shadow, title, subtitle, headerAction, footer, padding, onClick, children, ...props },
    ref,
  ) => {
    const hasHeader = title || subtitle || headerAction;

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ radius, shadow, clickable: !!onClick }), className)}
        onClick={onClick}
        {...props}
      >
        {hasHeader && (
          <div className="flex items-start justify-between gap-[12px] px-[20px] pt-[16px]">
            <div>
              {title && <div className="m-0 text-[15px] font-semibold tracking-[-0.5px] text-03-high">{title}</div>}
              {subtitle && <div className="mt-[3px] text-[12px] tracking-[-0.2px] text-02-row">{subtitle}</div>}
            </div>
            {headerAction}
          </div>
        )}
        <div style={padding !== undefined ? { padding } : undefined} className={padding === undefined ? "px-[20px] py-[16px]" : undefined}>
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end gap-[8px] border-t bg-01 line-00 px-[20px] py-[12px]">
            {footer}
          </div>
        )}
      </div>
    );
  },
);
Card.displayName = "Card";

export { Card, cardVariants };
