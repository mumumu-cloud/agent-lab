"use client";

import { cn } from "@workspace/ui/utils";
import { LayoutGrid, List, Table as TableIcon } from "lucide-react";
import * as React from "react";

const VIEW_ICONS = {
  list: List,
  grid: LayoutGrid,
  table: TableIcon,
} as const;

export type ViewToggleOption = keyof typeof VIEW_ICONS;

export interface ViewToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options?: ViewToggleOption[];
  value?: ViewToggleOption;
  defaultValue?: ViewToggleOption;
  onChange?: (view: ViewToggleOption) => void;
}

const ViewToggle = React.forwardRef<HTMLDivElement, ViewToggleProps>(
  ({ options = ["list", "grid"], value, defaultValue, onChange, className, ...props }, ref) => {
    const controlled = value !== undefined;
    const [internal, setInternal] = React.useState<ViewToggleOption>(defaultValue ?? options[0]!);
    const active = controlled ? value : internal;

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center overflow-hidden rounded-[8px] border bg-01 line-01", className)}
        {...props}
      >
        {options.map((opt) => {
          const Icon = VIEW_ICONS[opt];
          const isActive = active === opt;
          return (
            <button
              key={opt}
              type="button"
              aria-label={opt}
              onClick={() => {
                if (!controlled) setInternal(opt);
                onChange?.(opt);
              }}
              className={cn(
                "flex h-[32px] w-[32px] items-center justify-center border-none bg-transparent text-gray-03-icon-row transition-colors duration-100 hover:text-03-high",
                isActive && "bg-00 text-04-brand shadow-black-01",
              )}
            >
              <Icon className="h-[14px] w-[14px]" strokeWidth={2.5} />
            </button>
          );
        })}
      </div>
    );
  },
);
ViewToggle.displayName = "ViewToggle";

export { ViewToggle };
