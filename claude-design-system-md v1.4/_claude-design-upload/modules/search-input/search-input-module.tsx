"use client";
import { cn } from "@workspace/ui/utils";
import React, { useEffect, useState } from "react";

interface SearchInputProps {
  value?: string;
  className?: string;
  onSearchChange?: (query: string) => void;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
  onInputFocus?: () => void;
  onInputBlur?: () => void;
}

const SearchInputModule = (props: SearchInputProps) => {
  const {
    className,
    value,
    onSearchChange,
    placeholder = "검색어를 입력해주세요",
    ref,
    onInputFocus,
    onInputBlur,
  } = props;

  const [searchValue, setSearchValue] = useState(value ?? "");

  useEffect(() => {
    setSearchValue(value ?? "");
  }, [value]);

  return (
    <div
      className={cn(
        "line-01 flex h-[48px] w-[358px] items-center rounded-xl border bg-00",
        className,
      )}
    >
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="font-pretendard flex-[1_0_0] gap-2 rounded-xl bg-transparent pr-0 pl-4 text-[14px] text-03-high placeholder:text-02-row tracking-tight focus:border-transparent focus:outline-none"
        aria-label="Search input"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          onSearchChange?.(e.target.value);
        }}
        onFocusCapture={() => onInputFocus?.()} // ← input focus 시
        onBlur={() => onInputBlur?.()} // ← input blur 시
      />
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-none pr-4 pl-2"
        aria-label="Search"
      >
        <span className="h-6 w-0.5 line-01" aria-hidden="true" />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[24px] w-[24px] shrink-0 text-gray-05-icon-high"
        >
          <circle cx="10.5" cy="10.5" r="7.5" stroke="currentColor" strokeWidth="2" />
          <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export { SearchInputModule };
