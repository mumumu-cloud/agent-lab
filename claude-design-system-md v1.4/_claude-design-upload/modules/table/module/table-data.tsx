"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type Context } from "react";
import type {
  TableDataProps,
  TableQueryParams,
  TableSourceContextValue,
} from "../types";

export function createTableData<TData>(
  SourceContext: Context<TableSourceContextValue<TData> | null>,
) {
  return function TableData(props: TableDataProps<TData>) {
    const {
      data,
      page: pageProp,
      pageSize: pageSizeProp,
      onPageChange,
      onPageSizeChange,
      onQueryChange,
      initQueryParams,
      children,
    } = props;

    const [internalParams, setInternalParams] = useState<TableQueryParams>(
      () => ({
        page: 0,
        pageSize: 20,
        filters: [],
        sort: null,
        ...(initQueryParams ?? {}),
      }),
    );

    // Controlled props가 있으면 그 값을 우선 노출, 없으면 내부 state.
    const queryParams: TableQueryParams = useMemo(
      () => ({
        ...internalParams,
        ...(pageProp !== undefined ? { page: pageProp } : null),
        ...(pageSizeProp !== undefined ? { pageSize: pageSizeProp } : null),
      }),
      [internalParams, pageProp, pageSizeProp],
    );

    const onQueryChangeRef = useRef(onQueryChange);
    const onPageChangeRef = useRef(onPageChange);
    const onPageSizeChangeRef = useRef(onPageSizeChange);
    useEffect(() => {
      onQueryChangeRef.current = onQueryChange;
      onPageChangeRef.current = onPageChange;
      onPageSizeChangeRef.current = onPageSizeChange;
    });

    const isPageControlled = pageProp !== undefined;
    const isPageSizeControlled = pageSizeProp !== undefined;

    const updateAndNotify = useCallback(
      (updater: (prev: TableQueryParams) => TableQueryParams) => {
        setInternalParams((prev) => {
          const next = updater(prev);
          onQueryChangeRef.current?.(next);
          return next;
        });
      },
      [],
    );

    const updatePagination = useCallback(
      (nextPage: number, nextPageSize: number) => {
        if (isPageControlled) onPageChangeRef.current?.(nextPage);
        if (isPageSizeControlled) onPageSizeChangeRef.current?.(nextPageSize);
        updateAndNotify((prev) => ({
          ...prev,
          page: nextPage,
          pageSize: nextPageSize,
        }));
      },
      [isPageControlled, isPageSizeControlled, updateAndNotify],
    );

    const updateFilters = useCallback(
      (filters: TableQueryParams["filters"]) =>
        updateAndNotify((prev) => ({
          ...prev,
          page: 0,
          filters: filters && filters.length > 0 ? filters : undefined,
        })),
      [updateAndNotify],
    );
    const updateSort = useCallback(
      (sort: TableQueryParams["sort"]) =>
        updateAndNotify((prev) => {
          if (prev.sort === sort) return prev;
          return { ...prev, sort };
        }),
      [updateAndNotify],
    );

    const value = useMemo<TableSourceContextValue<TData>>(
      () => ({
        data,
        isLoading: false,
        queryParams,
        updatePagination,
        updateFilters,
        updateSort,
        isUsingQueryFn: false,
      }),
      [data, queryParams, updatePagination, updateFilters, updateSort],
    );

    return <SourceContext.Provider value={value}>{children}</SourceContext.Provider>;
  };
}
