"use client";
import { AlertDialog } from "@workspace/ui/components";
import { cn } from "@workspace/ui/utils";
import * as React from "react";

interface Props {
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  modalTitle?: string | React.ReactNode;
  modalDescription?: string | React.ReactNode;
  modalFooter?: React.ReactNode;
  contentClassName?: string;
}

function ModalModule(props: Props) {
  const { isOpen, onOpenChange, modalTitle, modalDescription, modalFooter, contentClassName } =
    props;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Content className={cn("max-w-lg", contentClassName)}>
        <AlertDialog.Header>
          <AlertDialog.Title asChild={typeof modalTitle !== "string"}>
            {modalTitle}
          </AlertDialog.Title>
          <AlertDialog.Description asChild={typeof modalDescription !== "string"}>
            {modalDescription}
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>{modalFooter}</AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}

export { ModalModule };
