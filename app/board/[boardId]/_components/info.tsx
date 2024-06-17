/** @format */

"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/useRenameModal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps {
    boardId: string;
}
const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export const TabSepetator = () => {
    return <div className="text-neutral-300 px-1.5">|</div>;
};

export const Info = ({ boardId }: InfoProps) => {
    const { onOpen } = useRenameModal();

    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">,
    });

    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Link href="/">
                <Hint label="Return to Boards" side="right" sideOffset={12}>
                    <Button
                        className="px-2 bg-transparent mt-1"
                        disableRipple
                        disableAnimation
                    >
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            height={36}
                            width={36}
                        />
                        <span
                            className={cn(
                                "font-semibold text-lg ml-1 text-primary mt-[]",
                                font.className
                            )}
                        >
                            mIRO
                        </span>
                    </Button>
                </Hint>
            </Link>
            <TabSepetator />
            <Hint label="Rename Board!" side="bottom" sideOffset={8}>
                <Button
                    className="text-primary"
                    onClick={() => onOpen(data?._id ?? "", data?.title ?? "")}
                >
                    {data?.title ?? "Loading..."}
                </Button>
            </Hint>
            <TabSepetator />
            <Actions
                id={data?._id ?? ""}
                title={data?.title ?? ""}
                side="bottom"
                sideOffset={16}
            >
                <div className="ml-2 mr-4 hover:cursor-pointer hover:opacity-55 transition-opacity text-teal-500">
                    <Menu />
                </div>
            </Actions>
        </div>
    );
};
