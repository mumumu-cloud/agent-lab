import { useMemo, useRef } from "react";
import { PageSummary } from "../../../types";
import Pagination from "./pagination";

interface Props {
  pageSummary?: PageSummary;
  onQueryChange: (params: { page: number; size: number }) => void;
}

const TablePaginationWrapper = ({ pageSummary, onQueryChange }: Props) => {
  const pageRef = useRef<number>(0);
  const sizeRef = useRef<number>(20);

  const handlePageChange = (page: number) => {
    pageRef.current = page - 1;
    onQueryChange({
      page: pageRef.current,
      size: sizeRef.current,
    });
  };

  const handlePerPageCountChange = (count: number) => {
    sizeRef.current = count;
    onQueryChange({
      page: pageRef.current,
      size: sizeRef.current,
    });
  };

  const PaginationModule = useMemo(() => {
    return (
      <Pagination
        page={pageSummary}
        onChangePage={handlePageChange}
        onChangePerPageCount={handlePerPageCountChange}
      />
    );
  }, [pageSummary]);

  return PaginationModule;
};

export default TablePaginationWrapper;
