import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface NavBarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface NavBarProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  logo?: React.ReactNode;
  items?: NavBarItem[];
  activeId?: string;
  onSelect?: (item: NavBarItem) => void;
  /** Right-side action slot (buttons, avatar, icons) */
  actions?: React.ReactNode;
}

const NavBar = React.forwardRef<HTMLElement, NavBarProps>(
  ({ logo, items = [], activeId, onSelect, actions, className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "box-border flex h-[56px] w-full items-center border-b bg-00 line-01 px-[20px]",
          className,
        )}
        {...props}
      >
        {logo && (
          <>
            <div className="flex shrink-0 items-center gap-[10px]">{logo}</div>
            {items.length > 0 && <div className="mx-[16px] h-[20px] w-px shrink-0 line-01" />}
          </>
        )}
        {items.length > 0 && (
          <nav className="flex flex-1 items-center gap-[2px]">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect?.(item)}
                  className={cn(
                    "inline-flex items-center gap-[6px] rounded-[8px] px-[12px] py-[6px] text-[13px] font-medium tracking-[-0.3px] whitespace-nowrap text-02-row transition-colors duration-100",
                    isActive ? "font-semibold text-04-brand" : "hover:bg-01 hover:text-03-high",
                  )}
                >
                  {item.icon && <span className="flex w-[14px]">{item.icon}</span>}
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
        {actions && <div className="ml-auto flex shrink-0 items-center gap-[6px]">{actions}</div>}
      </header>
    );
  },
);
NavBar.displayName = "NavBar";

export { NavBar };
