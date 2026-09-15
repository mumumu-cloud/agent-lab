"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

export interface FilterOption {
  value: string;
  label: string;
}

export interface SearchFilterInputProps {
  options: FilterOption[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
  selectPlaceholder?: string;
  children?: React.ReactNode;
}

function FilterSearch(props: SearchFilterInputProps) {
  const { options, selectedValue, onSelectChange, selectPlaceholder = "선택", children } = props;

  return (
    <div className="flex items-center">
      <div className={"w-[234px]"}>
        <Select value={selectedValue} onValueChange={onSelectChange}>
          <SelectTrigger className="h-[48px] line-01 py-[14px]">
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

      <div>{children}</div>
    </div>
  );
}

export default FilterSearch;
