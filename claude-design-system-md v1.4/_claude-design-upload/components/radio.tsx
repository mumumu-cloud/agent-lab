"use client";

import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface RadioOption {
  label?: string;
  value: string;
  disabled?: boolean;
}

export interface RadioProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Disable all options */
  disabled?: boolean;
  /** Layout direction of radio items */
  direction?: "column" | "row";
}

const Radio = React.forwardRef<HTMLDivElement, RadioProps>(
  (
    { options, value, defaultValue, onChange, disabled = false, direction = "column", className, ...props },
    ref,
  ) => {
    const controlled = value !== undefined;
    const [internal, setInternal] = React.useState<string | undefined>(defaultValue);
    const selected = controlled ? value : internal;

    const select = (v: string, optionDisabled?: boolean) => {
      if (disabled || optionDisabled) return;
      if (!controlled) setInternal(v);
      onChange?.(v);
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn("flex flex-col gap-[10px]", direction === "row" && "flex-row gap-[16px]", className)}
        {...props}
      >
        {options.map((opt) => {
          const isChecked = selected === opt.value;
          const isDisabled = disabled || opt.disabled;
          return (
            <div
              key={opt.value}
              role="radio"
              aria-checked={isChecked}
              aria-disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
              onClick={() => select(opt.value, opt.disabled)}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") select(opt.value, opt.disabled);
              }}
              className={cn(
                "inline-flex cursor-pointer items-center gap-[8px] select-none",
                isDisabled && "cursor-not-allowed opacity-50",
              )}
            >
              <span
                className={cn(
                  "relative flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border-2 bg-00 transition-shadow duration-150",
                  isChecked ? "border-primary-01 bg-03 shadow-blue-03" : "line-01",
                  !isDisabled && !isChecked && "hover:line-03",
                )}
              >
                {isChecked && <span className="h-[10px] w-[10px] rounded-full primary-01" />}
              </span>
              {opt.label && (
                <span className="text-[14px] text-03-high tracking-[-0.3px]">{opt.label}</span>
              )}
            </div>
          );
        })}
      </div>
    );
  },
);
Radio.displayName = "Radio";

export { Radio };
