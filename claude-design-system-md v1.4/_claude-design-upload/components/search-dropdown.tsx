"use client";

import { cn } from "@workspace/ui/utils";
import { Search } from "lucide-react";
import * as React from "react";

export interface SearchDropdownOption {
  label: string;
  value: string;
}

export interface SearchDropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SearchDropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
}

const SearchDropdown = React.forwardRef<HTMLDivElement, SearchDropdownProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder = "검색어를 입력해주세요",
      emptyText = "No results",
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(forwardedRef, () => containerRef.current as HTMLDivElement);

    const controlled = value !== undefined;
    const [query, setQuery] = React.useState(
      () => options.find((o) => o.value === defaultValue)?.label ?? "",
    );
    const [open, setOpen] = React.useState(false);
    const [internalSelected, setInternalSelected] = React.useState<string | undefined>(defaultValue);
    const selected = controlled ? value : internalSelected;

    React.useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

    const select = (opt: SearchDropdownOption) => {
      if (!controlled) setInternalSelected(opt.value);
      setQuery(opt.label);
      setOpen(false);
      onChange?.(opt.value);
    };

    return (
      <div ref={containerRef} className={cn("relative", className)} {...props}>
        <div className="flex h-[40px] items-center gap-[8px] rounded-[10px] border bg-00 line-01 px-[14px] transition-colors duration-150 focus-within:line-03 focus-within:shadow-blue-03">
          <Search className="h-[15px] w-[15px] shrink-0 text-gray-03-icon-row" />
          <input
            className="min-w-0 flex-1 border-none bg-transparent text-[14px] text-03-high tracking-[-0.3px] outline-none placeholder:text-01"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />
        </div>
        {open && (
          <div className="absolute top-[calc(100%+4px)] right-0 left-0 z-[250] max-h-[260px] overflow-y-auto rounded-[10px] border bg-00 line-01 px-[4px] py-[6px] shadow-black-04">
            {filtered.length === 0 ? (
              <div className="px-[14px] py-[16px] text-center text-[13px] text-02-row">{emptyText}</div>
            ) : (
              filtered.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => select(opt)}
                  className={cn(
                    "cursor-pointer rounded-[7px] px-[14px] py-[8px] text-[13px] font-medium tracking-[-0.3px] text-03-high transition-colors duration-100 hover:bg-03",
                    selected === opt.value && "bg-03 text-04-brand",
                  )}
                >
                  {opt.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  },
);
SearchDropdown.displayName = "SearchDropdown";

export { SearchDropdown };
