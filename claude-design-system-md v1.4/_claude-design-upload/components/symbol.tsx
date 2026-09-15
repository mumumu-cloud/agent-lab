import * as React from "react";

export interface SymbolProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
}

const Symbol = React.forwardRef<HTMLSpanElement, SymbolProps>(
  ({ size = 20, color, style, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          color: color ?? "currentColor",
          flexShrink: 0,
          ...style,
        }}
        {...props}
      />
    );
  },
);
Symbol.displayName = "Symbol";

export { Symbol };
