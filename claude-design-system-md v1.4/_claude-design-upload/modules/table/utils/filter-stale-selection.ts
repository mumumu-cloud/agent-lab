import type { Row } from "@tanstack/react-table";
import type { TableResponse } from "../types";

type GetRowIdFn<TData> = (row: TData, index: number, parent?: Row<TData>) => string;

/**
 * 이전 rowSelection 객체에서 현재 data에 존재하지 않는 id를 제거합니다.
 * 변경이 없으면 입력 참조를 그대로 반환하여 불필요한 리렌더를 방지합니다.
 *
 * @param prev 이전 rowSelection (id → boolean 맵)
 * @param data 현재 테이블 데이터
 * @param getRowId 행 id 추출 함수 (없으면 인덱스를 id로 사용)
 * @returns 정리된 rowSelection. 변경 없으면 prev 동일 참조.
 */
export function filterStaleSelection<TData>(
  prev: Record<string, boolean>,
  data: TableResponse<TData> | null | undefined,
  getRowId?: GetRowIdFn<TData>,
): Record<string, boolean> {
  if (!data?.content) return prev;
  const currentIds = new Set(
    data.content.map((row, i) => (getRowId ? getRowId(row, i) : String(i))),
  );

  let changed = false;
  const next: Record<string, boolean> = {};
  for (const id in prev) {
    if (currentIds.has(id)) {
      next[id] = prev[id]!;
    } else {
      changed = true;
    }
  }
  return changed ? next : prev;
}
