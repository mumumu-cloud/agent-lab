"use client";

import { useContext, useEffect, useMemo, useState, type Context } from "react";
import _ from "lodash";
import SearchInput from "../../search/search-input";
import type { TableModuleContextValue, TableSearchProps } from "../../types";

export function createTableSearch<TData, TSource = unknown>(
  ModuleContext: Context<TableModuleContextValue<TData, TSource> | null>,
) {
  return function TableSearch({ placeholder = "검색", field }: TableSearchProps) {
    const ctx = useContext(ModuleContext);
    if (!ctx) {
      throw new Error("<TableModule.Search> must be rendered inside <TableModule>.");
    }

    const [value, setValue] = useState("");

    const { updateFilters } = ctx;

    const debouncedUpdate = useMemo(
      () =>
        _.debounce((v: string) => {
          updateFilters(v ? [{ field: field ?? "", value: v }] : []);
        }, 300),
      [updateFilters, field],
    );

    useEffect(() => () => debouncedUpdate.cancel(), [debouncedUpdate]);

    return (
      <div data-toolbar-trailing>
        <SearchInput
          value={value}
          onSearchChange={(v) => {
            setValue(v);
            debouncedUpdate(v);
          }}
          placeholder={placeholder}
          isVisibleResult={false}
          searchResult={[]}
          onSelectResultItem={() => {}}
        />
      </div>
    );
  };
}
