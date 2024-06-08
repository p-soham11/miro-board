/** @format */

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

export interface HintProps {
    label: string;
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
}

export const Hint = ({
    label,
    children,
    side,
    align,
    sideOffset,
    alignOffset,
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent
                    className="text-white bg-black bg-opacity-70 border-black border-opacity-50"
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                >
                    <p className="font-semibold capitalize">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
