"use client";

import type { HeaderGroup } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { computeHiddenHeaders } from "../utils/compute-hidden-headers";

interface UseHorizontalScrollHintParams {
  enabled?: boolean;
  headerGroups: HeaderGroup<any>[];
}

interface UseHorizontalScrollHintReturn {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  hiddenHeaderTexts: string[];
  hintPos: { top: number; left: number } | null;
}

/**
 * 가로 스크롤 시 sticky 컬럼 옆에 힌트를 표시하기 위한 훅.
 *
 * - enabled=false이면 no-op
 * - scrollRef가 연결된 요소의 scroll/resize 이벤트를 관찰하여
 *   숨겨진 컬럼의 headerText와 힌트 위치를 상태로 노출
 * - 측정은 computeHiddenHeaders 순수 함수에 위임
 */
export function useHorizontalScrollHint(
  params: UseHorizontalScrollHintParams,
): UseHorizontalScrollHintReturn {
  const { enabled, headerGroups } = params;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hiddenHeaderTexts, setHiddenHeaderTexts] = useState<string[]>([]);
  const [hintPos, setHintPos] = useState<{ top: number; left: number } | null>(null);

  // headerGroups 최신 참조를 effect 재실행 없이 읽기 위한 ref
  const headerGroupsRef = useRef(headerGroups);
  useEffect(() => {
    headerGroupsRef.current = headerGroups;
  }, [headerGroups]);

  useEffect(() => {
    if (!enabled) return;
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const recompute = () => {
      const headers = headerGroupsRef.current[0]?.headers ?? [];
      const { hidden, pos } = computeHiddenHeaders(scrollEl, headers);
      setHiddenHeaderTexts(hidden);
      setHintPos(pos);
    };

    recompute();
    scrollEl.addEventListener("scroll", recompute);
    const resizeObserver = new ResizeObserver(recompute);
    resizeObserver.observe(scrollEl);

    return () => {
      scrollEl.removeEventListener("scroll", recompute);
      resizeObserver.disconnect();
    };
  }, [enabled]);

  return { scrollRef, hiddenHeaderTexts, hintPos };
}
