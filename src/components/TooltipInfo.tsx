import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui";

export const TooltipInfo = ({ content }: { content: string }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Info size={16} className="text-[#8B8D97] hover:text-black" />
            </TooltipTrigger>

            <TooltipContent className=" max-w-36">
                <p>
                    {content}
                </p>
            </TooltipContent>
        </Tooltip>
    );
};