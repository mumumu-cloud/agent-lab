import * as React from "react";

import { Card, type CardProps } from "./card";

export interface CardCaseAnalysisProps extends Omit<CardProps, "title" | "subtitle" | "headerAction"> {
  caseId?: string;
  analyst?: string;
  status?: React.ReactNode;
  findings?: React.ReactNode;
}

const CardCaseAnalysis = React.forwardRef<HTMLDivElement, CardCaseAnalysisProps>(
  ({ caseId, analyst, status, findings, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        title={caseId || "Case Analysis"}
        subtitle={analyst}
        headerAction={status && <span className="text-[11px] font-semibold text-success">{status}</span>}
        {...props}
      >
        {findings && <p className="text-[13px] leading-[1.5] text-02-row">{findings}</p>}
      </Card>
    );
  },
);
CardCaseAnalysis.displayName = "CardCaseAnalysis";

export { CardCaseAnalysis };
