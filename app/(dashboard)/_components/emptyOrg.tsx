/** @format */

import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const EmptyOrg = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/dashboard.svg"
                alt="Empty"
                height={260}
                width={260}
                className="mt-[-72px] lg:mt-[-128px] lg:w-[320px] lg:h-[320px]"
            />
            <h2 className="text-2xl font-semibold mt-2 text-blue-950">
                Welcome to mIRO Board
            </h2>
            <p className="text-slate-500 text-sm mt-1">
                Create an Organization to get Started!
            </p>
            <div className="mt-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            size="lg"
                            color="primary"
                            variant="shadow"
                            className="mt-4"
                        >
                            Create Organization
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-[400px]">
                        <CreateOrganization />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
