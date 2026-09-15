import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface SideListChatProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  preview?: React.ReactNode;
  time?: React.ReactNode;
  unread?: boolean;
  active?: boolean;
}

const SideListChat = React.forwardRef<HTMLDivElement, SideListChatProps>(
  ({ title, preview, time, unread, active, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex cursor-pointer items-start gap-[8px] rounded-[8px] px-[12px] py-[8px]",
          active && "bg-04",
          className,
        )}
        {...props}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-[8px]">
            <span
              className={cn(
                "flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-03-high",
                unread ? "font-semibold" : "font-medium",
              )}
            >
              {title}
            </span>
            {time && <span className="shrink-0 text-[10px] text-02-row">{time}</span>}
          </div>
          {preview && (
            <div className="mt-[2px] overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-02-row">
              {preview}
            </div>
          )}
        </div>
        {unread && <div className="mt-[5px] h-[6px] w-[6px] shrink-0 rounded-full primary-01" />}
      </div>
    );
  },
);
SideListChat.displayName = "SideListChat";

export { SideListChat };
