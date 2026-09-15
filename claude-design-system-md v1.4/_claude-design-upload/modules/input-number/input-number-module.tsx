"use client";
import { cn } from "@workspace/ui/utils";
import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface Props extends NumericFormatProps {
  align?: "left" | "right";
  inputSize?: "default" | "compact";
  state?: "default" | "error" | "success";
}

const InputNumber = React.forwardRef<HTMLInputElement, Props>(
  ({ className, defaultValue = "", align = "right", inputSize = "default", state = "default", ...props }, ref: React.ForwardedRef<HTMLInputElement>) => {
    const isCompact = inputSize === "compact";

    return (
      <div className="relative w-fit">
        <NumericFormat
          className={cn(
            "flex items-center rounded-lg border-2 line-01 bg-00",
            "hover:rounded-lg hover:border-2 hover:line-02 hover:bg-03",
            "focus:rounded-lg focus:border-2 focus:line-03 focus:bg-00 focus:outline-none",
            "disabled:cursor-not-allowed disabled:bg-01 disabled:text-02-row",
            isCompact ? "h-[40px] w-[200px] p-2" : "h-[56px] w-[200px] p-3",
            align === "right" ? "text-right" : "text-left",
            state === "error" && "border-state-error hover:border-state-error focus:border-state-error",
            state === "success" && "border-state-success hover:border-state-success focus:border-state-success",
            className,
          )}
          getInputRef={ref}
          {...props}
        />
      </div>
    );
  },
);

export { InputNumber };
