/** @format */

"use client";

import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const EmptyBoards = () => {
    const router = useRouter();
    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.board.create);
    const addBoard = () => {
        if (!organization) return;
        mutate({ orgId: organization.id, title: "New Board" })
            .then((id) => {
                toast.success("Board Created! 🎉");
                router.push(`/board/${id}`);
            })
            .catch(() => toast.error("Failed to create board! ❌"));
    };

    return (
        <div className="h-full flex flex-col justify-center items-center mt-[-105px]">
            <Image
                src="/addBoard.svg"
                alt="Search is Empty"
                height={320}
                width={320}
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create your First Board!
            </h2>
            <p className="text-slate-500 text-sm mt-1 ">
                Share and Visualize your thoughts!
            </p>
            <div className="mt-6">
                <Button
                    onClick={addBoard}
                    isLoading={pending}
                    color="primary"
                    size="lg"
                    startContent={<Plus size={24} />}
                >
                    Create Board
                </Button>
            </div>
        </div>
    );
};
