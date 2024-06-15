/** @format */

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { title } from "process";
import React, { MouseEvent } from "react";

interface FooterProps {
    title: string;
    authorLabel: string;
    createdAtLabel: string;
    isFavourite: boolean;
    onClick: () => void;
    disabled: boolean;
}

export const Footer = ({
    title,
    authorLabel,
    createdAtLabel,
    isFavourite,
    onClick,
    disabled,
}: FooterProps) => {
    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        event.preventDefault();
        onClick();
    };

    return (
        <div className="relative bg-white p-3">
            <p className="text-[13px] truncate max-w-[calc(100% - 20px)]">
                {title}
            </p>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
                {authorLabel} - {createdAtLabel}
            </p>
            <button
                disabled={disabled}
                onClick={handleClick}
                className={cn(
                    "opacity-0 group-hover:opacity-100 transition absolute top-5 right-4 text-muted-foreground hover:text-teal-700",
                    disabled && "cursor-not-allowed opacity-75"
                )}
            >
                <Star
                    className={cn(
                        "h-5 w-5",
                        isFavourite && "fill-teal-700 text-teal-700"
                    )}
                />
            </button>
        </div>
    );
};
