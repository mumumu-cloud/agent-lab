"use client";

import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface SegmentedControlOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "M" | "S";
}

const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ options, value, defaultValue, onChange, size = "M", className, ...props }, ref) => {
    const controlled = value !== undefined;
    const [internal, setInternal] = React.useState(defaultValue ?? options[0]?.value);
    const active = controlled ? value : internal;

    const select = (v: string, disabled?: boolean) => {
      if (disabled) return;
      if (!controlled) setInternal(v);
      onChange?.(v);
    };

    return (
      <div
        ref={ref}
        role="group"
        className={cn("inline-flex items-center gap-[2px] rounded-[10px] border bg-01 line-01 p-[3px]", className)}
        {...props}
      >
        {options.map((opt) => {
          const isActive = active === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              disabled={opt.disabled}
              onClick={() => select(opt.value, opt.disabled)}
              className={cn(
                "inline-flex items-center justify-center gap-[5px] rounded-[8px] px-[12px] font-medium tracking-[-0.3px] whitespace-nowrap text-02-row transition-colors duration-150",
                size === "M" ? "h-[32px] text-[14px]" : "h-[26px] text-[12px]",
                isActive ? "bg-00 text-03-high shadow-black-02" : "hover:bg-black/[0.04] hover:text-03-high",
                opt.disabled && "cursor-not-allowed opacity-40",
              )}
            >
              {opt.icon}
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  },
);
SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl };
