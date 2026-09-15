import * as React from "react";

import { Card, type CardProps } from "./card";

export interface CardEvidenceProps extends Omit<CardProps, "title"> {
  title?: string;
  fileCount?: number;
  size?: string;
  hash?: string;
}

const CardEvidence = React.forwardRef<HTMLDivElement, CardEvidenceProps>(
  ({ title, fileCount, size, hash, ...props }, ref) => {
    return (
      <Card ref={ref} title={title || "Evidence"} {...props}>
        <div className="text-[12px] text-02-row">
          {fileCount != null && <div>{fileCount} files</div>}
          {size && <div>Size: {size}</div>}
          {hash && <div className="mt-[4px] font-spoqa text-[11px]">{hash}</div>}
        </div>
      </Card>
    );
  },
);
CardEvidence.displayName = "CardEvidence";

export { CardEvidence };
