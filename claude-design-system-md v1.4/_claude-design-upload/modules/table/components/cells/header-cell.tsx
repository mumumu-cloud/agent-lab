"use client";

import { cn } from "@workspace/ui/utils";

interface Props {
  text: string;
  className?: string;
  isSorting?: boolean;
}

function HeaderCell(props: Props) {
  const { text, className = "", isSorting = true } = props;
  return (
    <div className={cn("flex items-center", className)}>
      <span>{text}</span>
      {/* {isSorting && (
        <span className={"mb-[1px]"}>
          <SortingIcon width={"24"} height={"24"} />
        </span>
      )} */}
    </div>
  );
}

export default HeaderCell;
