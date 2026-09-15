"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination";
import { cn } from "@workspace/ui/utils";

interface Props {
  onChangePage: (page: number) => void;
  curPage: number;

  appearCount?: number; // 화면에 보일 페이지 번호 개수
  totalPages: number;
  labels?: {
    prevPage?: string;
    nextPage?: string;
    page?: (n: number) => string;
  };
}

export function PaginationModule(props: Props) {
  const { appearCount = 3, curPage, onChangePage, totalPages, labels } = props;
  const pageLabel = labels?.page ?? ((n: number) => `페이지 ${n}`);

  // 총 페이지 수가 0인 경우 렌더링하지 않음
  if (totalPages === 0) return null;

  const onClickPagination = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onChangePage(page);
  };

  // 현재 페이지와 totalPages, 화면에 보여줄 appearCount를 기반으로 시작페이지와 끝페이지를 계산하는 헬퍼 함수
  const getPageRange = (curPage: number, totalPages: number, appearCount: number) => {
    if (totalPages <= appearCount) {
      return { startPage: 1, endPage: totalPages };
    }
    const half = Math.floor(appearCount / 2);
    let startPage = curPage - half;
    let endPage = curPage + half;

    // appearCount가 짝수일 경우 시작 페이지를 살짝 오른쪽으로 조정
    if (appearCount % 2 === 0) {
      startPage = curPage - half + 1;
    }

    if (startPage < 1) {
      startPage = 1;
      endPage = appearCount;
    } else if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - appearCount + 1;
    }
    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageRange(curPage, totalPages, appearCount);

  return (
    <Pagination>
      <PaginationContent className="select-none">
        {/* 이전 버튼: 첫 페이지에서는 클릭 불가능 (비활성화 스타일 적용) */}
        <PaginationItem>
          <PaginationPrevious
            className={cn("cursor-pointer", curPage === 1 && "cursor-not-allowed opacity-50")}
            onClick={() => curPage > 1 && onClickPagination(curPage - 1)}
            aria-label={labels?.prevPage ?? "이전 페이지"}
          />
        </PaginationItem>

        {/* 좌측 페이지 표시: 첫 페이지가 현재 페이지 범위 시작보다 앞에 있으면 표시 */}
        {startPage > 1 && (
          <>
            <PaginationItem>
              <a
                className="cursor-pointer"
                onClick={() => onClickPagination(1)}
                aria-label={pageLabel(1)}
              >
                1
              </a>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {/* 계산된 페이지 번호 목록 렌더링 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <PaginationItem
              className="flex h-[36px] w-[36px] items-center justify-center"
              key={page}
            >
              <a
                className={cn(
                  "flex h-full w-full cursor-pointer items-center justify-center",
                  curPage === page && "rounded-frame-10 border line-03 bg-03",
                )}
                onClick={() => onClickPagination(page)}
                aria-label={pageLabel(page)}
                aria-current={curPage === page ? "page" : undefined}
              >
                {page}
              </a>
            </PaginationItem>
          );
        })}

        {/* 우측 페이지 표시: 마지막 페이지가 현재 페이지 범위 끝보다 뒤에 있으면 표시 */}
        {endPage < totalPages && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <a
                className="cursor-pointer"
                onClick={() => onClickPagination(totalPages)}
                aria-label={pageLabel(totalPages)}
              >
                {totalPages}
              </a>
            </PaginationItem>
          </>
        )}

        {/* 다음 버튼: 마지막 페이지에서는 클릭 불가능 (비활성화 스타일 적용) */}
        <PaginationItem>
          <PaginationNext
            className={cn(
              "cursor-pointer",
              curPage === totalPages && "cursor-not-allowed opacity-50",
            )}
            onClick={() => curPage < totalPages && onClickPagination(curPage + 1)}
            aria-label={labels?.nextPage ?? "다음 페이지"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
