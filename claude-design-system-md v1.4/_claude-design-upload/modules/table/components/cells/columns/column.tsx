"use client";
import { ColumnDef, DeepKeys } from "@tanstack/react-table";
import _ from "lodash";
import React from "react";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Params<K> {
  id?: string;
  key: K;
  headerText: string;
  options?: {
    size?: number;
    sticky?: "left";
    sortable?: boolean;
  };
}

export type ColumnFn<TData> = <K extends string = DeepKeys<TData> & string>(
  params: Params<K>,
) => ColumnDef<TData>;

export const createColumnFn = <TData,>(): ColumnFn<TData> => {
  return ({ key, headerText, options, id }) => {
    const { sticky, sortable, ...restOptions } = options ?? {};
    return {
      id: id ?? String(key),
      accessorFn: (row) => _.get(row, key),
      meta: { sticky, headerText, sortable },
      header: () => <HeaderCell text={headerText} />,
      cell: (info) => (
        <TableCellWrapper width={info.column.getSize()} sticky={sticky}>
          {info.getValue() as React.ReactNode}
        </TableCellWrapper>
      ),
      ...restOptions,
    };
  };
};
