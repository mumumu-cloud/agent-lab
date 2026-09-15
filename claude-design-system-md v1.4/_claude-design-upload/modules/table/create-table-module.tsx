"use client";

import { createTableBody } from "./components/compound/body";
import { createTableFilterSearch } from "./components/compound/filter-search";
import { createTablePagination } from "./components/compound/pagination";
import { createTableSearch } from "./components/compound/search";
import { TableToolbar } from "./components/compound/toolbar";
import { createUseTableModule } from "./hooks/use-table-module";
import { createTableContexts } from "./module/create-contexts";
import { createTableData } from "./module/table-data";
import { createTableModuleRoot } from "./module/table-module";
import { createTableQuery } from "./module/table-query";
import type { CreateTableModuleResult } from "./types";

/**
 * TData를 고정한 Table 컴포넌트 세트를 생성한다.
 * 한 파일에서 여러 Table을 쓰려면 Factory를 타입별로 별도 호출.
 *
 * @example
 * const { TableModule, TableQuery, useTableModule } = createTableModule<User>();
 */
export function createTableModule<TData, TSource = unknown>(): CreateTableModuleResult<TData, TSource> {
  const { SourceContext, ModuleContext } = createTableContexts<TData, TSource>();

  const TableQuery = createTableQuery<TData>(SourceContext);
  const TableData = createTableData<TData>(SourceContext);
  const TableModuleRoot = createTableModuleRoot<TData, TSource>(SourceContext, ModuleContext);
  const Body = createTableBody<TData, TSource>(ModuleContext);
  const Pagination = createTablePagination<TData, TSource>(ModuleContext);
  const Search = createTableSearch<TData, TSource>(ModuleContext);
  const FilterSearch = createTableFilterSearch<TData, TSource>(ModuleContext);
  const useTableModule = createUseTableModule<TData, TSource>(ModuleContext);

  const TableModule = Object.assign(TableModuleRoot, {
    Toolbar: TableToolbar,
    Search,
    FilterSearch,
    Body,
    Pagination,
  });

  return {
    TableQuery,
    TableData,
    TableModule,
    useTableModule,
  } as CreateTableModuleResult<TData, TSource>;
}
