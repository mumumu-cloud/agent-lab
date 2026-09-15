import "@tanstack/react-table";
import { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    sticky?: "left";
    headerText?: string;
    align?: "left" | "center";
    variant?: "select";
    sortable?: boolean;
  }
}
