/** @format */

"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";

interface ItemProps {
    id: string;
    name: string;
    imageURL: string;
}

export const Item = ({ id, name, imageURL }: ItemProps) => {
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();

    const isActive = organization?.id === id;
    const onClick = () => {
        if (!setActive) return;
        setActive({ organization: id });
    };

    return (
        <div className="aspect-square relative">
            <Hint
                label={name}
                side="right"
                align="start"
                sideOffset={52}
                alignOffset={-15}
            >
                <Image
                    fill
                    src={imageURL}
                    alt={name}
                    // layout="fill"
                    objectFit="cover"
                    className={cn(
                        "rounded-medium cursor-pointer opacity-65 hover:opacity-100 transition",
                        isActive && "opacity-100"
                    )}
                    onClick={onClick}
                />
            </Hint>
        </div>
    );
};
