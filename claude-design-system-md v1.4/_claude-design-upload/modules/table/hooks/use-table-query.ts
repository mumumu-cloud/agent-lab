"use client";

import { useCallback, useState } from "react";
import { TableQueryParams } from "../types";

interface UseTableQueryReturn {
  queryParams: TableQueryParams;
  updatePagination: (page: number, pageSize: number) => void;
  updateFilters: (filters: TableQueryParams["filters"]) => void;
  updateSort: (sort: TableQueryParams["sort"]) => void;
  resetQuery: () => void;
}

export function useTableQuery(
  initialParams?: Partial<TableQueryParams>,
): UseTableQueryReturn {
  const [queryParams, setQueryParams] = useState<TableQueryParams>(() => ({
    page: 0,
    pageSize: 20,
    ...initialParams,
  }));

  const updatePagination = useCallback((page: number, pageSize: number) => {
    setQueryParams((prev) => ({ ...prev, page, pageSize }));
  }, []);

  const updateFilters = useCallback(
    (filters: TableQueryParams["filters"]) => {
      setQueryParams((prev) => ({
        ...prev,
        filters: filters && filters.length > 0 ? filters : undefined,
      }));
    },
    [],
  );

  const updateSort = useCallback((sort: TableQueryParams["sort"]) => {
    setQueryParams((prev) => ({ ...prev, sort }));
  }, []);

  const resetQuery = useCallback(() => {
    setQueryParams({ page: 0, pageSize: 20 });
  }, []);

  return {
    queryParams,
    updatePagination,
    updateFilters,
    updateSort,
    resetQuery,
  };
}
