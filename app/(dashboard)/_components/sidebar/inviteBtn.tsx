/** @format */

import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@nextui-org/button";

export const InviteBtn = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="bordered"
                    className="lg:h-full lg:max-h-[56px]"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Invite Members
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 mt-2 bg-transparent border-none max-w-[880px]">
                <OrganizationProfile />
            </DialogContent>
        </Dialog>
    );
};
