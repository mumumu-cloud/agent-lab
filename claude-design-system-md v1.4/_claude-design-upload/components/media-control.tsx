"use client";

import { cn } from "@workspace/ui/utils";
import { Pause, Play } from "lucide-react";
import * as React from "react";

export interface MediaControlProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onToggle"> {
  playing?: boolean;
  onToggle?: (playing: boolean) => void;
  size?: number;
}

const MediaControl = React.forwardRef<HTMLButtonElement, MediaControlProps>(
  ({ playing = false, onToggle, size = 36, style, className, ...props }, ref) => {
    const [internal, setInternal] = React.useState(playing);
    const active = onToggle ? playing : internal;

    const toggle = () => {
      if (onToggle) onToggle(!active);
      else setInternal((v) => !v);
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={toggle}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full border-none primary-01 text-00 shadow-blue-03 transition-colors duration-150",
          className,
        )}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        {active ? (
          <Pause style={{ width: size * 0.4, height: size * 0.4 }} fill="currentColor" />
        ) : (
          <Play style={{ width: size * 0.4, height: size * 0.4 }} fill="currentColor" />
        )}
      </button>
    );
  },
);
MediaControl.displayName = "MediaControl";

export { MediaControl };
