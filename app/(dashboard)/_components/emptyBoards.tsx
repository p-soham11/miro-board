/** @format */

import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import Image from "next/image";

export const EmptyBoards = () => {
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
