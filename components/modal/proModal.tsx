/** @format */

"use client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { useProModal } from "@/store/useProModal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";

export const ProModal = () => {
    const { isOpen, onClose } = useProModal();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>✨ Pro Modal</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Board Limit has been reached. Please upgrade to Pro to
                    create more boards.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};
