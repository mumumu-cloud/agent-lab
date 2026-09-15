"use client";

import { cn } from "@workspace/ui/utils";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import * as React from "react";

const BANNER_STYLES = {
  info: { wrap: "bg-03 border-line-03", title: "text-04-brand", icon: "text-04-brand" },
  success: { wrap: "bg-success border-state-success", title: "text-success", icon: "text-success" },
  warning: { wrap: "soft-yellow border-state-warning", title: "text-warning", icon: "text-warning" },
  error: { wrap: "bg-error border-state-error", title: "text-error", icon: "text-error" },
} as const;

const BANNER_ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
} as const;

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "info" | "success" | "warning" | "error";
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Show dismiss button */
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ type = "info", title, description, dismissible = false, onDismiss, className, ...props }, ref) => {
    const [visible, setVisible] = React.useState(true);
    if (!visible) return null;

    const styles = BANNER_STYLES[type];
    const Icon = BANNER_ICONS[type];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "box-border flex items-start gap-[12px] rounded-[10px] border p-[14px_16px]",
          styles.wrap,
          className,
        )}
        {...props}
      >
        <Icon className={cn("mt-[1px] h-[18px] w-[18px] shrink-0", styles.icon)} />
        <div className="min-w-0 flex-1">
          {title && (
            <p className={cn("m-0 mb-[2px] text-[14px] font-semibold tracking-[-0.3px]", styles.title)}>{title}</p>
          )}
          {description && (
            <p className="m-0 text-[13px] leading-[1.5] tracking-[-0.2px] text-03-high opacity-80">{description}</p>
          )}
        </div>
        {dismissible && (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => {
              setVisible(false);
              onDismiss?.();
            }}
            className="shrink-0 border-none bg-none p-0 leading-none text-current opacity-50 transition-opacity duration-100 hover:opacity-100"
          >
            <X className="h-[14px] w-[14px]" />
          </button>
        )}
      </div>
    );
  },
);
Banner.displayName = "Banner";

export { Banner };
