"use client";

import { useMemo, useState } from "react";

interface Props {}

interface SortQueryParams {
  sortField?: string;
  sortDirection?: string;
}

function useColumnSort(props: Props) {
  const [sortState, setSortState] = useState<[string, "DESC" | "ASC"] | null>();

  const onHeaderSortClick = (headerId: string) => {
    if (sortState && sortState[0] === headerId) {
      if (sortState[1] === "DESC") {
        setSortState([headerId, "ASC"]);
        return;
      }

      if (sortState[1] === "ASC") {
        setSortState([headerId, "DESC"]);
        return;
      }
    }
    setSortState([headerId, "DESC"]);
  };

  const sortQueryParams = useMemo((): SortQueryParams => {
    if (!sortState) return {};
    return {
      sortField: sortState[0],
      sortDirection: sortState[1],
    };
  }, [sortState]);

  return {
    onHeaderSortClick,
    sortTarget: sortState ? sortState[0] : null,
    sortState: sortState ? sortState[1] : null,
    sortQueryParams,
  };
}

export default useColumnSort;
