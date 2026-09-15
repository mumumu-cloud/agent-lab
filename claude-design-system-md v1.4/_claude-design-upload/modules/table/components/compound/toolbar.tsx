"use client";

import type { TableToolbarProps } from "../../types";

/**
 * Table 상단 툴바 컨테이너.
 * 자식에 `data-toolbar-trailing` 속성이 있으면 CSS로 우측 정렬됨.
 */
export function TableToolbar({ children }: TableToolbarProps) {
  return (
    <header className="mb-[20px] flex w-full items-center [&>[data-toolbar-trailing]]:ml-auto">
      {children}
    </header>
  );
}
