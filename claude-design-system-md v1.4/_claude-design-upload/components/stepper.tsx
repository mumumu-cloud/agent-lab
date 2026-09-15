import { cn } from "@workspace/ui/utils";
import { Check } from "lucide-react";
import * as React from "react";

export interface StepperStep {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[];
  /** Index of the current active step (0-based) */
  currentStep?: number;
  direction?: "horizontal" | "vertical";
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep = 0, direction = "horizontal", className, ...props }, ref) => {
    const isH = direction === "horizontal";

    return (
      <div
        ref={ref}
        className={cn("flex items-start", isH ? "flex-row items-center" : "flex-col", className)}
        {...props}
      >
        {steps.map((step, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <React.Fragment key={i}>
              <div className={cn("relative flex flex-col items-center", isH && "flex-row items-start")}>
                <div
                  className={cn(
                    "z-[1] flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border-2 text-[12px] font-semibold transition-colors duration-200",
                    done
                      ? "border-state-success bg-success text-success"
                      : active
                        ? "border-primary-01 primary-01 text-00 shadow-blue-03"
                        : "bg-00 line-01 text-02-row",
                  )}
                >
                  {done ? <Check className="h-[12px] w-[12px]" strokeWidth={3.5} /> : i + 1}
                </div>
                <div
                  className={cn(
                    "flex flex-col gap-[1px]",
                    isH ? "ml-[10px] pt-[4px]" : "mt-[4px] items-center text-center",
                  )}
                >
                  {step.label && (
                    <span
                      className={cn(
                        "text-[12px] font-semibold tracking-[-0.2px] text-03-high",
                        done && "text-success",
                        active && "text-04-brand",
                      )}
                    >
                      {step.label}
                    </span>
                  )}
                  {step.description && <span className="text-[11px] text-02-row">{step.description}</span>}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "transition-colors duration-200",
                    done ? "state-success" : "line-01",
                    isH ? "mt-[13px] mx-[6px] h-[2px] min-w-[20px] flex-1" : "my-[4px] ml-[13px] min-h-[20px] w-[2px]",
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  },
);
Stepper.displayName = "Stepper";

export { Stepper };
