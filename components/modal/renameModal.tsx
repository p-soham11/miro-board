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
import { useApiMutation } from "@/hooks/useApiMutation";
import { useRenameModal } from "@/store/useRenameModal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FormEventHandler, useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {
    const { mutate, pending } = useApiMutation(api.board.update);

    const { isOpen, initialValues, onClose } = useRenameModal();

    const [title, setTitle] = useState(initialValues.title);

    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title]);

    const onRename: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        mutate({ id: initialValues.id, title })
            .then(() => {
                toast.success("Board Renamed! 🧑‍💻");
                onClose();
            })
            .catch(() => toast.error("Failed to rename board! 🚫"));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>✒️ Rename Board</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    For Example: &quot;Team Meeting&quot; , &quot;Project
                    Plan&quot;, etc.
                </DialogDescription>
                <form onSubmit={onRename} className="space-y-4">
                    <Input
                        disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Board title"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={pending}
                            type="submit"
                            variant="ghost"
                            color="success"
                        >
                            Rename
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
