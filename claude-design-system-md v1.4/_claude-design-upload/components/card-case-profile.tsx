import { cn } from "@workspace/ui/utils";
import * as React from "react";

import { Card, type CardProps } from "./card";

export interface CardCaseProfileProps extends Omit<CardProps, "title" | "subtitle"> {
  caseId?: string;
  type?: string;
  assignee?: string;
  priority?: string;
}

const CardCaseProfile = React.forwardRef<HTMLDivElement, CardCaseProfileProps>(
  ({ caseId, type, assignee, priority, ...props }, ref) => {
    return (
      <Card ref={ref} title={caseId || "Case Profile"} subtitle={type} {...props}>
        <div className="text-[13px] text-02-row">
          {assignee && <span>Assigned: {assignee}</span>}
          {priority && (
            <span className={cn("ml-[12px] font-semibold", priority === "High" ? "text-error" : "text-03-high")}>
              Priority: {priority}
            </span>
          )}
        </div>
      </Card>
    );
  },
);
CardCaseProfile.displayName = "CardCaseProfile";

export { CardCaseProfile };
