import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface MainListChatTalkProps extends React.HTMLAttributes<HTMLDivElement> {
  sender?: React.ReactNode;
  message: React.ReactNode;
  time?: React.ReactNode;
  isSelf?: boolean;
}

const MainListChatTalk = React.forwardRef<HTMLDivElement, MainListChatTalkProps>(
  ({ sender, message, time, isSelf, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-[3px] py-[4px]", isSelf ? "items-end" : "items-start", className)}
        {...props}
      >
        {!isSelf && sender && <div className="pl-[10px] text-[11px] font-semibold text-02-row">{sender}</div>}
        <div className={cn("flex items-end gap-[6px]", isSelf && "flex-row-reverse")}>
          <div
            className={cn(
              "max-w-[320px] px-[12px] py-[8px] text-[13px] leading-[1.5] tracking-[-0.2px]",
              isSelf
                ? "rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] rounded-br-[4px] primary-01 text-00"
                : "rounded-tl-[12px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[4px] bg-01 text-03-high",
            )}
          >
            {message}
          </div>
          {time && <div className="shrink-0 text-[10px] text-02-row">{time}</div>}
        </div>
      </div>
    );
  },
);
MainListChatTalk.displayName = "MainListChatTalk";

export { MainListChatTalk };
