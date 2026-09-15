import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface CaseProgressItem {
  label: React.ReactNode;
  time?: React.ReactNode;
  done?: boolean;
}

export interface CaseProgressListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CaseProgressItem[];
}

const CaseProgressList = React.forwardRef<HTMLDivElement, CaseProgressListProps>(
  ({ items, className, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-[10px] border-b py-[8px] line-00">
            <div
              className={cn("mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full", item.done ? "state-success" : "bg-gray-02")}
            />
            <div className="flex-1">
              <div className="text-[13px] font-medium text-03-high">{item.label}</div>
              {item.time && <div className="mt-[2px] text-[11px] text-02-row">{item.time}</div>}
            </div>
          </div>
        ))}
      </div>
    );
  },
);
CaseProgressList.displayName = "CaseProgressList";

export { CaseProgressList };
