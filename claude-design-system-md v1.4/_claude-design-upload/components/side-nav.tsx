import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface SideNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface SideNavSection {
  label?: string;
  items: SideNavItem[];
}

export interface SideNavProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  logo?: React.ReactNode;
  sections: SideNavSection[];
  activeId?: string;
  onSelect?: (item: SideNavItem) => void;
  footer?: React.ReactNode;
  width?: number;
}

const SideNav = React.forwardRef<HTMLElement, SideNavProps>(
  ({ logo, sections, activeId, onSelect, footer, width = 220, style, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        style={{ width, ...style }}
        className={cn("box-border flex flex-col overflow-hidden border-r bg-00 line-01", className)}
        {...props}
      >
        {logo && (
          <div className="flex items-center justify-between px-[16px] pt-[16px] pb-[8px]">
            <div className="flex items-center gap-[8px]">{logo}</div>
          </div>
        )}
        {sections.map((section, si) => (
          <div key={si} className="mb-[4px]">
            {section.label && (
              <div className="px-[20px] pt-[6px] pb-[4px] text-[10px] font-semibold tracking-[0.6px] text-02-row uppercase">
                {section.label}
              </div>
            )}
            {section.items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect?.(item)}
                  className={cn(
                    "mx-[8px] my-[1px] flex w-[calc(100%-16px)] items-center gap-[10px] rounded-[8px] px-[16px] py-[8px] text-left text-[13px] font-medium tracking-[-0.3px] text-02-row transition-colors duration-100",
                    isActive
                      ? "bg-04 font-semibold text-04-brand"
                      : "hover:bg-01 hover:text-03-high",
                  )}
                >
                  {item.icon && <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center">{item.icon}</span>}
                  <span>{item.label}</span>
                  {item.badge && <span className="ml-auto shrink-0">{item.badge}</span>}
                </button>
              );
            })}
          </div>
        ))}
        {footer && <div className="mt-auto border-t px-[8px] py-[12px] line-00">{footer}</div>}
      </nav>
    );
  },
);
SideNav.displayName = "SideNav";

export { SideNav };
