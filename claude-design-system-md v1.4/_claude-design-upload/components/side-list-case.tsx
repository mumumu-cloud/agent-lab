import { cn } from "@workspace/ui/utils";
import * as React from "react";

const STATUS_COLOR = {
  Active: "state-success",
  Critical: "state-error",
  Pending: "state-warning",
  Closed: "bg-gray-02",
} as const;

export interface SideListCaseProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  status?: keyof typeof STATUS_COLOR;
  active?: boolean;
}

const SideListCase = React.forwardRef<HTMLDivElement, SideListCaseProps>(
  ({ title, subtitle, status, active, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex cursor-pointer items-center gap-[8px] rounded-[8px] px-[12px] py-[8px]",
          active && "bg-04",
          className,
        )}
        {...props}
      >
        {status && <div className={cn("h-[6px] w-[6px] shrink-0 rounded-full", STATUS_COLOR[status])} />}
        <div className="min-w-0 flex-1">
          <div className={cn("truncate text-[12px]", active ? "font-semibold text-04-brand" : "font-medium text-03-high")}>
            {title}
          </div>
          {subtitle && <div className="mt-[1px] text-[11px] text-02-row">{subtitle}</div>}
        </div>
      </div>
    );
  },
);
SideListCase.displayName = "SideListCase";

export { SideListCase };
