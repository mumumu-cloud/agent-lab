"use client";

export type SearchResultType = { id: string; label: string; value: string };

interface Props {
  onSelectItem: (value: SearchResultType) => void;
  searchResult: SearchResultType[];
}

function SearchResult(props: Props) {
  const { onSelectItem, searchResult } = props;

  return (
    <>
      <div
        className={
          "flex w-full flex-col gap-[8px] rounded-[12px] border line-01 bg-gray-00 px-[2px] py-[20px] max-h-[300px] overflow-y-scroll"
        }
      >
        {/*없으면 null*/}
        {!!searchResult.length &&
          searchResult.map((item) => (
            <span
              className={"cursor-pointer px-[20px] py-[12px] hover:bg-03"}
              key={item.value}
              onClick={() => onSelectItem(item)}
            >
              {item.label}
            </span>
          ))}

        {!searchResult.length && <span className={"px-[20px]"}>NO RESULTS</span>}
      </div>
    </>
  );
}

export default SearchResult;
