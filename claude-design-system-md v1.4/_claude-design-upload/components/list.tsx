import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface ListItemData {
  id?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  lead?: React.ReactNode;
  trail?: React.ReactNode;
}

export interface ListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items: ListItemData[];
  activeId?: string;
  onSelect?: (item: ListItemData) => void;
}

const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({ items, activeId, onSelect, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col", className)} {...props}>
        {items.map((item, i) => (
          <div
            key={item.id ?? i}
            onClick={() => onSelect?.(item)}
            className={cn(
              "flex items-center gap-[10px] border-b px-[14px] py-[10px] line-00 last:border-none",
              onSelect && "cursor-pointer transition-colors duration-100 hover:bg-03",
              activeId === item.id && "bg-04",
            )}
          >
            {item.lead && <div className="flex shrink-0 items-center">{item.lead}</div>}
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium tracking-[-0.3px] text-03-high">{item.title}</div>
              {item.subtitle && <div className="mt-[1px] text-[11px] text-02-row">{item.subtitle}</div>}
            </div>
            {item.trail && <div className="shrink-0">{item.trail}</div>}
          </div>
        ))}
      </div>
    );
  },
);
List.displayName = "List";

export { List };
