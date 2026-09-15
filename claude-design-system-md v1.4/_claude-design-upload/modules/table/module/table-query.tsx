"use client";

import { useEffect, useMemo, useRef, type Context } from "react";
import { useTableData } from "../hooks/use-table-data";
import { useTableQuery } from "../hooks/use-table-query";
import type {
  ResResponse,
  TableQueryProps,
  TableSourceContextValue,
} from "../types";

export function createTableQuery<TData>(
  SourceContext: Context<TableSourceContextValue<TData> | null>,
) {
  return function TableQuery<TRawResponse = ResResponse<TData[]>>(
    props: TableQueryProps<TData, TRawResponse>,
  ) {
    const { queryFn, queryKey, responseAdapter, initQueryParams, children } = props;

    const initialParams = useMemo(() => initQueryParams ?? {}, [initQueryParams]);
    const { queryParams, updatePagination, updateFilters, updateSort } =
      useTableQuery(initialParams);

    // queryKey 변경 감지(배열 안정 비교용 해시) → page 자동 리셋. 첫 마운트 무시.
    const serializedKey = useMemo(() => JSON.stringify(queryKey), [queryKey]);
    const isFirstRender = useRef(true);
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      updatePagination(0, queryParams.pageSize ?? 20);
      // pageSize는 deps 제외 — 리셋은 queryKey 변경에만 반응.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serializedKey]);

    const { data, isLoading } = useTableData<TData, TRawResponse>({
      queryFn,
      queryParams,
      queryKey,
      responseAdapter,
    });

    const value = useMemo<TableSourceContextValue<TData>>(
      () => ({
        data,
        isLoading,
        queryParams,
        updatePagination,
        updateFilters,
        updateSort,
        isUsingQueryFn: true,
      }),
      [data, isLoading, queryParams, updatePagination, updateFilters, updateSort],
    );

    return <SourceContext.Provider value={value}>{children}</SourceContext.Provider>;
  };
}
