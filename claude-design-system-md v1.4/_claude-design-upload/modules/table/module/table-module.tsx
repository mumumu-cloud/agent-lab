"use client";

import { useContext, useMemo, useState, type Context } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import {
  createAccountStateCellFn,
  createColumnFn,
  createCountryColumnFn,
  createCustomFn,
  createDateExpireFn,
  createDownloadCellFn,
  createDragableColumnFn,
  createLinkCellFn,
  createSelectFn,
  createStateCellFn,
} from "../components/cells";
import { useRowSelectionSync } from "../hooks/use-row-selection-sync";
import { useSortQueryBridge } from "../hooks/use-sort-query-bridge";
import type {
  NextRenderColumns,
  TableModuleContextValue,
  TableModuleProps,
  TableSourceContextValue,
} from "../types";

export function createTableModuleRoot<TData, TSource = unknown>(
  SourceContext: Context<TableSourceContextValue<TData> | null>,
  ModuleContext: Context<TableModuleContextValue<TData, TSource> | null>,
) {
  return function TableModuleRoot(props: TableModuleProps<TData, TSource>) {
    const { renderColumns, getRowId, onChangeSelectedRow, dnd, t, children } = props;

    const source = useContext(SourceContext);
    if (!source) {
      throw new Error(
        "<TableModule> must be rendered inside <TableQuery> or <TableData>.",
      );
    }

    const columns = useMemo(() => {
      const translate = t ?? ((key: string) => key);
      const builder: NextRenderColumns<TData> = {
        Column: createColumnFn<TData>(),
        Select: createSelectFn<TData, TSource>(dnd),
        Download: createDownloadCellFn<TData>(),
        Link: createLinkCellFn<TData>(),
        Custom: createCustomFn<TData>(),
        State: createStateCellFn<TData>(),
        AccountState: createAccountStateCellFn<TData>(translate),
        Country: createCountryColumnFn<TData>(),
        DateExpire: createDateExpireFn<TData>(),
        DragableColumn: createDragableColumnFn<TData, TSource>(dnd),
      };
      return renderColumns(builder);
    }, [dnd, renderColumns, t]);

    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

    const table = useReactTable<TData>({
      data: source.data?.content ?? [],
      columns,
      getCoreRowModel: getCoreRowModel(),
      getRowId,
      state: { rowSelection },
      onRowSelectionChange: setRowSelection,
      defaultColumn: { size: 200, minSize: 50, maxSize: 500 },
      columnResizeMode: "onChange",
      enableColumnResizing: true,
      autoResetPageIndex: false,
    });

    useRowSelectionSync<TData>({
      data: source.data,
      table,
      rowSelection,
      setRowSelection,
      getRowId,
      onChangeSelectedRow,
    });

    const { sortState, sortTarget, onHeaderSortClick } = useSortQueryBridge({
      updateSort: source.updateSort,
    });

    const selectedRows = useMemo(
      () => table.getSelectedRowModel().rows.map((r) => r.original),
      // rowSelection is the actual dependency that changes when selection changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [table, rowSelection],
    );

    const value = useMemo<TableModuleContextValue<TData, TSource>>(
      () => ({
        ...source,
        table,
        selectedRows,
        sortState,
        sortTarget,
        onHeaderSortClick,
        dnd,
      }),
      [source, table, selectedRows, sortState, sortTarget, onHeaderSortClick, dnd],
    );

    return <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>;
  };
}
