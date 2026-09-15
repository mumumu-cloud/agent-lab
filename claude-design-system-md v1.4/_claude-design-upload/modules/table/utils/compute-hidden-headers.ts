import type { Header } from "@tanstack/react-table";

interface ComputeHiddenHeadersResult {
  hidden: string[];
  pos: { top: number; left: number } | null;
}

/**
 * 가로 스크롤 컨테이너와 헤더 배열을 받아 "화면 밖으로 밀려난" 컬럼의
 * headerText 목록과 힌트 표시 위치를 계산합니다.
 *
 * sticky=left 컬럼은 항상 보이는 것으로 간주하여 제외합니다.
 * headerText가 없는 컬럼도 제외합니다.
 *
 * @returns hidden 텍스트 배열과 section 기준 absolute 위치. th가 없으면 pos=null.
 */
export function computeHiddenHeaders(
  scrollEl: HTMLDivElement,
  headers: Header<any, unknown>[],
): ComputeHiddenHeadersResult {
  const ths = scrollEl.querySelectorAll<HTMLElement>("th");
  if (ths.length === 0) {
    return { hidden: [], pos: null };
  }

  const stickyColWidth = ths[0]?.offsetWidth ?? 0;
  const scrollLeft = scrollEl.scrollLeft;
  const visibleEdge = scrollLeft + stickyColWidth;

  const indicatorHeight = 20;
  const pos = {
    top: scrollEl.offsetTop - indicatorHeight - 2,
    left: scrollEl.offsetLeft + stickyColWidth + 6,
  };

  const hidden: string[] = [];
  for (let i = 0; i < ths.length; i++) {
    const th = ths[i];
    const header = headers[i];
    if (!th || !header) continue;
    if (header.column.columnDef.meta?.sticky === "left") continue;
    const right = th.offsetLeft + th.offsetWidth;
    if (right > visibleEdge) continue;
    const text = header.column.columnDef.meta?.headerText;
    if (!text) continue;
    hidden.push(text);
  }

  return { hidden, pos };
}
