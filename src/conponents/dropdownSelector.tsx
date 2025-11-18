import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
} from "../components/ui";

export type dropdownValuesProps = {
  Title?: string;
  options: string[];
};

export default function DropdownSelector({
  values,
  onChange,
  selectedValue,
}: {
  values: dropdownValuesProps | any;
  onChange: any;
  selectedValue?: number | string | any;
}) {
  return (
    <div className="flex flex-col gap-2">
      {values.Title && (
        <Label htmlFor="dropdown value selector" className="text-sm font-[400]">
          {values.Title}
        </Label>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            id={values.Title}
            className="flex w-full items-center justify-between rounded-md border focus:border-black bg-white px-3 py-2 text-sm text-slate-900 shadow-sm "
          >
            <span>{selectedValue}</span>
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
