import { ColumnDef, DeepKeys } from "@tanstack/react-table";
import _ from "lodash";
import { ReactNode } from "react";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Params<TData, K> {
  id?: string;
  key: K;
  headerText: string;
  renderCell: (data: TData) => ReactNode;
  options?: {
    size?: number;
    sticky?: "left";
    sortable?: boolean;
  };
}

export type CustomFn<TData> = <K extends string = DeepKeys<TData> & string>(
  params: Params<TData, K>,
) => ColumnDef<TData>;

export const createCustomFn = <TData,>(): CustomFn<TData> => {
  return ({ headerText, renderCell, key, options, id }) => {
    const { sticky, sortable, ...restOptions } = options ?? {};
    return {
      id: id ?? String(key),
      accessorFn: (row) => _.get(row, key),
      meta: { sticky, headerText, sortable },
      header: () => <HeaderCell text={headerText} />,
      cell: (info) => (
        <TableCellWrapper width={info.column.getSize()} sticky={sticky}>
          {renderCell(info.row.original)}
        </TableCellWrapper>
      ),
      ...restOptions,
    };
  };
};
