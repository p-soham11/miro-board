/** @format */

"use client";

import { LucideIcon } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@nextui-org/button";
import { cn } from "@/lib/utils";

interface ToolButtonProps {
    label: string;
    icon: LucideIcon;
    isActive?: boolean;
    isDisabled?: boolean;
    onClick: () => void;
}

export const ToolButton = ({
    label,
    icon: Icon,
    isActive,
    isDisabled,
    onClick,
}: ToolButtonProps) => {
    return (
        <Hint label={label} side="right" sideOffset={12}>
            <Button
                isDisabled={isDisabled}
                onClick={onClick}
                size="sm"
                color="success"
                variant={isActive ? "solid" : "light"}
                className={cn("text-primary", isActive && "text-white")}
            >
                <Icon />
            </Button>
        </Hint>
    );
};
