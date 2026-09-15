import { ColumnDef, DeepKeys } from "@tanstack/react-table";
import _ from "lodash";
import { COUNTRY_CODE_MAP, COUNTRY_NAME_MAP } from "../../../constants";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";
import { ColumnOptions } from "../type";

interface Params<TData> {
  id?: string;
  key: DeepKeys<TData>;

  headerText: string;
  options?: ColumnOptions;
}

export type CountryColumnFn<TData> = (params: Params<TData>) => ColumnDef<TData>;

export const createCountryColumnFn = <TData,>(): CountryColumnFn<TData> => {
  return ({ id, key, headerText, options }) => ({
    id: id ?? String(key),
    accessorFn: (row) => _.get(row, key),
    meta: { headerText },
    header: () => <HeaderCell text={headerText} />,
    cell: (info) => {
      const value = info.getValue() as keyof typeof COUNTRY_NAME_MAP;
      return (
        <TableCellWrapper width={info.column.getSize()}>
          {COUNTRY_NAME_MAP[value]}
        </TableCellWrapper>
      );
    },
    size: 80,
    ...options,
  });
};
