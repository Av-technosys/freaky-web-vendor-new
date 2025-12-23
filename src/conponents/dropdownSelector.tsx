import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
} from "../components/ui";
import { cn } from "@/lib/utils";

export type dropdownValuesProps = {
  title?: string;
  options: string[];
};

export default function DropdownSelector({
  values,
  onChange,
  selectedValue,
  labelName,
  className,
}: {
  values: dropdownValuesProps | any;
  onChange: any;
  selectedValue?: number | string | any;
  labelName?: any;
  className?: any;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      {values.title && (
        <Label
          htmlFor="dropdown value selector"
          className={cn("text-sm text-gray-600 font-semibold", labelName)}
        >
          {values.title}
        </Label>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            id={values.title}
            className={cn(
              "flex w-full items-center justify-between rounded-lg border focus:border-black bg-white px-3 py-2 text-sm text-slate-900 shadow-xs ",
              className
            )}
          >
            <span className="text-[#8B8D97]">
              {
                values?.options?.filter(
                  (item: any) => item?.value === selectedValue
                )[0]?.label
              }
            </span>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[200px] rounded-md border border-slate-200 bg-white shadow-md"
        >
          {values.options.map((item: any) => (
            <DropdownMenuItem
              key={item.label}
              onClick={() => onChange(item)}
              className="cursor-pointer text-sm text-slate-700 hover:bg-slate-100"
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
