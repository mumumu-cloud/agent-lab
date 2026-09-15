import { useState } from "react";
import { SearchFilterProps } from "./search";
import SearchFilterInput from "./search-filter";
import SearchInput from "./search-input";

interface Props {
  searchFilter: SearchFilterProps;
  onSearchValueChange: (params: { value: string; filterField?: string }) => void;
}

const TableSearchFilterWrapper = ({ searchFilter, onSearchValueChange }: Props) => {
  // 모든 Hook을 최상위에서 호출 (Hook 규칙 준수)
  const selectItems = "selectItems" in searchFilter ? searchFilter.selectItems : [];
  const defaultValue = "defaultValue" in searchFilter ? searchFilter.defaultValue : undefined;
  const filterField = "filterField" in searchFilter ? searchFilter.filterField : undefined;

  // 단일 검색용 state
  const [singleSearchValue, setSingleSearchValue] = useState("");
  // 필터 검색용 state
  const [searchSelectValue, setSearchSelectValue] = useState(defaultValue);
  const [filterSearchValue, setFilterSearchValue] = useState("");

  // 커스텀 렌더링이 있으면 우선 사용
  if ("render" in searchFilter && searchFilter.render) {
    return (
      <>
        {searchFilter.render((value, field) => {
          onSearchValueChange({
            value,
            filterField: field,
          });
        })}
      </>
    );
  }

  // 단일 검색 (type이 "single"이거나 filterField만 제공된 경우)
  const isSingleSearch =
    searchFilter.type === "single" || (filterField && !searchFilter.selectItems);

  if (isSingleSearch) {
    const handleSearchChange = (value: string) => {
      setSingleSearchValue(value);
      onSearchValueChange({
        value,
        filterField: filterField,
      });
    };

    return (
      <SearchInput
        value={singleSearchValue}
        onSearchChange={handleSearchChange}
        placeholder={searchFilter.placeholder || "검색"}
        isVisibleResult={false}
        searchResult={[]}
        onSelectResultItem={() => {
          // TODO: 검색 결과 선택 시 처리 로직
        }}
      />
    );
  }

  // 필터 검색 (기존 형태 또는 type이 "filter")
  const handleSearchChange = (value: string) => {
    setFilterSearchValue(value);
    onSearchValueChange({
      value,
      filterField: searchSelectValue,
    });
  };

  const handleSelectChange = (data: string) => {
    setFilterSearchValue("");
    setSearchSelectValue(data);
    onSearchValueChange({ value: "", filterField: data });
  };

  return (
    <SearchFilterInput
      onSearchChange={handleSearchChange}
      options={selectItems ?? []}
      selectedValue={searchSelectValue ?? ""}
      onSelectChange={handleSelectChange}
      searchResult={[]}
      onSelectResultItem={() => {
        // TODO: 검색 결과 선택 시 처리 로직
      }}
      searchValue={filterSearchValue}
      searchPlaceholder={searchFilter.placeholder}
    />
  );
};

export default TableSearchFilterWrapper;
