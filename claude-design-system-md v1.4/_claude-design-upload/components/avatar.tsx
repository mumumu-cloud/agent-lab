import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const avatarVariants = cva(
  "relative box-border inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 line-02 bg-03 font-semibold text-04-brand tracking-[-0.5px]",
  {
    variants: {
      size: {
        XL: "h-[56px] w-[56px] text-[20px]",
        L: "h-[40px] w-[40px] text-[16px]",
        M: "h-[32px] w-[32px] text-[13px]",
        S: "h-[24px] w-[24px] text-[10px]",
      },
    },
    defaultVariants: {
      size: "M",
    },
  },
);

const STATUS_SIZES = {
  XL: "h-[14px] w-[14px]",
  L: "h-[12px] w-[12px]",
  M: "h-[10px] w-[10px]",
  S: "h-[8px] w-[8px]",
} as const;

const STATUS_COLORS = {
  online: "state-success",
  busy: "state-error",
  away: "state-warning",
  offline: "bg-gray-02",
} as const;

function initials(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  /** Image URL — falls back to initials if absent */
  src?: string;
  /** Full name used for initials + tooltip */
  name?: string;
  /** Online presence indicator */
  status?: "online" | "offline" | "busy" | "away";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, name, size, status, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(avatarVariants({ size }), className)} title={name} {...props}>
        {src ? (
          <img src={src} alt={name || "Avatar"} className="h-full w-full rounded-full object-cover" />
        ) : (
          <span>{initials(name)}</span>
        )}
        {status && (
          <span
            className={cn(
              "absolute right-0 bottom-0 box-border rounded-full border-2 bg-00",
              STATUS_SIZES[size ?? "M"],
              STATUS_COLORS[status],
            )}
          />
        )}
      </div>
    );
  },
);
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
