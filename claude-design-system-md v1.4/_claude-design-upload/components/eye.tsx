import * as React from "react";

export interface EyeProps extends Omit<React.SVGAttributes<SVGSVGElement>, "onClick"> {
  /** `true` = open eye, `false` = eye-off (slash) */
  visible?: boolean;
  size?: number;
  color?: string;
  onClick?: () => void;
}

/**
 * UROCK Eye — show/hide toggle icon.
 * Covers eye, icon-eye, icon_eye Figma families.
 * SVG paths transplanted from Claude Design `components/display/Eye.jsx` (no invented paths).
 */
const Eye = React.forwardRef<SVGSVGElement, EyeProps>(
  ({ visible = true, size = 16, color, onClick, style, className, ...props }, ref) => {
    const shared = {
      ref,
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none" as const,
      stroke: color ?? "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round" as const,
      className,
      onClick,
      style: {
        display: "inline-block",
        flexShrink: 0,
        cursor: onClick ? "pointer" : "default",
        ...style,
      },
      ...props,
    };

    if (visible) {
      return (
        <svg {...shared}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    }

    return (
      <svg {...shared}>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    );
  },
);
Eye.displayName = "Eye";

/** UROCK IconEye — eye icon alias. */
const IconEye = React.forwardRef<SVGSVGElement, EyeProps>((props, ref) => (
  <Eye ref={ref} {...props} />
));
IconEye.displayName = "IconEye";

export { Eye, IconEye };
