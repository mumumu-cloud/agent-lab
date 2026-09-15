"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { SearchInputModule } from "@workspace/ui/modules";
import { Ref, useState } from "react";
import SearchResult, { SearchResultType } from "./search-result";

interface Props {
  value: string;
  onSearchChange: (value: string) => void;
  isVisibleResult?: boolean;
  searchResult?: SearchResultType[];
  onSelectResultItem?: (item: SearchResultType) => void;
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
}

function SearchInput(props: Props) {
  const {
    value,
    onSearchChange,
    placeholder,
    searchResult,
    onSelectResultItem,
    ref,
    isVisibleResult = true,
  } = props;
  const [popoverOpen, setPopoverOpen] = useState(false);

  const onSearchValueChange = (value: string) => {
    // setPopoverOpen(false);
    onSearchChange(value);
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild={true}>
          <SearchInputModule
            ref={ref}
            className="rounded-[10px] border-0 bg-01"
            value={value}
            onSearchChange={onSearchValueChange}
            placeholder={placeholder}
            onInputFocus={() => {
              setPopoverOpen(true);
            }}
            onInputBlur={() => {
              setPopoverOpen(false);
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          align={"start"}
          className={"mt-[10px] w-[300px] border-none bg-00"}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          {isVisibleResult && (
            <SearchResult
              searchResult={searchResult ? searchResult : []}
              onSelectItem={(value) => {
                onSelectResultItem?.(value);
                onSearchChange(value.label);
                setPopoverOpen(false);
              }}
            />
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}

export default SearchInput;
