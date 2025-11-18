import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
} from "../components/ui";

export type dropdownValuesProps = {
  Title?: string;
  Options: string[];
};

export default function DropdownSelector({
  values,
}: {
  values: dropdownValuesProps;
}) {
  const [value, setValue] = useState(values.Options[0]);

  return (
    <div className="flex flex-col gap-2">
      {values.Title && (
        <Label htmlFor="gender" className="text-sm font-[400]">
          {values.Title}
        </Label>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            id={values.Title}
            className="flex w-full items-center justify-between rounded-md border focus:border-black bg-white px-3 py-2 text-sm text-slate-900 shadow-sm "
          >
            <span>{value}</span>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[200px] rounded-md border border-slate-200 bg-white shadow-md"
        >
          {values.Options.map((item) => (
            <DropdownMenuItem
              key={item}
              onClick={() => setValue(item)}
              className="cursor-pointer text-sm text-slate-700 hover:bg-slate-100"
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
