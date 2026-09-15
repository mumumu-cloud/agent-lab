"use client";
import { useDraggable } from "@dnd-kit/core";
import { ColumnDef, Table } from "@tanstack/react-table";
import { cn } from "@workspace/ui/utils";
import type { TableDndProps } from "../../../types";
import CheckboxComponent from "../checkbox-component";
import { TableCell } from "../table";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Params {
  id: string;
  options?: Options;
}

interface Options {
  size?: number;
  sticky?: "left";
  dragHandle?: boolean;
  /** @deprecated Use dragHandle instead. */
  isDraggable?: boolean;
}

// 드래그 가능한 셀 컴포넌트 (TableCell 포함)
function DraggableSelectCell<TData, TSource>({
  row,
  table,
  columnWidth,
  getDragSource,
  sticky,
}: {
  row: {
    original: TData;
    getIsSelected: () => boolean;
    toggleSelected: (val: boolean) => void;
  };
  table: Table<TData>;
  columnWidth: number;
  getDragSource: NonNullable<TableDndProps<TData, TSource>["getDragSource"]>;
  sticky?: "left";
}) {
  const rowId =
    (row.original as { id?: string | number }).id?.toString() || JSON.stringify(row.original);

  // 선택된 모든 row 가져오기
  const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);
  const isCurrentRowSelected = row.getIsSelected();

  // 현재 row가 선택되어 있으면 선택된 모든 row를, 아니면 현재 row만 드래그
  const rowsToDrag =
    isCurrentRowSelected && selectedRows.length > 0 ? selectedRows : [row.original];
  const dragSource = getDragSource({
    row: row.original,
    selectedRows: rowsToDrag,
  });

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: rowId,
    data: dragSource ?? undefined,
    disabled: !dragSource,
  });

  const dragStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <TableCell
      className={cn(
        "h-[58px] cursor-move border-r border-r-line-01 px-0 py-[22px] text-[13px] leading-[1.36] font-normal tracking-[-0.5px] text-03-high",
        sticky === "left" &&
          "sticky left-0 z-[1] bg-00 group-data-[state=selected]/row:bg-05-des",
      )}
      style={{
        width: columnWidth,
        maxWidth: 500,
        wordBreak: "break-all",
      }}
    >
      <div
        ref={setNodeRef}
        className="relative flex h-full w-full touch-none items-center justify-center select-none"
        style={{
          ...dragStyle,
          opacity: isDragging ? 0.5 : 1,
        }}
        {...attributes}
        {...listeners}
      >
        <CheckboxComponent
          checked={row.getIsSelected()}
          onCheckedChange={(val) => row.toggleSelected(val)}
        />
      </div>
    </TableCell>
  );
}

export type SelectFn<TData> = (params: Params) => ColumnDef<TData>;

export const createSelectFn = <TData, TSource = never>(
  dnd?: TableDndProps<TData, TSource>,
): SelectFn<TData> => {
  return ({ id, options }) => {
    const { sticky, dragHandle, isDraggable, ...restOptions } = options ?? {};
    const shouldUseDragHandle = Boolean(dragHandle ?? isDraggable) && !!dnd?.getDragSource;

    return {
      id,
      meta: { sticky, align: "center", variant: "select" },
      header: ({ table }) => (
        <CheckboxComponent
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(val) => table.toggleAllRowsSelected(val)}
        />
      ),
      cell: ({ row, table, column }) =>
        shouldUseDragHandle && dnd?.getDragSource ? (
          <DraggableSelectCell
            row={row}
            table={table}
            columnWidth={column.getSize()}
            getDragSource={dnd.getDragSource}
            sticky={sticky}
          />
        ) : (
          <TableCellWrapper
            width={column.getSize()}
            sticky={sticky}
            align="center"
            variant="select"
          >
            <div className="flex items-center justify-center">
              <CheckboxComponent
                checked={row.getIsSelected()}
                onCheckedChange={(val) => row.toggleSelected(val)}
              />
            </div>
          </TableCellWrapper>
        ),
      size: shouldUseDragHandle ? 60 : 40,
      ...restOptions,
    };
  };
};
