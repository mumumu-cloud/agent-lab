import { useContext, type Context } from "react";
import type { TableModuleContextValue } from "../types";

/**
 * Factory가 생성한 ModuleContext에서 값을 읽는 훅 팩토리.
 * 반환된 훅은 `<TableModule>` 내부에서만 호출해야 한다.
 */
export function createUseTableModule<TData, TSource = unknown>(
  ModuleContext: Context<TableModuleContextValue<TData, TSource> | null>,
) {
  return function useTableModule(): TableModuleContextValue<TData, TSource> {
    const ctx = useContext(ModuleContext);
    if (!ctx) {
      throw new Error(
        "useTableModule must be used inside <TableModule>. " +
          "Wrap your tree with <TableQuery> or <TableData> and render <TableModule> inside.",
      );
    }
    return ctx;
  };
}
