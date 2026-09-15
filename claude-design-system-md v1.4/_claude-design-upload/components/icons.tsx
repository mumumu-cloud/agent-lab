import * as React from "react";

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number;
  color?: string;
}

/** UROCK IconDevice — computer/device icon. */
const IconDevice = React.forwardRef<SVGSVGElement, IconProps>(({ size = 16, color, style, ...props }, ref) => (
  <svg
    ref={ref}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color ?? "currentColor"}
    strokeWidth={2}
    strokeLinecap="round"
    style={{ display: "inline-block", flexShrink: 0, ...style }}
    {...props}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
));
IconDevice.displayName = "IconDevice";

/** UROCK IconMapping — map/location pin icon. */
const IconMapping = React.forwardRef<SVGSVGElement, IconProps>(({ size = 16, color, style, ...props }, ref) => (
  <svg
    ref={ref}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color ?? "currentColor"}
    strokeWidth={2}
    strokeLinecap="round"
    style={{ display: "inline-block", flexShrink: 0, ...style }}
    {...props}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
));
IconMapping.displayName = "IconMapping";

/** UROCK IconSorting — sort arrows icon. */
const IconSorting = React.forwardRef<SVGSVGElement, IconProps>(({ size = 16, color, style, ...props }, ref) => (
  <svg
    ref={ref}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color ?? "currentColor"}
    strokeWidth={2}
    strokeLinecap="round"
    style={{ display: "inline-block", flexShrink: 0, ...style }}
    {...props}
  >
    <path d="M11 5H4" />
    <path d="M7 9H4" />
    <path d="M3 13h4" />
    <path d="M17 5v14" />
    <path d="M21 9l-4-4-4 4" />
    <path d="M21 15l-4 4-4-4" />
  </svg>
));
IconSorting.displayName = "IconSorting";

/** UROCK IconWastebasket — delete/trash icon. */
const IconWastebasket = React.forwardRef<SVGSVGElement, IconProps>(({ size = 16, color, style, ...props }, ref) => (
  <svg
    ref={ref}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color ?? "currentColor"}
    strokeWidth={2}
    strokeLinecap="round"
    style={{ display: "inline-block", flexShrink: 0, ...style }}
    {...props}
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
));
IconWastebasket.displayName = "IconWastebasket";

/** UROCK IconBackup — cloud backup/upload icon. */
const IconBackup = React.forwardRef<SVGSVGElement, IconProps>(({ size = 16, color, style, ...props }, ref) => (
  <svg
    ref={ref}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color ?? "currentColor"}
    strokeWidth={2}
    strokeLinecap="round"
    style={{ display: "inline-block", flexShrink: 0, ...style }}
    {...props}
  >
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
));
IconBackup.displayName = "IconBackup";

/** UROCK IconLoadingMotion — animated loading spinner icon. */
const IconLoadingMotion = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, color, style, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "rgb(var(--color-primary-01))"}
      strokeWidth={2.5}
      strokeLinecap="round"
      className={className ? `${className} animate-spin` : "animate-spin"}
      style={{ display: "inline-block", flexShrink: 0, ...style }}
      {...props}
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
);
IconLoadingMotion.displayName = "IconLoadingMotion";

export { IconDevice, IconMapping, IconSorting, IconWastebasket, IconBackup, IconLoadingMotion };
export { Eye, IconEye, type EyeProps } from "./eye";
