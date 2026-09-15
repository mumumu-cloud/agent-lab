import type { ComponentType, ReactElement, ReactNode } from "react";
import type { ColumnDef, Row, RowModel, Table } from "@tanstack/react-table";
import type { QueryKey } from "@tanstack/react-query";

import type { DragSourceFactory } from "../dnd/types";
import type {
  AccountStateCellFn,
  ColumnFn,
  CountryColumnFn,
  CustomFn,
  DateExpireFn,
  DownloadCellFn,
  DragableColumnFn,
  LinkCellFn,
  SelectFn,
  StateCellFn,
} from "./components/cells";
import type { FilterOption } from "./search/search-filter";

export interface PageSummary {
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

/**
 * @deprecated Use TableQueryParams instead. This interface is for backward compatibility with existing API functions.
 */
export interface QueryParams {
  page?: string;
  size?: string;
  filterField?: string;
  filterValue?: string;
  filterType?: string;
  sortField?: string;
  sortDirection?: string;
  [key: string]: string | undefined;
}

/**
 * 범용 테이블 쿼리 파라미터 (백엔드 API 독립적)
 */
export interface TableQueryParams {
  /** 페이지 번호 (0-based) */
  page?: number;
  /** 페이지 크기 */
  pageSize?: number;
  /** 검색/필터 조건 (다중 필터 지원) */
  filters?: Array<{
    field: string;
    value: string;
  }>;
  /** 정렬 조건 */
  sort?: {
    field: string;
    direction: "asc" | "desc";
  } | null;
}

export interface TableResponse<TData> {
  content: TData[];
  pageSummary?: PageSummary;
}

export interface TableDragSourceContext<TData> {
  row: TData;
  selectedRows: TData[];
}

export type TableDndProps<TData, TSource> = DragSourceFactory<
  TableDragSourceContext<TData>,
  TSource
>;

export type ResResponse<T = object> = {
  error?: any;
  success: boolean;
  message: string | null;

  data: T extends any[]
    ? {
        content: T;
        page?: {
          first: boolean;
          offset: number;
          page: number;
          pageNumber: number;
          size: number;
          startNumber: number;
          unpaged: boolean;
          valid: boolean;
        };
        pageSummary?: PageSummary;
        totalPages?: number;
      }
    : T;
  timestamp: string;
};

/** 신규 API용 column helper 번들 (기존 RenderColumns와 분리 — DownLoad → Download 리네이밍) */
export interface NextRenderColumns<TData> {
  Column: ColumnFn<TData>;
  Select: SelectFn<TData>;
  Download: DownloadCellFn<TData>;
  Link: LinkCellFn<TData>;
  Custom: CustomFn<TData>;
  State: StateCellFn<TData>;
  AccountState: AccountStateCellFn<TData>;
  Country: CountryColumnFn<TData>;
  DateExpire: DateExpireFn<TData>;
  DragableColumn: DragableColumnFn<TData>;
}

/** 데이터 계층 Context value — <TableQuery> / <TableData>가 제공 */
export interface TableSourceContextValue<TData> {
  data: TableResponse<TData> | null | undefined;
  isLoading: boolean;
  queryParams: TableQueryParams;
  updatePagination: (page: number, size: number) => void;
  updateFilters: (filters: TableQueryParams["filters"]) => void;
  updateSort: (sort: TableQueryParams["sort"]) => void;
  isUsingQueryFn: boolean;
}

/** UI 계층 Context value — <TableModule>이 제공, useTableModule()로 접근 */
export interface TableModuleContextValue<TData, TSource = unknown> extends TableSourceContextValue<TData> {
  table: Table<TData>;
  selectedRows: TData[];
  sortState: "ASC" | "DESC" | null;
  sortTarget: string | null;
  onHeaderSortClick: (field: string) => void;
  dnd?: TableDndProps<TData, TSource>;
}

/** <TableQuery> props */
export interface TableQueryProps<TData, TRawResponse = ResResponse<TData[]>> {
  /** react-query 표준 QueryKey (readonly unknown[]). prefix 매칭 invalidation 가능. */
  queryKey: QueryKey;
  /** 내부 queryParams(page/pageSize/filters/sort)를 객체 그대로 받아 백엔드 호출. */
  queryFn: (params: TableQueryParams) => Promise<TRawResponse>;
  responseAdapter?: (response: TRawResponse) => TableResponse<TData>;
  initQueryParams?: Partial<TableQueryParams>;
  children: ReactNode;
}

/** <TableData> props */
export interface TableDataProps<TData> {
  data: TableResponse<TData>;
  /**
   * Controlled mode: 부모가 페이지 번호를 소유.
   * 미지정 시 uncontrolled (내부 state로 관리, 기존 동작 유지).
   */
  page?: number;
  /**
   * Controlled mode: 부모가 페이지 크기를 소유.
   * 미지정 시 uncontrolled.
   */
  pageSize?: number;
  /** Controlled mode 콜백: 사용자가 페이지를 변경했을 때 호출. */
  onPageChange?: (page: number) => void;
  /** Controlled mode 콜백: 사용자가 페이지 크기를 변경했을 때 호출. */
  onPageSizeChange?: (pageSize: number) => void;
  onQueryChange?: (params: TableQueryParams) => void;
  initQueryParams?: Partial<TableQueryParams>;
  children: ReactNode;
}

/** <TableModule> props */
export interface TableModuleProps<TData, TSource = unknown> {
  renderColumns: (params: NextRenderColumns<TData>) => ColumnDef<TData>[];
  getRowId?: (row: TData, index: number, parent?: Row<TData>) => string;
  onChangeSelectedRow?: (rowModel: RowModel<TData>) => void;
  dnd?: TableDndProps<TData, TSource>;
  /** 번역 함수. AccountState column 등 i18n이 필요한 helper가 사용. 미지정 시 identity fallback. */
  t?: (key: string) => string;
  children?: ReactNode;
}

/** <TableModule.Toolbar> props */
export interface TableToolbarProps {
  children?: ReactNode;
}

/** <TableModule.Search> props */
export interface TableSearchProps {
  placeholder?: string;
  field?: string;
}

/** <TableModule.FilterSearch> props */
export interface TableFilterSearchProps {
  filters: FilterOption[];
  placeholder?: string;
  defaultValue?: string;
}

/** <TableModule.Body> props */
export interface TableBodyProps {
  horizontalScrollHint?: boolean;
  firstPinnedRow?: () => ReactElement;
}

/** <TableModule.Pagination> props */
export interface TablePaginationProps {}

/** Factory 반환 타입 */
export interface CreateTableModuleResult<TData, TSource = unknown> {
  /**
   * 서버 fetch 모드. `TRawResponse`를 호출 시점에 명시하면 `responseAdapter` 타입이
   * 그대로 추론된다. 생략 시 `ResResponse<TData[]>`로 기본 처리.
   */
  TableQuery: <TRawResponse = ResResponse<TData[]>>(
    props: TableQueryProps<TData, TRawResponse>,
  ) => ReactElement | null;
  TableData: ComponentType<TableDataProps<TData>>;
  TableModule: ComponentType<TableModuleProps<TData, TSource>> & {
    Toolbar: ComponentType<TableToolbarProps>;
    Search: ComponentType<TableSearchProps>;
    FilterSearch: ComponentType<TableFilterSearchProps>;
    Body: ComponentType<TableBodyProps>;
    Pagination: ComponentType<TablePaginationProps>;
  };
  useTableModule: () => TableModuleContextValue<TData, TSource>;
}
