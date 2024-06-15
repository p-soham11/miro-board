/** @format */

"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface NewBoardBtnProps {
    orgId: string;
    disabled?: boolean;
}

export const NewBoardBtn = ({ orgId, disabled }: NewBoardBtnProps) => {
    const router = useRouter();
    const { mutate, pending } = useApiMutation(api.board.create);

    const addBoard = () => {
        mutate({ orgId, title: "New Board" })
            .then((id) => {
                toast.success("Board Created! 🎉");
                router.push(`/board/${id}`);
            })
            .catch(() => toast.error("Failed to create board! ❌"));
    };

    return (
        <button
            disabled={pending || disabled}
            onClick={addBoard}
            className={cn(
                "col-span-1 aspect-[100/127] bg-teal-400 rounded-lg hover:bg-teal-600 flex flex-col justify-center items-center py-6 transition text-teal-900 hover:text-teal-50",
                (pending || disabled) &&
                    "opacity-75 hover:bg-teal-400 hover:text-teal-900 cursor-not-allowed"
            )}
        >
            <div />
            <Plus className="h-12 w-12" />
            <p className="text-sm font-light mt-1">Add Board</p>
        </button>
    );
};
