"use client";

import { cn } from "@workspace/ui/utils";
import { ReactNode } from "react";
import { TableCell } from "./table";

interface TableCellWrapperProps {
  /** 셀 너비 */
  width?: number;
  /** 셀 내용 */
  children: ReactNode;
  /** 추가 className */
  className?: string;
  /** 추가 style */
  style?: React.CSSProperties;
  /** sticky 컬럼 여부 */
  sticky?: "left";
  /** 셀 정렬 */
  align?: "left" | "center";
  /** 셀 변형 */
  variant?: "select";
}

/**
 * 테이블 셀의 공통 스타일과 구조를 제공하는 래퍼 컴포넌트
 *
 * @important 모든 컬럼의 `cell` 함수는 반드시 `TableCell` 또는 `TableCellWrapper`를 반환해야 합니다.
 * `table-body-renderer`가 `TableCell`을 감싸지 않으므로, 각 컬럼이 직접 `TableCell` 구조를 제공해야 합니다.
 *
 * @example
 * ```tsx
 * cell: (info) => (
 *   <TableCellWrapper width={info.column.getSize()}>
 *     {info.getValue()}
 *   </TableCellWrapper>
 * )
 * ```
 *
 * 특수 케이스(예: 드래그 가능한 셀)는 직접 `TableCell`을 사용할 수 있습니다.
 */
export function TableCellWrapper({
  width,
  children,
  className,
  style,
  sticky,
  align,
  variant,
}: TableCellWrapperProps) {
  const shouldCenter =
    align === "center" || (align === undefined && width !== undefined && width <= 60);

  return (
    <TableCell
      className={cn(
        "h-[58px] border-r border-r-line-01 px-[16px] py-[19px] text-[13px] leading-[1.36] font-normal tracking-[-0.5px] text-03-high",
        variant === "select" && "px-0",
        sticky === "left" &&
          "sticky left-0 z-[1] bg-00 group-data-[state=selected]/row:bg-05-des",
        className,
      )}
      style={{
        width,
        minWidth: width,
        maxWidth: 500,
        wordBreak: "break-all",
        ...style,
      }}
    >
      <div
        className={cn(
          shouldCenter
            ? "flex h-full items-center justify-center text-center"
            : "line-clamp-1 text-ellipsis",
        )}
      >
        {children}
      </div>
    </TableCell>
  );
}
