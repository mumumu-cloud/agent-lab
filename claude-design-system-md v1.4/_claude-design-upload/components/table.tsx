import { cn } from "@workspace/ui/utils";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import * as React from "react";

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  columns: TableColumn<T>[];
  data: T[];
  striped?: boolean;
  selectedRows?: (string | number)[];
  onRowClick?: (row: T) => void;
  onSort?: (key: string) => void;
  sortKey?: string;
  sortDir?: "asc" | "desc";
  emptyText?: string;
}

function SortIcon({ dir }: { dir?: "asc" | "desc" | null }) {
  if (dir === "asc") return <ArrowUp className="h-[12px] w-[12px]" />;
  if (dir === "desc") return <ArrowDown className="h-[12px] w-[12px]" />;
  return <ArrowUpDown className="h-[12px] w-[12px]" />;
}

const Table = React.forwardRef<HTMLDivElement, TableProps>(
  (
    {
      columns,
      data,
      striped = false,
      selectedRows = [],
      onRowClick,
      onSort,
      sortKey,
      sortDir,
      emptyText = "No data",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("w-full overflow-x-auto rounded-[10px] border line-01", className)} {...props}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-01">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width, textAlign: col.align ?? "left" }}
                  onClick={col.sortable ? () => onSort?.(col.key) : undefined}
                  className={cn(
                    "border-b px-[16px] py-[10px] text-[12px] font-semibold tracking-[-0.2px] whitespace-nowrap text-02-row select-none line-01",
                    col.sortable && "cursor-pointer hover:text-03-high",
                  )}
                >
                  <span className="inline-flex items-center gap-[5px]">
                    {col.label}
                    {col.sortable && <SortIcon dir={sortKey === col.key ? sortDir : null} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-[16px] py-[40px] text-center text-[13px] text-02-row">
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row, ri) => {
                const rowId = (row.id as string | number | undefined) ?? ri;
                const selected = selectedRows.includes(rowId);
                return (
                  <tr
                    key={rowId}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={cn(
                      "border-b transition-colors duration-100 line-00 last:border-none hover:bg-03",
                      striped && ri % 2 === 1 && "bg-01",
                      selected && "bg-04",
                      onRowClick && "cursor-pointer",
                    )}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        style={{ textAlign: col.align ?? "left" }}
                        className="px-[16px] py-[12px] align-middle text-[13px] tracking-[-0.2px] text-03-high"
                      >
                        {col.render ? col.render(row[col.key], row) : (row[col.key] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
  },
);
Table.displayName = "Table";

export { Table };
