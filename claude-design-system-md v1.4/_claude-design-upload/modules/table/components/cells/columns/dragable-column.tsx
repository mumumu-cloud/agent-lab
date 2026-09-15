"use client";
import { useDraggable } from "@dnd-kit/core";
import { ColumnDef, DeepKeys, Table } from "@tanstack/react-table";
import { cn } from "@workspace/ui/utils";
import _ from "lodash";
import { ReactNode } from "react";
import type { TableDndProps } from "../../../types";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Params<K> {
  id?: string;
  key: K;
  headerText: string;
  options?: {
    size?: number;
  };
}

export type DragableColumnFn<TData> = <K extends string = DeepKeys<TData> & string>(
  params: Params<K>,
) => ColumnDef<TData>;

// 드래그 가능한 셀 컴포넌트
function DragableCell<TData, TSource>({
  row,
  table,
  value,
  getDragSource,
}: {
  row: TData;
  table: Table<TData>;
  value: ReactNode;
  getDragSource?: TableDndProps<TData, TSource>["getDragSource"];
}) {
  const rowId = (row as { id?: string | number }).id?.toString() || JSON.stringify(row);
  const selectedRows = table.getSelectedRowModel().rows.map((selectedRow) => selectedRow.original);
  const isCurrentRowSelected = table
    .getSelectedRowModel()
    .rows.some((selectedRow) => selectedRow.original === row);
  const rowsToDrag = isCurrentRowSelected && selectedRows.length > 0 ? selectedRows : [row];
  const dragSource = getDragSource?.({
    row,
    selectedRows: rowsToDrag,
  });

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: rowId,
    data: dragSource ?? undefined,
    disabled: !dragSource,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn("flex cursor-move touch-none items-center gap-2 select-none")}
    >
      {/* 드래그 핸들 아이콘 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4 w-4 shrink-0 text-gray-03-icon-row"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <span className={cn(isDragging && "opacity-50")}>{value}</span>
    </div>
  );
}

export const createDragableColumnFn = <TData, TSource = never>(
  dnd?: TableDndProps<TData, TSource>,
): DragableColumnFn<TData> => {
  return ({ key, headerText, options, id }) => ({
    id: id ?? String(key),
    accessorFn: (row) => _.get(row, key),
    meta: { headerText },
    header: () => <HeaderCell text={headerText} />,
    cell: (info) => (
      <TableCellWrapper width={info.column.getSize()}>
        <DragableCell
          row={info.row.original}
          table={info.table}
          value={info.getValue() as ReactNode}
          getDragSource={dnd?.getDragSource}
        />
      </TableCellWrapper>
    ),
    ...options,
  });
};
