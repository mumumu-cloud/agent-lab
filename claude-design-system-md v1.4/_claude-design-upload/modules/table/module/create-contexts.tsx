import { createContext } from "react";
import type { TableModuleContextValue, TableSourceContextValue } from "../types";

/**
 * Factory에서 사용할 Context 쌍 생성 함수.
 * createTableModule<T>() 호출마다 새 Context 인스턴스를 만들어
 * 한 페이지에서 TData가 다른 여러 Table이 공존 가능하게 한다.
 */
export function createTableContexts<TData, TSource = unknown>() {
  const SourceContext = createContext<TableSourceContextValue<TData> | null>(null);
  const ModuleContext = createContext<TableModuleContextValue<TData, TSource> | null>(null);

  SourceContext.displayName = "TableSourceContext";
  ModuleContext.displayName = "TableModuleContext";

  return { SourceContext, ModuleContext };
}
