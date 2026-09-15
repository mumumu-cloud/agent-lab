"use client";

import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface LanguageOption {
  label: string;
  value: string;
}

const DEFAULT_OPTIONS: LanguageOption[] = [
  { label: "한국어", value: "ko" },
  { label: "English", value: "en" },
];

export interface LanguageSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options?: LanguageOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const LanguageSelector = React.forwardRef<HTMLDivElement, LanguageSelectorProps>(
  ({ options = DEFAULT_OPTIONS, value, defaultValue = "ko", onChange, className, ...props }, ref) => {
    const controlled = value !== undefined;
    const [internal, setInternal] = React.useState(defaultValue);
    const active = controlled ? value : internal;

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-[2px] rounded-[8px] border bg-01 line-01 p-[3px]", className)}
        {...props}
      >
        {options.map((opt) => {
          const isActive = active === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                if (!controlled) setInternal(opt.value);
                onChange?.(opt.value);
              }}
              className={cn(
                "rounded-[6px] px-[10px] py-[4px] text-[12px] font-normal text-02-row transition-colors duration-100",
                isActive && "bg-00 font-semibold text-03-high shadow-black-01",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  },
);
LanguageSelector.displayName = "LanguageSelector";

export { LanguageSelector };
