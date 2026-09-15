import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface TermsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  maxHeight?: number;
}

const Terms = React.forwardRef<HTMLDivElement, TermsProps>(
  ({ title, maxHeight = 200, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("rounded-[10px] border line-01", className)} {...props}>
        {title && (
          <div className="border-b px-[16px] pt-[12px] pb-[8px] text-[13px] font-semibold text-03-high line-00">
            {title}
          </div>
        )}
        <div className="overflow-y-auto px-[16px] py-[12px] text-[12px] leading-[1.7] text-02-row" style={{ maxHeight }}>
          {children}
        </div>
      </div>
    );
  },
);
Terms.displayName = "Terms";

export { Terms };
