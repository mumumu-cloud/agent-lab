"use client";
import { AlertDialog } from "@workspace/ui/components";
import json_alert_activate from "@workspace/ui/public/lottie/json_alert_activate.json";
import json_alert_deactivate from "@workspace/ui/public/lottie/json_alert_deactivate.json";
import json_alert_error from "@workspace/ui/public/lottie/json_alert_error.json";
import json_alert_information from "@workspace/ui/public/lottie/json_alert_information.json";
import json_alert_success from "@workspace/ui/public/lottie/json_alert_success.json";
import json_alert_warning from "@workspace/ui/public/lottie/json_alert_warning.json";
import * as React from "react";

import ImgAlertQuestion from "@workspace/ui/modules/modal/img-alert-question";
import { cn } from "@workspace/ui/utils";
import { lazy } from "react";

const Lottie = lazy(() => import("lottie-react"));

interface Props {
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  type: "warning" | "error" | "info" | "success" | "question" | "activate" | "deactivate";
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  footer?: React.ReactNode;
}

interface ActionsProps {
  cancelText?: string;
  confirmText: string;
  onCancel?: () => void;
  onConfirm: () => void | Promise<void>;
  confirmVariant?: "primary" | "destructive";
}

const typeAnimation = {
  warning: json_alert_warning,
  info: json_alert_information,
  error: json_alert_error,
  success: json_alert_success,
  activate: json_alert_activate,
  deactivate: json_alert_deactivate,
  question: <ImgAlertQuestion />,
};

const FIGMA_SHADOW =
  "shadow-[0_2px_2px_rgba(15,15,15,0.01),0_3px_5px_rgba(15,15,15,0.01),0_7px_10px_rgba(15,15,15,0.02),0_24px_32px_rgba(15,15,15,0.03)]";

const ACTION_TEXT_BASE =
  "mt-0 cursor-pointer bg-transparent py-[12px] pl-[16px] pr-[10px] text-[20px] font-bold leading-[1.36] tracking-[-1px] shadow-none outline-none hover:bg-transparent";

function StateModalBase(props: Props) {
  const { isOpen, type, onOpenChange, footer, title, description, className } = props;
  const hasTitle = title !== undefined && title !== null && title !== "";

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Content
        className={cn(
          "bg-00 line-01 max-w-[560px] rounded-[20px] px-[48px] pt-[56px] pb-[36px]",
          FIGMA_SHADOW,
          className,
        )}
      >
        <AlertDialog.Header className="gap-[6px] space-y-0 text-center sm:text-center">
          {hasTitle ? (
            <AlertDialog.Title
              asChild={typeof title !== "string"}
              className="text-03-high text-center text-[24px] leading-[1.4] font-semibold tracking-[-1.3px]"
            >
              {title}
            </AlertDialog.Title>
          ) : (
            <AlertDialog.Title />
          )}
          <div className={"flex w-full justify-center"}>
            {type === "question" ? (
              <div id={"icon"} className={"absolute top-[-20%]"}>
                {typeAnimation[type]}
              </div>
            ) : (
              <div id={"icon"} className={"absolute top-[-35%]"}>
                <Lottie animationData={typeAnimation[type]} loop={false} />
              </div>
            )}
          </div>
          <AlertDialog.Description
            className={cn(
              hasTitle
                ? "text-02-row text-center text-[20px] leading-[1.36] font-medium tracking-[-1px]"
                : "flex h-[172px] items-center justify-center font-semibold",
            )}
            asChild={!(typeof description === "string")}
          >
            {description}
          </AlertDialog.Description>
        </AlertDialog.Header>
        {footer !== undefined && (
          <AlertDialog.Footer className={cn(hasTitle ? "" : "h-[48px]")}>
            {footer}
          </AlertDialog.Footer>
        )}
      </AlertDialog.Content>
    </AlertDialog>
  );
}

function Actions(props: ActionsProps) {
  const { cancelText, confirmText, onCancel, onConfirm, confirmVariant = "primary" } = props;
  const confirmColor = confirmVariant === "destructive" ? "text-error" : "text-04-brand";

  return (
    <div className="flex w-full items-center justify-end gap-[12px]">
      {cancelText ? (
        <>
          <AlertDialog.Cancel
            onClick={onCancel}
            className={cn(ACTION_TEXT_BASE, "text-03-high")}
          >
            {cancelText}
          </AlertDialog.Cancel>
          <div className="line-01 h-[16px] w-[2px]" aria-hidden />
        </>
      ) : null}
      <AlertDialog.Action onClick={onConfirm} className={cn(ACTION_TEXT_BASE, confirmColor)}>
        {confirmText}
      </AlertDialog.Action>
    </div>
  );
}

const StateModal = Object.assign(StateModalBase, { Actions });

export { StateModal };
