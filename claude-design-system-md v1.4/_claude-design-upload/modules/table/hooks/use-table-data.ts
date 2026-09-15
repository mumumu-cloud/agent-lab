import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { QueryKey } from "@tanstack/react-query";
import { ResResponse, TableQueryParams, TableResponse } from "../types";

const defaultAdapter = <TData>(response: ResResponse<TData[]>): TableResponse<TData> => ({
  content: response.data.content,
  pageSummary: response.data.pageSummary,
});

interface UseTableDataParams<TData, TRawResponse> {
  /** params 받아 원본 응답을 반환. */
  queryFn: (params: TableQueryParams) => Promise<TRawResponse>;
  /** 현재 파라미터. react-query key 및 queryFn 인자로 사용. */
  queryParams: TableQueryParams;
  /** 외부 캐시 키(외부 필터 등). */
  queryKey: QueryKey;
  responseAdapter?: (response: TRawResponse) => TableResponse<TData>;
}

interface UseTableDataReturn<TData, TRawResponse> {
  data: TableResponse<TData> | null;
  rawData: TRawResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useTableData = <TData, TRawResponse = ResResponse<TData[]>>({
  queryFn,
  queryParams,
  queryKey,
  responseAdapter,
}: UseTableDataParams<TData, TRawResponse>): UseTableDataReturn<TData, TRawResponse> => {
  const _queryKey = useMemo<QueryKey>(
    () => [...queryKey, queryParams],
    [queryKey, queryParams],
  );

  const {
    data: rawData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: _queryKey,
    queryFn: () => queryFn(queryParams),
    placeholderData: keepPreviousData,
    enabled: !!queryFn,
  });

  const data = useMemo(() => {
    if (!rawData) return null;
    if (responseAdapter) return responseAdapter(rawData);
    return defaultAdapter(rawData as unknown as ResResponse<TData[]>);
  }, [rawData, responseAdapter]);

  return { data, rawData, isLoading, isError, error };
};
