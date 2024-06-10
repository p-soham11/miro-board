/** @format */

"use client";

import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Hint } from "@/components/hint";

export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint
                        label="Create organization"
                        side="right"
                        align="start"
                        sideOffset={16}
                    >
                        <button className="bg-white/25 h-[36px] w-[36px] rounded-medium flex items-center justify-center opacity-70 hover:opacity-100 transition">
                            <Plus className="text-white" />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[400px] text-white">
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    );
};
