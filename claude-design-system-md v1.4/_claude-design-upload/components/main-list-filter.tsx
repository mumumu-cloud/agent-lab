import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface MainListFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  count?: number;
  active?: boolean;
}

const MainListFilter = React.forwardRef<HTMLDivElement, MainListFilterProps>(
  ({ label, count, active, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex cursor-pointer items-center gap-[8px] rounded-[8px] px-[14px] py-[7px]",
          active && "bg-04",
          className,
        )}
        {...props}
      >
        <div className={cn("flex-1 text-[13px]", active ? "font-semibold text-04-brand" : "font-medium text-03-high")}>
          {label}
        </div>
        {count != null && (
          <div className="min-w-[20px] rounded-[10px] bg-02 px-[6px] py-[1px] text-center text-[11px] text-02-row">
            {count}
          </div>
        )}
      </div>
    );
  },
);
MainListFilter.displayName = "MainListFilter";

export { MainListFilter };
