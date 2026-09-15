import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@workspace/ui/components";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Options {
  size?: number;
}

interface Params<TData> {
  key: keyof TData;
  headerText: string;
  options?: Options;
}

export type StateCellFn<TData> = (params: Params<TData>) => ColumnDef<TData>;

//장치 상태
export const createStateCellFn = <TData,>(): StateCellFn<TData> => {
  return ({ key, headerText, options }) => ({
    accessorKey: key,
    meta: { headerText },
    header: () => <HeaderCell text={headerText} />,
    cell: (info) => (
      <TableCellWrapper width={info.column.getSize()}>
        {info.getValue() === "active" && <Text className={"text-success"}>Active</Text>}
        {info.getValue() === "expired" && <Text className={"text-error"}>Expired</Text>}
      </TableCellWrapper>
    ),
    size: 100,
    ...options,
  });
};
