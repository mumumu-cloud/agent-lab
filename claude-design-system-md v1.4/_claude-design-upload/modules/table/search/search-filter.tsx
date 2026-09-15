"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useEffect, useState } from "react";
import SearchInput from "./search-input";
import { SearchResultType } from "./search-result";

export interface FilterOption<T = string> {
  value: T;
  label: string;
  selectOptions?: {
    label: string;
    value: string;
  }[];
}

export interface SearchFilterInputProps {
  options: FilterOption[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
  searchResult: SearchResultType[];
  onSelectResultItem: (item: SearchResultType) => void;
  selectPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string, type: "LIKE" | "EQUAL") => void;
  searchPlaceholder?: string;
}

function SearchFilterInput(props: SearchFilterInputProps) {
  const {
    options,
    selectedValue,
    onSelectChange,
    selectPlaceholder = "선택",
    searchPlaceholder = "검색",
    searchValue,
    onSearchChange,
    searchResult,
    onSelectResultItem,
  } = props;

  const [selectiveOption, setSelectiveOption] = useState("");

  useEffect(() => {
    setSelectiveOption("");
  }, [selectedValue]);

  return (
    <div className="flex items-center gap-4">
      <div className={"w-[234px]"}>
        <Select value={selectedValue} onValueChange={onSelectChange}>
          <SelectTrigger className="line-01 h-[48px] py-[14px]">
            <SelectValue className="py-[14px]" placeholder={selectPlaceholder} />
          </SelectTrigger>
          <SelectContent className="line-01 bg-00" data-testid="FILTER_CONTENT">
            <SelectGroup className="bg-00">
              {options.map((opt) => (
                <SelectItem key={opt.value} className="cursor-pointer" value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <>
          {options.find((opt) => opt.value === selectedValue)?.selectOptions ? (
            <Select
              value={selectiveOption}
              onValueChange={(data) => {
                setSelectiveOption(data);
                onSearchChange?.(data, "EQUAL");
              }}
            >
              <SelectTrigger className="line-01 h-[48px] py-[14px]">
                <SelectValue placeholder={selectPlaceholder} />
              </SelectTrigger>
              <SelectContent className="line-01 bg-00">
                {options
                  .find((opt) => opt.value === selectedValue)
                  ?.selectOptions?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          ) : (
            <SearchInput
              isVisibleResult={false}
              value={searchValue || ""}
              onSearchChange={(value) => onSearchChange?.(value, "LIKE")}
              placeholder={searchPlaceholder}
              searchResult={searchResult}
              onSelectResultItem={onSelectResultItem}
            />
          )}
        </>
      </div>
    </div>
  );
}

export default SearchFilterInput;
