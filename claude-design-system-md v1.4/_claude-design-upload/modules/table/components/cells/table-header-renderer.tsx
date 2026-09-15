import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { cn } from "@workspace/ui/utils";
import { TableHead, TableHeader, TableRow } from "./table";

interface Props<TData> {
  headerGroups: HeaderGroup<TData>[];
  sortState: "ASC" | "DESC" | null;
  sortTarget: string | null;
  onHeaderClick: (headerId: string) => void;
}

function SortIcon({
  state,
}: {
  state: "active-asc" | "active-desc" | "inactive";
}) {
  const isActive = state !== "inactive";
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 6.875 4.79167"
      fill="none"
      className={cn(
        "shrink-0 text-01 transition-transform",
        isActive && "primary-01",
        state === "active-asc" && "rotate-180",
      )}
      aria-hidden
    >
      <path
        d="M0.3125 0.3125H6.5625M0.3125 2.39583H4.47917M0.3125 4.47917H1.97917"
        stroke="currentColor"
        strokeWidth="0.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TableHeaderRenderer = <TData,>({
  headerGroups,
  sortState,
  sortTarget,
  onHeaderClick,
}: Props<TData>) => {
  return (
    <TableHeader>
      {headerGroups &&
        headerGroups.map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const columnMeta = header.column.columnDef.meta;
              const sortable = columnMeta?.sortable === true;
              const active = sortable && sortTarget === header.id;
              const iconState: "active-asc" | "active-desc" | "inactive" =
                active && sortState === "ASC"
                  ? "active-asc"
                  : active && sortState === "DESC"
                    ? "active-desc"
                    : "inactive";
              return (
                <TableHead
                  onClick={
                    sortable
                      ? () => {
                          onHeaderClick(header.id);
                        }
                      : undefined
                  }
                  key={header.id}
                  className={cn(
                    "relative h-[52px] border-r border-r-line-01 bg-01 px-[16px] py-[14px] text-[14px] leading-[1.4] font-normal tracking-[-0.5px] whitespace-nowrap text-02-row",
                    sortable && "cursor-pointer",
                    (columnMeta?.align === "center" ||
                      (columnMeta?.align === undefined && header.getSize() <= 60)) &&
                      "text-center [&>div]:justify-center",
                    columnMeta?.variant === "select" && "px-0",
                    columnMeta?.sticky === "left" && "sticky left-0 z-[2]",
                  )}
                  style={{ width: header.getSize(), minWidth: header.getSize() }}
                >
                  <div className="flex items-center gap-[6px]">
                    {header.isPlaceholder
                      ? null
                      : (flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        ) as React.ReactNode)}
                    {sortable && <SortIcon state={iconState} />}
                  </div>
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="hover:line-01 data-[resizing=true]:line-03 absolute top-0 right-0 h-full w-[5px] cursor-col-resize touch-none opacity-0 select-none hover:opacity-100 data-[resizing=true]:opacity-100"
                      data-resizing={header.column.getIsResizing() ? true : undefined}
                    />
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
    </TableHeader>
  );
};

export default TableHeaderRenderer;
