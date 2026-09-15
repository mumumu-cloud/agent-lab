import { cn } from "@workspace/ui/utils";

interface Props {
  checked: boolean;
  onCheckedChange: (val: boolean) => void;
}

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 3.69L3.5 6L8.5 1"
        stroke="currentColor"
        strokeWidth="1.667"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CheckboxComponent({ checked, onCheckedChange }: Props) {
  return (
    <div className="flex w-full items-center justify-center">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-[6px]",
          checked
            ? "border-primary-01 bg-03 primary-01 border-2 shadow-[0px_3px_8px_0px_rgba(98,140,245,0.13)]"
            : "line-04-dark border-2 bg-00 text-03-high",
        )}
      >
        {checked && <CheckIcon />}
      </button>
    </div>
  );
}
