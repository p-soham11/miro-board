/** @format */

"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "@/components/confirmModal";
import { Button } from "@nextui-org/button";

interface ActionProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title,
}: ActionProps) => {
    const { mutate, pending } = useApiMutation(api.board.remove);

    const onCopyLink = () => {
        navigator.clipboard
            .writeText(`${window.location.origin}/board/${id}`)
            .then(() => toast.success("Link copied to clipboard! 📋"))
            .catch(() => toast.error("Failed to copy link! 🚫"));
    };

    const onDeleteBoard = () => {
        mutate({ id })
            .then(() => toast.success("Board deleted successfully! 🗑️"))
            .catch(() => toast.error("Failed to delete board! 🚫"));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent
                side={side}
                sideOffset={sideOffset}
                className="w-60"
                onClick={(e) => e.stopPropagation()}
            >
                <DropdownMenuItem
                    onClick={onCopyLink}
                    className="p-3 cursor-pointer"
                >
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy Board Link! 📋
                </DropdownMenuItem>
                <ConfirmModal
                    header="🚫 Sure to Delete ?"
                    description="This will delete the board and the action is irreversible! "
                    disabled={pending}
                    onConfirm={onDeleteBoard}
                >
                    <Button
                        color="danger"
                        variant="light"
                        className="p-3 cursor-pointer justify-start w-full bg-transperant gap-0"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Board 🚨
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
