"use client";

import { useContext, type Context } from "react";
import { TablePaginationWrapper } from "../cells";
import type { TableModuleContextValue } from "../../types";

export function createTablePagination<TData, TSource = unknown>(
  ModuleContext: Context<TableModuleContextValue<TData, TSource> | null>,
) {
  return function TablePagination() {
    const ctx = useContext(ModuleContext);
    if (!ctx) {
      throw new Error(
        "<TableModule.Pagination> must be rendered inside <TableModule>.",
      );
    }

    const handlePaginationChange = ({ page, size }: { page: number; size: number }) =>
      ctx.updatePagination(page, size);

    return (
      <div className="relative mt-[10px] flex min-h-[40px] items-center">
        <TablePaginationWrapper
          pageSummary={ctx.data?.pageSummary}
          onQueryChange={handlePaginationChange}
        />
      </div>
    );
  };
}
