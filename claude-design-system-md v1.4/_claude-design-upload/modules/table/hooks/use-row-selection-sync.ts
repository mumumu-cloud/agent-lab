"use client";

import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import type { Row, RowModel, Table } from "@tanstack/react-table";
import type { TableResponse } from "../types";
import { filterStaleSelection } from "../utils/filter-stale-selection";

interface UseRowSelectionSyncParams<TData> {
  data: TableResponse<TData> | null | undefined;
  table: Table<TData>;
  rowSelection: Record<string, boolean>;
  setRowSelection: Dispatch<SetStateAction<Record<string, boolean>>>;
  getRowId?: (row: TData, index: number, parent?: Row<TData>) => string;
  onChangeSelectedRow?: (rowModel: RowModel<TData>) => void;
}

/**
 * rowSelection 상태를 data 변경·외부 콜백과 동기화합니다.
 * 상태 자체는 TableModule 본체가 소유하며, 이 훅은 effect만 담당합니다.
 *
 * - data 변경 시: 현재 data에 없는 stale id를 rowSelection에서 제거
 * - rowSelection 변경 시: onChangeSelectedRow 콜백으로 상위에 통지
 */
export function useRowSelectionSync<TData>(params: UseRowSelectionSyncParams<TData>): void {
  const { data, table, rowSelection, setRowSelection, getRowId, onChangeSelectedRow } = params;

  // stale id 정리
  useEffect(() => {
    if (!data?.content) return;
    setRowSelection((prev) => filterStaleSelection(prev, data, getRowId));
  }, [data, getRowId, setRowSelection]);

  // 외부 콜백 통지
  useEffect(() => {
    onChangeSelectedRow?.(table.getSelectedRowModel());
  }, [onChangeSelectedRow, table, rowSelection]);
}
