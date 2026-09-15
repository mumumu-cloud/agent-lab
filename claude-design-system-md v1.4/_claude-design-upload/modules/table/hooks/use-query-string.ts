"use client";
import { useCallback, useMemo, useState } from "react";
import { QueryParams } from "../types";

interface Props {}

const getInitSet = () => {
  const initSet = new Set<string>();

  return initSet;
};

function useQueryString(props: Props) {
  const [_queryStringMap, _setQueryStringMap] = useState<Set<string>>(getInitSet());

  const resetQueryString = useCallback(() => {
    _setQueryStringMap(getInitSet());
  }, []);

  const setQueryString = useCallback((key: string, value: string) => {
    _setQueryStringMap((prev) => {
      const newSet = new Set(prev);

      for (const entry of newSet) {
        if (entry.startsWith(`${key}=`)) {
          newSet.delete(entry);
        }
      }

      // 새 값을 인코딩해서 추가
      newSet.add(`${key}=${encodeURIComponent(value)}`);

      return newSet;
    });
  }, []);

  const queryString = useMemo(() => {
    return Array.from(_queryStringMap).join("&");
  }, [_queryStringMap]);

  // queryString을 객체로 변환
  const queryParams = useMemo(() => {
    const params: QueryParams = {};
    _queryStringMap.forEach((entry) => {
      const [key, value] = entry.split("=");
      if (key && value) {
        params[key] = decodeURIComponent(value);
      }
    });
    return params;
  }, [_queryStringMap]);

  return { queryString, queryParams, setQueryString, resetQueryString };
}

export default useQueryString;
