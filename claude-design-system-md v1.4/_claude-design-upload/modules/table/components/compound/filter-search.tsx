"use client";

import { useContext, useEffect, useMemo, useState, type Context } from "react";
import _ from "lodash";
import SearchFilterInput from "../../search/search-filter";
import type { TableFilterSearchProps, TableModuleContextValue } from "../../types";

export function createTableFilterSearch<TData, TSource = unknown>(
  ModuleContext: Context<TableModuleContextValue<TData, TSource> | null>,
) {
  return function TableFilterSearch({
    filters,
    placeholder = "검색",
    defaultValue,
  }: TableFilterSearchProps) {
    const ctx = useContext(ModuleContext);
    if (!ctx) {
      throw new Error(
        "<TableModule.FilterSearch> must be rendered inside <TableModule>.",
      );
    }

    const [selectedField, setSelectedField] = useState(defaultValue ?? filters[0]?.value ?? "");
    const [searchValue, setSearchValue] = useState("");

    const debouncedUpdate = useMemo(
      () =>
        _.debounce((field: string, v: string) => {
          ctx.updateFilters(v ? [{ field, value: v }] : []);
        }, 300),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [ctx.updateFilters],
    );

    useEffect(() => () => debouncedUpdate.cancel(), [debouncedUpdate]);

    return (
      <div data-toolbar-trailing>
        <SearchFilterInput
          options={filters}
          selectedValue={selectedField}
          onSelectChange={(v) => {
            debouncedUpdate.cancel();
            setSelectedField(v);
            setSearchValue("");
            ctx.updateFilters([]);
          }}
          searchValue={searchValue}
          onSearchChange={(v, _type) => {  // eslint-disable-line @typescript-eslint/no-unused-vars
            setSearchValue(v);
            debouncedUpdate(selectedField, v);
          }}
          searchPlaceholder={placeholder}
          searchResult={[]}
          onSelectResultItem={() => {}}
        />
      </div>
    );
  };
}
