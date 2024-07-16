/** @format */

"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProModal } from "@/store/useProModal";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const ProModal = () => {
    const { isOpen, onClose } = useProModal();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[372px] p-0 overflow-hidden">
                <div className="aspect-video relative flex items-center justify-center m-2">
                    <Image
                        src="/pro.svg"
                        alt="Upgrade to Pro Plan"
                        className="object-fit"
                        fill
                    />
                </div>
                <div
                    className={cn(
                        "text-neutral-700 mx-auto space-y-6 p-6",
                        font.className
                    )}
                >
                    <h2 className="font-medium text-lg">
                        ⚡️ Upgrade to Pro Plan!
                    </h2>
                    <div className="pl-3">
                        <ul className="text-[12px] space-y-1 list-disc">
                            <li>Unlimited Boards</li>
                            <li>Unlimited Organizations</li>
                            <li>Unlimited Members</li>
                            <li>Unlimited Layers</li>
                        </ul>
                    </div>
                    <Button color="primary" className="w-full">
                        Upgrade
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
