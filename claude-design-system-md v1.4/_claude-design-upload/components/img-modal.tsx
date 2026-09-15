import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface ImgModalProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  open: boolean;
  onClose?: () => void;
}

const ImgModal = React.forwardRef<HTMLImageElement, ImgModalProps>(
  ({ src, alt, open, onClose, className, style, ...props }, ref) => {
    if (!open) return null;

    return (
      <div
        onClick={onClose}
        className="fixed inset-0 z-[600] flex items-center justify-center bg-black/85 p-[24px]"
      >
        <img
          ref={ref}
          src={src}
          alt={alt || ""}
          onClick={(e) => e.stopPropagation()}
          className={cn("max-h-[85vh] max-w-[90vw] rounded-[12px] object-contain", className)}
          style={style}
          {...props}
        />
      </div>
    );
  },
);
ImgModal.displayName = "ImgModal";

export { ImgModal };
