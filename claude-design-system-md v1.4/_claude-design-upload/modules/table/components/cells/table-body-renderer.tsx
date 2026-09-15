import { flexRender, Row } from "@tanstack/react-table";
import React, { ReactElement } from "react";
import { TableBody, TableCell, TableRow } from "./table";

interface Props<TData> {
  rows: Row<TData>[];
  firstPinnedRow?: () => ReactElement;
  /** "No results." 빈 행이 차지할 컬럼 수. 미지정 시 1 (구버전 호환). */
  colSpan?: number;
}

const TableBodyRenderer = <TData,>({ rows, firstPinnedRow, colSpan = 1 }: Props<TData>) => {
  return (
    <TableBody>
      {firstPinnedRow?.()}
      {rows.length ? (
        rows.map((row) => (
          <TableRow
            key={row.id}
            className="group/row"
            data-state={row.getIsSelected() ? "selected" : undefined}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <React.Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext()) as React.ReactNode}
                </React.Fragment>
              );
            })}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={colSpan} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyRenderer;
