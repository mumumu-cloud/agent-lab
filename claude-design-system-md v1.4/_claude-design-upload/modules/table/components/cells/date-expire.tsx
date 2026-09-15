import { ColumnDef, DeepKeys } from "@tanstack/react-table";
import _ from "lodash";
import DateCell from "./date-cell";
import HeaderCell from "./header-cell";
import { TableCellWrapper } from "./table-cell-wrapper";

interface Params<TData, K> {
  id?: string;
  key: K;
  headerText: string;
  options?: {
    size?: number;
  };
}

export type DateExpireFn<TData> = <K extends string = DeepKeys<TData> & string>(
  params: Params<TData, K>,
) => ColumnDef<TData>;

export const createDateExpireFn = <TData,>(): DateExpireFn<TData> => {
  return ({ id, headerText, key, options }) => ({
    id: id ?? String(key),
    accessorFn: (row) => _.get(row, key),
    meta: { headerText },
    header: () => <HeaderCell text={headerText} />,
    cell: (info) => (
      <TableCellWrapper width={info.column.getSize()}>
        <DateCell dateString={info.getValue() as string} />
      </TableCellWrapper>
    ),
    ...options,
  });
};
