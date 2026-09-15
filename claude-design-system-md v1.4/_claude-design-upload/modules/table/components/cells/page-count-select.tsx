"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

interface Props {
  perPageCount: number;
  onChangePageCount: (page: number) => void;
}

function PageCountSelect(props: Props) {
  const { perPageCount, onChangePageCount } = props;

  return (
    <Select
      value={String(perPageCount)}
      onValueChange={(v) => {
        onChangePageCount(Number(v));
      }}
    >
      <SelectTrigger className="w-[100px] line-01">
        <SelectValue className={""} />
      </SelectTrigger>
      <SelectContent className={"line-01 bg-00"}>
        <SelectGroup>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="10">10</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default PageCountSelect;
