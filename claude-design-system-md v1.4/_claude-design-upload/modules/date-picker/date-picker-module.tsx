"use client";
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { CalendarModule } from "@workspace/ui/modules";
import { cn } from "@workspace/ui/utils";
import { useRef } from "react";

const CalendarIcon: React.FC = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-4 text-gray-05-icon-high [&_path]:stroke-current [&_rect]:stroke-current"
  >
    <rect x="3" y="4.99976" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="2" />
    <path d="M8 3L8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DateDisplay: React.FC<{ date: string }> = ({ date }) => (
  <time
    dateTime={date}
    className="text-14 cursor-pointer gap-1 px-4 py-3 leading-6 tracking-normal text-02-row"
  >
    {date}
  </time>
);

const _divider: React.FC<{ orientation: "horizontal" | "vertical" }> = ({ orientation }) => {
  if (orientation === "horizontal") {
    return <div className="h-[3px] w-3 line-01" role="separator" />;
  }
  return <div className="h-6 w-0.5 line-01" role="separator" />;
};

interface Props {
  open: boolean;
  onChangeOpen: (open: boolean) => void;
  onChangeDate: (date: Date) => void;
  date: Date | null;
  placeholder?: string;
  size?: "sm" | "md";
  dateFormat?: "iso" | "slash";
  label?: string;
  onClearClick?: () => void;
}

const LOCALE_DATE_TYPE = "en-CA";

function formatDate(date: Date, fmt: "iso" | "slash"): string {
  const iso = date.toLocaleDateString(LOCALE_DATE_TYPE);
  return fmt === "slash" ? iso.replaceAll("-", "/") : iso;
}

const DatePickerModule = (props: Props) => {
  const {
    open,
    onChangeOpen,
    date,
    onChangeDate,
    placeholder,
    size = "md",
    dateFormat = "iso",
    label,
  } = props;

  const refButton = useRef<HTMLButtonElement | null>(null);
  const calendarDate = date ?? new Date();
  const isSm = size === "sm";
  const display = date ? formatDate(date, dateFormat) : (placeholder ?? "");

  const trigger = (
    <Popover open={open} onOpenChange={onChangeOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "box-border flex items-center bg-00",
            isSm
              ? "line-01 h-[40px] rounded-[10px] border"
              : "h-[40px] rounded-xl border-2 line-02",
          )}
        >
          <div
            className={cn(
              "flex flex-1 items-center",
              isSm ? "px-[12px]" : "justify-center px-0 py-4",
            )}
          >
            <button ref={refButton} type="button" className={isSm ? "w-full text-left" : undefined}>
              {isSm ? (
                <span
                  className={cn(
                    "text-[14px] leading-[1.48] tracking-[0px]",
                    date ? "text-03-high" : "text-02-row",
                  )}
                >
                  {display}
                </span>
              ) : (
                <DateDisplay date={display} />
              )}
            </button>
          </div>
          <div
            className={cn(
              "flex items-center",
              isSm ? "gap-[8px] pr-[10px]" : "gap-2 py-4 pr-4 pl-2",
            )}
          >
            {isSm ? (
              <span className="line-01 h-[20px] w-[1px]" aria-hidden />
            ) : (
              <_divider orientation="vertical" />
            )}
            <CalendarIcon />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        onCloseAutoFocus={() => {
          refButton.current?.focus();
        }}
        align={"start"}
        className={"shadow-black-04 w-fit border-none bg-00"}
      >
        <CalendarModule
          header={{ hide: true }}
          dateValue={calendarDate}
          onChangeDate={(val) => {
            onChangeDate(val);
          }}
        />
      </PopoverContent>
    </Popover>
  );

  if (!label) return trigger;

  return (
    <div className={cn("flex flex-col gap-[2px]", isSm ? "w-[152px]" : "w-[200px]")}>
      <span className="text-02-row pl-[8px] text-[13px] leading-[1.36] font-medium tracking-[-0.5px]">
        {label}
      </span>
      {trigger}
    </div>
  );
};

export { DatePickerModule };
