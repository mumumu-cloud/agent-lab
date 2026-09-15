"use client";
import { AlertDialog } from "@workspace/ui/components";
import * as React from "react";

import { cn } from "@workspace/ui/utils";

interface Props {
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;

  title?: string;
  className?: string;
  description?: string | React.ReactNode;
  footer?: React.ReactNode;
}

function DefaultModal(props: Props) {
  const { isOpen, onOpenChange, title, footer, description, className } = props;

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialog.Content className={cn("px-[48px] w-[600px]", className)}>
          <AlertDialog.Header>
            <AlertDialog.Title>{title}</AlertDialog.Title>

            <AlertDialog.Description
              className={"flex items-center justify-center font-semibold"}
              asChild={!(typeof description === "string")}
            >
              {description}
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer className={"h-[48px]"}>{footer}</AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
}

export { DefaultModal };
