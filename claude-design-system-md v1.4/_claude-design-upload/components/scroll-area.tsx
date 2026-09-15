import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "overflow-auto [scrollbar-color:rgba(0,0,0,0.15)_transparent] [scrollbar-width:thin]",
        "[&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar]:w-[6px]",
        "[&::-webkit-scrollbar-track]:bg-transparent",
        "[&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-thumb]:bg-black/15 hover:[&::-webkit-scrollbar-thumb]:bg-black/25",
        className,
      )}
      {...props}
    />
  );
});
ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
