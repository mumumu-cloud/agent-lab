"use client";

import { useContext, useMemo, type Context } from "react";
import { cn } from "@workspace/ui/utils";

import {
  Table,
  TableBodyRenderer,
  TableHeaderRenderer,
} from "../cells";
import { useHorizontalScrollHint } from "../../hooks/use-horizontal-scroll-hint";
import type { TableBodyProps, TableModuleContextValue } from "../../types";

export function createTableBody<TData, TSource = unknown>(
  ModuleContext: Context<TableModuleContextValue<TData, TSource> | null>,
) {
  return function TableBody(props: TableBodyProps) {
    const { horizontalScrollHint, firstPinnedRow } = props;
    const ctx = useContext(ModuleContext);
    if (!ctx) {
      throw new Error("<TableModule.Body> must be rendered inside <TableModule>.");
    }

    const { table, sortState, sortTarget, onHeaderSortClick } = ctx;
    const columns = table.getAllLeafColumns();

    // table ref is stable; ctx.data is the real dependency that triggers re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const rows = useMemo(() => table.getRowModel().rows, [table, ctx.data]);

    const headerGroups = useMemo(() => {
      if (columns.length === 0) return [];
      return table.getHeaderGroups();
    }, [columns, table]);

    const { scrollRef, hiddenHeaderTexts, hintPos } = useHorizontalScrollHint({
      enabled: horizontalScrollHint,
      headerGroups,
    });

    return (
      <div className="relative w-full">
        <div ref={scrollRef} className={cn("overflow-x-auto")}>
          <div className="min-w-max">
            <Table>
              <TableHeaderRenderer
                headerGroups={headerGroups}
                sortState={sortState}
                sortTarget={sortTarget}
                onHeaderClick={onHeaderSortClick}
              />
              <TableBodyRenderer
                rows={rows}
                firstPinnedRow={firstPinnedRow}
                colSpan={columns.length}
              />
            </Table>
          </div>
        </div>

        {horizontalScrollHint && hiddenHeaderTexts.length > 0 && hintPos && (
          <div
            className="pointer-events-none absolute z-[3] flex items-center gap-[3px]"
            style={{ top: hintPos.top, left: hintPos.left }}
          >
            <svg
              width="5"
              height="8"
              viewBox="0 0 5 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 text-02-row"
            >
              <path d="M5 0L0 4L5 8V0Z" fill="currentColor" />
            </svg>
            <span className="text-02-row text-[14px] leading-[1.4] tracking-[-0.5px]">
              {hiddenHeaderTexts.join(", ")} 항목 있음
            </span>
          </div>
        )}
      </div>
    );
  };
}
