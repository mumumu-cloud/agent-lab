"use client";

import { Text } from "@workspace/ui/components";
import { cn } from "@workspace/ui/utils";
import { X } from "lucide-react";
import React, { useRef } from "react";
import { DayPicker, useNavigation } from "react-day-picker";
import "./calendar-module.css";

interface Props {
  dateValue: Date;

  onChangeDate: (date: Date) => void;
  /**
   * root div를 제어하기 위한 className
   */
  rootClassName?: string;

  onOpenChange?: (isOpen: boolean) => void;
  header?: {
    /**
     * x 버튼 클릭 이벤트
     */
    onCloseClick?: () => void;
    /**
     * x 버튼 노출 여부
     */
    isCloseButton?: boolean;
    hide?: boolean;
    title?: string;
  };

  footer?: React.ReactNode;
}

function Header(props: { closeButton: boolean; onClick: () => void | undefined; title: string }) {
  return (
    <div className="relative flex justify-center border-b line-01 p-2">
      <Text size={16} weight={"bold"}>
        {props.title}
      </Text>
      {props.closeButton ? (
        <X onClick={props.onClick} className="absolute right-4 cursor-pointer text-gray-05-icon-high" />
      ) : (
        ""
      )}
    </div>
  );
}

export function CalendarModule(props: Props) {
  const { dateValue, onChangeDate, rootClassName, header, footer, onOpenChange } = props;
  const rootContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={cn("rounded-xl bg-00", rootClassName)}>
      {!header?.hide && (
        <Header
          closeButton={header?.isCloseButton ?? false}
          onClick={() => header?.onCloseClick?.()}
          title={header?.title ?? "날짜 선택"}
        />
      )}

      <DayPicker
        mode={"single"}
        selected={dateValue}
        defaultMonth={dateValue}
        onSelect={(val) => {
          if (!val) return;
          onChangeDate(val);
        }}
        onDayKeyDown={(date, modifiers, e) => {
          if (e.key === "Enter" && rootContainerRef.current) {
            const focusedDay = rootContainerRef.current.getElementsByClassName("rdp-focused")[0]!;
            onChangeDate(new Date(focusedDay.getAttribute("data-day") as string));

            onOpenChange?.(false);
          }
        }}
        components={{
          Root: (props) => {
            return (
              <div className={"rdp-root"} ref={rootContainerRef}>
                {props.children}
              </div>
            );
          },

          Nav: (props) => {
            const { months } = useNavigation();
            const { onNextClick, onPreviousClick } = props;

            return (
              <div className={"flex w-full items-center justify-between p-3"}>
                <button
                  onClick={(e) => {
                    onPreviousClick?.(e);
                  }}
                  aria-label={"prev-month"}
                  className="cursor-pointer rounded p-1 text-gray-05-icon-high [&_svg_path]:stroke-current"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="16"
                    viewBox="0 0 21 18"
                    fill="none"
                  >
                    <path
                      d="M19.4004 9L3.23173 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10.1107 1.80005C10.1107 1.80005 8.5439 4.56088 7.12575 5.97902C5.70761 7.39717 2.94678 8.96401 2.94678 8.96401C2.94678 8.96401 5.70761 10.5308 7.12575 11.949C8.5439 13.3671 10.1107 16.128 10.1107 16.128"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <span className="text-03-high">{`${months[0]!.date.getMonth() + 1}월 ${months[0]!.date.getFullYear()}`}</span>
                <button
                  onClick={(e) => {
                    onNextClick?.(e);
                  }}
                  aria-label={"next-month"}
                  className="cursor-pointer rounded p-1 text-gray-05-icon-high [&_svg_path]:stroke-current"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="16"
                    viewBox="0 0 21 18"
                    fill="none"
                  >
                    <path
                      d="M1.59961 9H17.7683"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10.8893 1.80005C10.8893 1.80005 12.4561 4.56088 13.8742 5.97902C15.2924 7.39717 18.0532 8.96401 18.0532 8.96401C18.0532 8.96401 15.2924 10.5308 13.8742 11.949C12.4561 13.3671 10.8893 16.128 10.8893 16.128"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            );
          },
          Months: ({ children }) => {
            return <div>{children}</div>;
          },
          Weekdays: (props) => {
            return (
              <thead className={props.className}>
                <tr>{props.children}</tr>
              </thead>
            );
          },
          Day: (props) => {
            const { day, modifiers, className, children } = props;

            return (
              <td className={cn("relative border", className)} {...props}>
                {children}
              </td>
            );
          },
          MonthCaption: (props) => {
            return <></>;
          },
        }}
        footer={footer}
      />
    </div>
  );
}
