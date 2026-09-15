"use client"

import { Text } from "@workspace/ui/components"
import { PaginationModule } from "@workspace/ui/modules"
import { PageSummary } from "../../../types"
import PageCountSelect from "../page-count-select"

interface PageListCountSelectProps {
  onChangePerPageCount: (count: number) => void
  perPageCount: number
}
const PageListCountSelect = (props: PageListCountSelectProps) => {
  const { onChangePerPageCount, perPageCount } = props
  return (
    <div className="absolute flex items-center gap-[8px]">
      <Text size={16} className={"text-02-row"}>
        {"1페이지당"}
      </Text>
      <PageCountSelect perPageCount={perPageCount} onChangePageCount={onChangePerPageCount} />
    </div>
  )
}

interface Props {
  page?: PageSummary
  onChangePage: (page: number) => void
  onChangePerPageCount: (count: number) => void
}

function Pagination(props: Props) {
  if (!props.page) return null

  const { onChangePerPageCount, onChangePage } = props
  const { pageNumber, totalPages, totalElements, numberOfElements, pageSize, last } = props.page
  return (
    <>
      <PageListCountSelect perPageCount={pageSize} onChangePerPageCount={onChangePerPageCount} />
      {/* pageNumber는 0-indexed(서버 응답), PaginationModule은 1-indexed 기대 → +1 보정 */}
      <PaginationModule curPage={pageNumber + 1} totalPages={totalPages} onChangePage={onChangePage} />
    </>
  )
}

export default Pagination
