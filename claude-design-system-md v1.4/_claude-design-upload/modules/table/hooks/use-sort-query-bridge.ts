"use client";

import { useEffect } from "react";
import useColumnSort from "./use-column-sort";
import type { TableQueryParams } from "../types";

interface UseSortQueryBridgeParams {
  updateSort: (sort: TableQueryParams["sort"]) => void;
}

interface UseSortQueryBridgeReturn {
  onHeaderSortClick: (headerId: string) => void;
  sortState: "ASC" | "DESC" | null;
  sortTarget: string | null;
}

/**
 * useColumnSort의 상태 변화를 useTableQuery의 sort 파라미터로 전파합니다.
 * UI에서 필요한 핸들러와 표시 상태만 반환합니다.
 */
export function useSortQueryBridge(params: UseSortQueryBridgeParams): UseSortQueryBridgeReturn {
  const { updateSort } = params;
  const { onHeaderSortClick, sortState, sortTarget, sortQueryParams } = useColumnSort({});

  useEffect(() => {
    if (sortQueryParams.sortField && sortQueryParams.sortDirection) {
      updateSort({
        field: sortQueryParams.sortField,
        direction: sortQueryParams.sortDirection.toLowerCase() as "asc" | "desc",
      });
    } else {
      updateSort(null);
    }
  }, [sortQueryParams, updateSort]);

  return { onHeaderSortClick, sortState, sortTarget };
}
