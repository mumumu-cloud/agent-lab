import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface MainListChatFileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  filename: React.ReactNode;
  filesize?: React.ReactNode;
  fileType?: React.ReactNode;
  onDownload?: () => void;
}

const MainListChatFile = React.forwardRef<HTMLDivElement, MainListChatFileProps>(
  ({ filename, filesize, fileType, onDownload, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onDownload}
        className={cn(
          "flex items-center gap-[10px] rounded-[10px] border bg-01 px-[14px] py-[10px] line-01",
          onDownload && "cursor-pointer",
          className,
        )}
        {...props}
      >
        <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px] bg-04 text-[11px] font-bold text-04-brand">
          {fileType || "FILE"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-medium text-03-high">{filename}</div>
          {filesize && <div className="mt-[2px] text-[11px] text-02-row">{filesize}</div>}
        </div>
      </div>
    );
  },
);
MainListChatFile.displayName = "MainListChatFile";

export { MainListChatFile };
