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

export type AccountStateCellFn<TData> = (params: Params<TData>) => ColumnDef<TData>;

//장치 상태
export const createAccountStateCellFn = <TData,>(t: any): AccountStateCellFn<TData> => {
  return ({ key, headerText, options }) => ({
    accessorKey: key,
    meta: { headerText },
    header: () => <HeaderCell text={headerText} />,
    cell: (info) => (
      <TableCellWrapper width={info.column.getSize()}>
        {info.getValue() === "ACTIVE" && (
          <Text className={"text-success"}>{t("account.list.table.states.active")}</Text>
        )}
        {info.getValue() === "LOCKED" && (
          <div className={"flex"}>
            <span className={"custom-underline"}>{t("account.list.table.states.lock")}</span>
            {/* lock: Material Symbols Outlined "lock" (https://fonts.google.com/icons) */}
          </div>
        )}
        {info.getValue() === "DEACTIVE" && (
          <Text className={"text-error"}>{t("account.list.table.states.inactive")}</Text>
        )}
      </TableCellWrapper>
    ),
    size: 100,
    ...options,
  });
};
