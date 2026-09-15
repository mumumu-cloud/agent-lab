import { cn } from "@workspace/ui/utils";
import * as React from "react";

const STATUS_COLOR = {
  online: "state-success",
  offline: "bg-gray-02",
  busy: "state-error",
} as const;

export interface SideListSpeakerProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  role?: React.ReactNode;
  status?: keyof typeof STATUS_COLOR;
  active?: boolean;
}

function initials(name?: string) {
  return (name || "?")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const SideListSpeaker = React.forwardRef<HTMLDivElement, SideListSpeakerProps>(
  ({ name, role, status, active, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex cursor-pointer items-center gap-[8px] rounded-[8px] px-[12px] py-[7px]",
          active && "bg-04",
          className,
        )}
        {...props}
      >
        <div className="relative shrink-0">
          <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-03 text-[11px] font-semibold text-04-brand">
            {initials(name)}
          </div>
          {status && (
            <div
              className={cn(
                "absolute right-0 bottom-0 h-[7px] w-[7px] rounded-full border-[1.5px] border-00",
                STATUS_COLOR[status],
              )}
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[12px] font-medium text-03-high">{name}</div>
          {role && <div className="mt-[1px] text-[10px] text-02-row">{role}</div>}
        </div>
      </div>
    );
  },
);
SideListSpeaker.displayName = "SideListSpeaker";

export { SideListSpeaker };
