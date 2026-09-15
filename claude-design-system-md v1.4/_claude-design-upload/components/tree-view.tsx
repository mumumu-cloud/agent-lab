"use client";

import { cn } from "@workspace/ui/utils";
import { ChevronRight } from "lucide-react";
import * as React from "react";

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
  children?: TreeNode[];
}

export interface TreeViewProps {
  items: TreeNode[];
  /** Currently selected node ID */
  activeId?: string;
  onSelect?: (node: TreeNode) => void;
  style?: React.CSSProperties;
  className?: string;
}

function TreeItemNode({
  item,
  level = 0,
  activeId,
  onSelect,
}: {
  item: TreeNode;
  level?: number;
  activeId?: string;
  onSelect?: (node: TreeNode) => void;
}) {
  const hasChildren = !!item.children?.length;
  const [open, setOpen] = React.useState(item.defaultOpen ?? (level === 0 && hasChildren));
  const isActive = activeId === item.id;

  return (
    <div className="flex flex-col">
      <div
        onClick={() => {
          if (hasChildren) setOpen((v) => !v);
          onSelect?.(item);
        }}
        style={{ paddingLeft: 8 + level * 4 }}
        className={cn(
          "flex min-h-[32px] cursor-pointer items-center gap-[6px] rounded-[7px] py-[6px] pr-[8px] transition-colors duration-100 select-none hover:bg-03",
          isActive && "bg-04",
        )}
      >
        <span
          className={cn(
            "flex h-[16px] w-[16px] shrink-0 items-center justify-center text-gray-03-icon-row transition-transform duration-150",
            hasChildren ? (open ? "rotate-90" : "") : "invisible",
          )}
        >
          {hasChildren && <ChevronRight className="h-[12px] w-[12px]" strokeWidth={2.5} />}
        </span>
        {item.icon && <span className="flex shrink-0 items-center text-gray-03-icon-row">{item.icon}</span>}
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-[13px] font-medium tracking-[-0.3px] text-03-high",
            isActive && "font-semibold text-04-brand",
          )}
        >
          {item.label}
        </span>
        {item.badge && <span className="shrink-0">{item.badge}</span>}
      </div>
      {hasChildren && open && (
        <div className="flex flex-col gap-[1px] pl-[20px]">
          {item.children!.map((child) => (
            <TreeItemNode key={child.id} item={child} level={level + 1} activeId={activeId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  ({ items, activeId, onSelect, style, className }, ref) => {
    return (
      <div ref={ref} style={style} className={cn("flex flex-col gap-[1px]", className)}>
        {items.map((item) => (
          <TreeItemNode key={item.id} item={item} activeId={activeId} onSelect={onSelect} />
        ))}
      </div>
    );
  },
);
TreeView.displayName = "TreeView";

export { TreeView };
