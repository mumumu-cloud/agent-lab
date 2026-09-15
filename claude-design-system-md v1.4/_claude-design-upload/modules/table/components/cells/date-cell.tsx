"use client";
import { cn } from "@workspace/ui/utils";
import { isExpirationStatus } from "../../utils";

interface Props {
  dateString: string;
}

/**
 * table에서 날짜를 나타내는 컴포넌트. 유효기간이 만료 직전이면 빨간색으료 표시됨.
 * @param props
 * @constructor
 */
function DateCell(props: Props) {
  const { dateString } = props;
  return (
    <span className={cn(isExpirationStatus(dateString) && "text-error")}>
      {new Date(dateString).toLocaleDateString("en-CA")}
    </span>
  );
}

export default DateCell;
