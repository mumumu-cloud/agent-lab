import * as React from "react";

const RADIUS_MAP = {
  sm: "var(--border-radius-frame-8, 8px)",
  md: "var(--border-radius-frame-12, 12px)",
  lg: "var(--border-radius-frame-16, 16px)",
  xl: "var(--border-radius-frame-20, 20px)",
  full: "999px",
} as const;

export interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: string | number;
  radius?: "sm" | "md" | "lg" | "xl" | "full" | (string & {});
  background?: string;
  border?: string;
}

const Frame = React.forwardRef<HTMLDivElement, FrameProps>(
  ({ padding = "16px", radius = "md", background, border, style, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          padding,
          borderRadius: RADIUS_MAP[radius as keyof typeof RADIUS_MAP] ?? radius,
          background: background ?? "transparent",
          border: border ?? "none",
          boxSizing: "border-box",
          ...style,
        }}
        {...props}
      />
    );
  },
);
Frame.displayName = "Frame";

export { Frame };
