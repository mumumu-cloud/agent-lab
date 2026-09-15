"use client";

import { cn } from "@workspace/ui/utils";
import { Download } from "lucide-react";
import * as React from "react";

export interface DownloadButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onClick?: () => void | Promise<void>;
}

const DownloadButton = React.forwardRef<HTMLButtonElement, DownloadButtonProps>(
  ({ children = "Download", onClick, disabled = false, className, ...props }, ref) => {
    const [loading, setLoading] = React.useState(false);

    const handleClick = async () => {
      if (loading || disabled) return;
      setLoading(true);
      try {
        await onClick?.();
      } finally {
        setLoading(false);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center gap-[7px] rounded-[8px] border-[1.5px] bg-00 px-[14px] py-[6px] text-[13px] font-medium tracking-[-0.3px] text-03-high line-01 transition-colors duration-150",
          "enabled:hover:bg-03 enabled:hover:line-03 enabled:hover:text-04-brand",
          "disabled:cursor-not-allowed disabled:opacity-40",
          className,
        )}
        {...props}
      >
        <Download className={cn("h-[14px] w-[14px]", loading && "animate-spin")} />
        {children}
      </button>
    );
  },
);
DownloadButton.displayName = "DownloadButton";

export { DownloadButton };
