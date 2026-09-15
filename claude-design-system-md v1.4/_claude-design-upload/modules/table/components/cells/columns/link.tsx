import { ColumnDef, DeepKeys } from "@tanstack/react-table";
import _ from "lodash";
import { ReactNode } from "react";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Options {
  size?: number;
  sticky?: "left";
}

interface Params<TData> {
  id?: string;
  key: DeepKeys<TData>;
  headerText: string;
  onClick?: (data: TData) => void;
  options?: Options;
}

export type LinkCellFn<TData> = (params: Params<TData>) => ColumnDef<TData>;

export const createLinkCellFn = <TData,>(): LinkCellFn<TData> => {
  return ({ key, headerText, onClick, options, id }) => {
    const { sticky, ...restOptions } = options ?? {};
    return {
      id: id ?? String(key),
      accessorFn: (row) => _.get(row, key),
      meta: { sticky, headerText },
      header: () => <HeaderCell text={headerText} />,
      cell: (info) => (
        <TableCellWrapper width={info.column.getSize()} sticky={sticky}>
          {info.getValue() === null ? (
            "-"
          ) : (
            <span className={"primary-underline"} onClick={() => onClick?.(info.row.original)}>
              {info.getValue() as ReactNode}
            </span>
          )}
        </TableCellWrapper>
      ),
      size: 150,
      ...restOptions,
    };
  };
};
