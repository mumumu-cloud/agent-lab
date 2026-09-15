import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface ModalDeduplicationMProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  duplicateCount?: number;
}

const ModalDeduplicationM = React.forwardRef<HTMLDivElement, ModalDeduplicationMProps>(
  ({ open, onClose, onConfirm, duplicateCount = 0, className, ...props }, ref) => {
    if (!open) return null;

    return (
      <div onClick={onClose} className="fixed inset-0 z-[500] flex items-center justify-center bg-black/70">
        <div
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          className={cn("w-[380px] rounded-[16px] bg-00 p-[24px] shadow-black-05", className)}
          {...props}
        >
          <h3 className="m-0 mb-[8px] text-[16px] font-semibold tracking-[-0.5px] text-03-high">
            Remove Duplicates
          </h3>
          <p className="m-0 mb-[20px] text-[13px] leading-[1.6] text-02-row">
            {duplicateCount} duplicate items found. Remove them to free storage.
          </p>
          <div className="flex justify-end gap-[8px]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[8px] border-none bg-none px-[14px] py-[6px] text-[13px] font-medium text-04-brand"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-[8px] border-none primary-01 px-[16px] py-[6px] text-[13px] font-medium text-00"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  },
);
ModalDeduplicationM.displayName = "ModalDeduplicationM";

export { ModalDeduplicationM };
