import { ColumnDef } from "@tanstack/react-table";

import { DownloadIcon } from "lucide-react";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Params<TData, K> {
  key: K;
  clickCallback: (data: TData) => void;
  headerText: string;
  options?: {
    size?: number;
    sticky?: "left";
  };
}

export type DownloadCellFn<TData> = <K extends string = keyof TData & string>(
  params: Params<TData, K>,
) => ColumnDef<TData>;

export const createDownloadCellFn = <TData,>(): DownloadCellFn<TData> => {
  return ({ clickCallback, headerText, key, options }) => {
    const { sticky, ...restOptions } = options ?? {};
    return {
      id: "download",
      accessorKey: key,
      meta: { sticky, headerText },
      header: () => <HeaderCell className={"flex justify-center"} text={headerText} />,
      cell: (info) => (
        <TableCellWrapper
          width={info.column.getSize()}
          className="border-l line-00"
          sticky={sticky}
        >
          <span className={"flex justify-center"} onClick={() => clickCallback(info.row.original)}>
            <DownloadIcon className={"text-03-high"} />
          </span>
        </TableCellWrapper>
      ),
      size: 120,
      ...restOptions,
    };
  };
};
