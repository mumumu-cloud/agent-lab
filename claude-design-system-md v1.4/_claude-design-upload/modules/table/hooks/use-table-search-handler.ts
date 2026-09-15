"use client";

import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { useCallback } from "react";
import type { TableQueryParams } from "../types";

interface UseTableSearchHandlerParams<TRawResponse> {
  isUsingQueryFn: boolean;
  queryFn?: (queryString: string) => Promise<TRawResponse>;
  queryKey?: string;
  updateFilters: (filters: TableQueryParams["filters"]) => void;
  onSearchFilterChange?: (value: string, filterField?: string) => void;
}

type SearchHandler = (params: { value: string; filterField?: string }) => void;

// 모듈 스코프 debounce — 기존 동작과 동일 (design Risk 1에서 유지 결정)
const debounce = _.debounce((callback: () => void) => callback(), 300);

/**
 * 검색 필터 변경 핸들러를 반환합니다.
 * - queryFn 모드: updateFilters + queryClient.invalidateQueries 호출
 * - data 모드: onSearchFilterChange 콜백 호출
 *
 * 300ms debounce는 모듈 스코프로 공유됩니다 (기존 동작 유지).
 */
export function useTableSearchHandler<TRawResponse>(
  params: UseTableSearchHandlerParams<TRawResponse>,
): SearchHandler {
  const { isUsingQueryFn, queryFn, queryKey, updateFilters, onSearchFilterChange } = params;
  const queryClient = useQueryClient();

  return useCallback(
    ({ value, filterField }: { value: string; filterField?: string }) => {
      debounce(() => {
        if (isUsingQueryFn) {
          if (filterField && value) {
            updateFilters([{ field: filterField, value }]);
          } else {
            updateFilters(undefined);
          }
          if (queryKey) {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
          } else if (queryFn) {
            queryClient.invalidateQueries({
              queryKey: [queryFn.name ?? "table-data"],
            });
          }
        } else {
          onSearchFilterChange?.(value, filterField);
        }
      });
    },
    [isUsingQueryFn, queryFn, queryKey, updateFilters, onSearchFilterChange, queryClient],
  );
}
