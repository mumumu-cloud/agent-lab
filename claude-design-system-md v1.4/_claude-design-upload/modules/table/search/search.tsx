"use client";

import { FilterOption } from "./search-filter";
import { ReactNode } from "react";

export type SearchFilterProps =
  | {
      /** 검색 타입: "single" (단일 검색) 또는 "filter" (필터 선택 + 검색) */
      type?: "single" | "filter";
      /** 단일 검색용: 검색할 필드명 (type이 "single"일 때 필수) */
      filterField?: string;
      /** 검색 입력란 placeholder */
      placeholder?: string;
      /** 필터 검색용: 필터 옵션 목록 (type이 "filter"일 때 필수) */
      selectItems?: FilterOption[];
      /** 필터 검색용: 기본 선택값 (type이 "filter"일 때 사용) */
      defaultValue?: FilterOption[][number]["value"];
      /** 커스텀 검색 컴포넌트 렌더링 함수 */
      render?: (
        onChange: (value: string, field?: string) => void,
      ) => ReactNode;
    }
  | {
      /** 하위 호환성: 기존 형태 (selectItems, defaultValue만 제공) */
      type?: never;
      selectItems: FilterOption[];
      defaultValue: FilterOption[][number]["value"];
      filterField?: never;
      placeholder?: never;
      render?: never;
    };
