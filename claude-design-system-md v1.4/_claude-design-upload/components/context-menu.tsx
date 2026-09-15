"use client";

import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface ContextMenuItem {
  type?: "item" | "separator";
  label?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
}

export interface ContextMenuProps {
  /** The element that opens the menu on click */
  trigger: React.ReactNode;
  items: ContextMenuItem[];
  /** Panel alignment relative to trigger */
  align?: "left" | "right";
  style?: React.CSSProperties;
  className?: string;
}

const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ trigger, items, align = "left", style, className }, forwardedRef) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(forwardedRef, () => containerRef.current as HTMLDivElement);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
      <div ref={containerRef} className={cn("relative inline-block", className)} style={style}>
        <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
        {open && (
          <div
            data-state={open ? "open" : "closed"}
            className={cn(
              "absolute top-[calc(100%+4px)] z-[300] min-w-[180px] rounded-[10px] border bg-00 line-01 px-[4px] py-[6px] shadow-black-04",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
              align === "right" ? "right-0 origin-top-right" : "left-0 origin-top-left",
            )}
          >
            {items.map((item, i) =>
              item.type === "separator" ? (
                <div key={i} className="mx-[8px] my-[4px] h-px line-00" />
              ) : (
                <button
                  key={i}
                  type="button"
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.disabled) return;
                    setOpen(false);
                    item.onClick?.();
                  }}
                  className={cn(
                    "flex w-full items-center gap-[8px] rounded-[7px] px-[12px] py-[8px] text-left text-[13px] font-medium tracking-[-0.3px] text-03-high transition-colors duration-100 hover:bg-03",
                    "disabled:cursor-not-allowed disabled:opacity-40",
                    item.danger && "text-error hover:soft-red-light",
                  )}
                >
                  {item.icon && <span className="flex w-[16px] shrink-0">{item.icon}</span>}
                  <span className="flex-1">{item.label}</span>
                  {item.shortcut && <span className="ml-auto text-[11px] text-02-row">{item.shortcut}</span>}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    );
  },
);
ContextMenu.displayName = "ContextMenu";

export { ContextMenu };
