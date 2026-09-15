import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface DeviceFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
}

const DeviceFrame = React.forwardRef<HTMLDivElement, DeviceFrameProps>(
  ({ width = 320, style, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("overflow-hidden rounded-[40px] border-[6px] border-gray-06 bg-black shadow-black-08", className)}
        style={{ width, ...style }}
        {...props}
      />
    );
  },
);
DeviceFrame.displayName = "DeviceFrame";

export { DeviceFrame };
